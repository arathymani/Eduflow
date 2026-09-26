import os
from datetime import datetime, timezone

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

from sqlalchemy import (
    create_engine, String, Integer, DateTime, ForeignKey, JSON, select,
)
from sqlalchemy.orm import (
    DeclarativeBase, Mapped, mapped_column, sessionmaker, relationship,
)

# =========================================================
# DATABASE (PostgreSQL)
# =========================================================

DATABASE_URL = os.environ["DATABASE_URL"]
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


def utcnow():
    return datetime.now(timezone.utc)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    standard: Mapped[str] = mapped_column(String, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    sessions: Mapped[list["UserSession"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )


class UserSession(Base):
    __tablename__ = "user_sessions"
    token: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    user: Mapped["User"] = relationship(back_populates="sessions")


class Performance(Base):
    __tablename__ = "performance"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    data: Mapped[dict] = mapped_column(JSON, default=dict)


class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    data: Mapped[dict] = mapped_column(JSON, default=dict)


class QuizResult(Base):
    __tablename__ = "quiz_results"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    data: Mapped[dict] = mapped_column(JSON, default=dict)


Base.metadata.create_all(engine)


DEFAULT_PERF = {
    "overall_score": 0,
    "subjects": {},
    "topics": {},
    "knowledge_gaps": [],
    "strengths": [],
}


def get_perf(db, user_id):
    row = db.get(Performance, user_id)
    return row.data if row and row.data else dict(DEFAULT_PERF)


def save_perf(db, user_id, data):
    row = db.get(Performance, user_id)
    if row is None:
        db.add(Performance(user_id=user_id, data=data))
    else:
        row.data = data
    db.commit()


# =========================================================
# APP
# =========================================================

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def get_token_from_request():
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/")
def home():
    return jsonify({"message": "LearnNova Backend is running!", "status": "success"})


@app.route("/api/health")
def health():
    return jsonify({"status": "healthy", "backend": "LearnNova Flask API", "database": "postgresql"})


# =========================================================
# REGISTER
# =========================================================

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    standard = data.get("standard", data.get("class", ""))

    if not name or not email or not password:
        return jsonify({"success": False, "message": "Name, email and password are required."}), 400

    with SessionLocal() as db:
        existing = db.execute(select(User).where(User.email == email)).scalar_one_or_none()
        if existing:
            return jsonify({"success": False, "message": "User already exists."}), 409

        user = User(name=name, email=email,
                    password_hash=generate_password_hash(password), standard=str(standard))
        db.add(user)
        db.commit()
        db.refresh(user)

        db.add(Performance(user_id=user.id, data=dict(DEFAULT_PERF)))
        token = secrets.token_urlsafe(32)
        db.add(UserSession(token=token, user_id=user.id))
        db.commit()

        return jsonify({
            "success": True,
            "message": "Registration successful.",
            "token": token,
            "user": {"id": user.id, "name": user.name, "email": user.email, "standard": user.standard},
        }), 201


# =========================================================
# LOGIN
# =========================================================

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    with SessionLocal() as db:
        user = db.execute(select(User).where(User.email == email)).scalar_one_or_none()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"success": False, "message": "Invalid email or password."}), 401

        token = secrets.token_urlsafe(32)
        db.add(UserSession(token=token, user_id=user.id))
        db.commit()

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "token": token,
            "user": {"id": user.id, "name": user.name, "email": user.email, "standard": user.standard},
        })


# =========================================================
# LOGOUT
# =========================================================

@app.route("/api/logout", methods=["POST"])
def logout():
    token = get_token_from_request()
    if not token:
        return jsonify({"success": False, "message": "No session token provided."}), 400
    with SessionLocal() as db:
        sess = db.get(UserSession, token)
        if sess:
            db.delete(sess)
            db.commit()
    return jsonify({"success": True, "message": "Logged out successfully."})


# =========================================================
# CURRENT USER (validate session)
# =========================================================

@app.route("/api/me", methods=["GET"])
def me():
    token = get_token_from_request()
    if not token:
        return jsonify({"success": False, "message": "Not authenticated."}), 401
    with SessionLocal() as db:
        sess = db.get(UserSession, token)
        if not sess:
            return jsonify({"success": False, "message": "Invalid or expired session."}), 401
        user = db.get(User, sess.user_id)
        return jsonify({
            "success": True,
            "user": {"id": user.id, "name": user.name, "email": user.email, "standard": user.standard},
        })


# =========================================================
# STUDENT PROFILE
# =========================================================

@app.route("/api/student/<int:student_id>", methods=["GET"])
def get_student(student_id):
    with SessionLocal() as db:
        user = db.get(User, student_id)
        if not user:
            return jsonify({"success": False, "message": "Student not found."}), 404
        return jsonify({
            "success": True,
            "student": {"id": user.id, "name": user.name, "email": user.email, "standard": user.standard},
        })


# =========================================================
# DIAGNOSTIC ASSESSMENT
# =========================================================

DIAGNOSTIC_QUESTIONS = [
    {"id": 1, "subject": "Mathematics", "topic": "Algebra", "question": "If 2x + 5 = 15, what is x?", "options": ["3", "5", "7", "10"], "answer": "5"},
    {"id": 2, "subject": "Mathematics", "topic": "Geometry", "question": "What is the sum of angles in a triangle?", "options": ["90°", "180°", "270°", "360°"], "answer": "180°"},
    {"id": 3, "subject": "Science", "topic": "Physics", "question": "What is the SI unit of force?", "options": ["Joule", "Watt", "Newton", "Pascal"], "answer": "Newton"},
    {"id": 4, "subject": "Science", "topic": "Biology", "question": "Which organ pumps blood through the body?", "options": ["Lungs", "Brain", "Heart", "Kidney"], "answer": "Heart"},
    {"id": 5, "subject": "Computer Science", "topic": "Programming", "question": "Which keyword is commonly used to define a function in Python?", "options": ["function", "def", "func", "define"], "answer": "def"},
    {"id": 6, "subject": "English", "topic": "Grammar", "question": "Choose the correct sentence.", "options": ["She go to school.", "She going school.", "She goes to school.", "She gone school."], "answer": "She goes to school."},
    {"id": 7, "subject": "Logical Reasoning", "topic": "Patterns", "question": "What comes next: 2, 4, 8, 16, ?", "options": ["18", "24", "32", "36"], "answer": "32"},
    {"id": 8, "subject": "Mathematics", "topic": "Arithmetic", "question": "What is 25% of 200?", "options": ["25", "40", "50", "75"], "answer": "50"},
]


@app.route("/api/assessment/<int:student_id>", methods=["GET"])
def get_assessment(student_id):
    questions = [{"id": q["id"], "subject": q["subject"], "topic": q["topic"],
                  "question": q["question"], "options": q["options"]} for q in DIAGNOSTIC_QUESTIONS]
    return jsonify({"success": True, "student_id": student_id, "questions": questions})


@app.route("/api/assessment/submit", methods=["POST"])
def submit_assessment():
    data = request.get_json() or {}
    student_id = data.get("student_id")
    answers = data.get("answers", {})
    if not student_id:
        return jsonify({"success": False, "message": "student_id is required."}), 400

    correct = 0
    subject_stats = {}
    topic_stats = {}
    for question in DIAGNOSTIC_QUESTIONS:
        qid = str(question["id"])
        is_correct = answers.get(qid) == question["answer"]
        if is_correct:
            correct += 1
        subject = question["subject"]
        topic = question["topic"]
        subject_stats.setdefault(subject, {"correct": 0, "total": 0})
        subject_stats[subject]["total"] += 1
        if is_correct:
            subject_stats[subject]["correct"] += 1
        topic_stats.setdefault(topic, {"correct": 0, "total": 0})
        topic_stats[topic]["total"] += 1
        if is_correct:
            topic_stats[topic]["correct"] += 1

    total = len(DIAGNOSTIC_QUESTIONS)
    score = round((correct / total) * 100, 2)
    knowledge_gaps = []
    strengths = []
    for topic, stats in topic_stats.items():
        percentage = (stats["correct"] / stats["total"]) * 100
        if percentage < 50:
            knowledge_gaps.append(topic)
        elif percentage >= 75:
            strengths.append(topic)

    perf = {"overall_score": score, "correct": correct, "total": total,
            "subjects": subject_stats, "topics": topic_stats,
            "knowledge_gaps": knowledge_gaps, "strengths": strengths}

    with SessionLocal() as db:
        save_perf(db, student_id, perf)
        row = db.get(AssessmentResult, student_id)
        payload = {"score": score, "answers": answers}
        if row is None:
            db.add(AssessmentResult(user_id=student_id, data=payload))
        else:
            row.data = payload
        db.commit()

    return jsonify({
        "success": True,
        "message": "Assessment submitted successfully.",
        "result": {"score": score, "correct": correct, "total": total,
                   "knowledge_gaps": knowledge_gaps, "strengths": strengths},
    })


# =========================================================
# PERFORMANCE
# =========================================================

@app.route("/api/performance/<int:student_id>", methods=["GET"])
def get_performance(student_id):
    with SessionLocal() as db:
        perf = get_perf(db, student_id)
    return jsonify({"success": True, "student_id": student_id, "performance": perf})


# =========================================================
# PERSONALIZED LEARNING PATH
# =========================================================

@app.route("/api/learning-path/<int:student_id>", methods=["GET"])
def learning_path(student_id):
    with SessionLocal() as db:
        perf = get_perf(db, student_id)
    gaps = perf.get("knowledge_gaps", [])
    strengths = perf.get("strengths", [])
    score = perf.get("overall_score", 0)

    courses = [{"title": f"{gap} Foundation", "topic": gap, "level": "Beginner",
                "reason": "Knowledge gap detected"} for gap in gaps]

    if score >= 80:
        courses.append({"title": "Advanced Mathematics", "topic": "Advanced Problem Solving", "level": "Advanced", "reason": "Excellent assessment performance"})
        courses.append({"title": "Competitive Programming", "topic": "Programming", "level": "Advanced", "reason": "High overall performance"})
    elif score >= 60:
        courses.append({"title": "Intermediate Problem Solving", "topic": "Problem Solving", "level": "Intermediate", "reason": "Build on current performance"})
    else:
        courses.append({"title": "Core Concepts Revision", "topic": "Fundamentals", "level": "Beginner", "reason": "Strengthen fundamentals"})

    return jsonify({"success": True, "student_id": student_id, "courses": courses,
                    "strengths": strengths, "knowledge_gaps": gaps})


# =========================================================
# ADAPTIVE QUIZ
# =========================================================

QUIZ_QUESTIONS = [
    {"id": 101, "topic": "Algebra", "difficulty": "easy", "question": "What is 3 + 5?", "options": ["6", "7", "8", "9"], "answer": "8"},
    {"id": 102, "topic": "Algebra", "difficulty": "medium", "question": "If x + 7 = 12, what is x?", "options": ["3", "5", "7", "12"], "answer": "5"},
    {"id": 103, "topic": "Algebra", "difficulty": "hard", "question": "If 2x + 3 = 13, what is x?", "options": ["4", "5", "6", "8"], "answer": "5"},
]


@app.route("/api/quiz/<int:student_id>", methods=["GET"])
def get_quiz(student_id):
    with SessionLocal() as db:
        perf = get_perf(db, student_id)
    score = perf.get("overall_score", 0)
    if score >= 80:
        difficulty = "hard"
    elif score >= 50:
        difficulty = "medium"
    else:
        difficulty = "easy"
    questions = [{"id": q["id"], "topic": q["topic"], "difficulty": q["difficulty"],
                  "question": q["question"], "options": q["options"]}
                 for q in QUIZ_QUESTIONS if q["difficulty"] == difficulty]
    return jsonify({"success": True, "student_id": student_id, "difficulty": difficulty, "questions": questions})


@app.route("/api/quiz/submit", methods=["POST"])
def submit_quiz():
    data = request.get_json() or {}
    student_id = data.get("student_id")
    answers = data.get("answers", {})
    correct = 0
    total = 0
    for question in QUIZ_QUESTIONS:
        qid = str(question["id"])
        if qid in answers:
            total += 1
            if answers[qid] == question["answer"]:
                correct += 1
    score = round((correct / total) * 100, 2) if total else 0

    with SessionLocal() as db:
        row = db.get(QuizResult, student_id)
        payload = {"score": score, "correct": correct, "total": total}
        if row is None:
            db.add(QuizResult(user_id=student_id, data=payload))
        else:
            row.data = payload
        db.commit()

        perf = get_perf(db, student_id)
        old_score = perf.get("overall_score", 0)
        new_score = round((old_score + score) / 2, 2)
        perf["overall_score"] = new_score
        save_perf(db, student_id, perf)

    return jsonify({
        "success": True,
        "message": "Quiz submitted successfully.",
        "result": {"score": score, "correct": correct, "total": total, "updated_overall_score": new_score},
    })


# =========================================================
# CAREER GUIDANCE
# =========================================================

@app.route("/api/career/<int:student_id>", methods=["GET"])
def career_guidance(student_id):
    with SessionLocal() as db:
        perf = get_perf(db, student_id)
    score = perf.get("overall_score", 0)
    strengths = perf.get("strengths", [])
    careers = []
    if score >= 80:
        careers = [
            {"career": "Software Engineering", "reason": "Strong overall academic performance and problem-solving potential."},
            {"career": "Data Science", "reason": "Strong analytical and mathematical potential."},
            {"career": "Engineering", "reason": "Good performance suitable for technical learning paths."},
        ]
    elif score >= 60:
        careers = [
            {"career": "Technology", "reason": "Developing technical and analytical skills."},
            {"career": "Business & Management", "reason": "Can build strong problem-solving and communication skills."},
        ]
    else:
        careers = [{"career": "Explore Multiple Fields", "reason": "Improve foundational skills before making a career decision."}]
    return jsonify({"success": True, "student_id": student_id, "overall_score": score,
                    "strengths": strengths, "career_options": careers})


# =========================================================
# DASHBOARD - COMBINED DATA
# =========================================================

@app.route("/api/dashboard/<int:student_id>", methods=["GET"])
def dashboard(student_id):
    with SessionLocal() as db:
        perf = get_perf(db, student_id)
    score = perf.get("overall_score", 0)
    gaps = perf.get("knowledge_gaps", [])

    courses = [{"title": f"{gap} Foundation", "topic": gap, "level": "Beginner"} for gap in gaps]
    if score >= 80:
        courses.append({"title": "Advanced Problem Solving", "topic": "Problem Solving", "level": "Advanced"})
    else:
        courses.append({"title": "Core Concepts", "topic": "Fundamentals", "level": "Intermediate"})

    if score >= 80:
        career = ["Software Engineering", "Data Science", "Engineering"]
    elif score >= 60:
        career = ["Technology", "Business & Management"]
    else:
        career = ["Explore Multiple Fields"]

    return jsonify({"success": True, "student_id": student_id, "performance": perf,
                    "learning_path": courses, "career": career})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=True)
