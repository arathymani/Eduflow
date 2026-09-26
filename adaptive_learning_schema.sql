-- ============================================================
-- Adaptive Learning Platform - PostgreSQL Schema
-- Generated for the React + TypeScript frontend
-- ============================================================

-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";     -- case-insensitive email

-- ============================================================
-- 1. ENUM TYPES
-- ============================================================

CREATE TYPE grade_level AS ENUM (
  'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
);

CREATE TYPE academic_stream AS ENUM (
  'Science (PCM)',
  'Science (PCB)',
  'Commerce',
  'Arts & Humanities',
  'Foundational STEM'
);

CREATE TYPE user_role AS ENUM ('student', 'parent', 'educator');

CREATE TYPE subject_type AS ENUM (
  'Mathematics',
  'Physics',
  'Logical Reasoning',
  'Biology',
  'General Chemistry'
);

CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');

CREATE TYPE mastery_status AS ENUM ('Strong', 'Average', 'Needs Attention');

CREATE TYPE gap_severity AS ENUM ('critical', 'moderate', 'mastered');

CREATE TYPE path_phase AS ENUM (
  'Bridge Prerequisite',
  'Core Mastery',
  'Advanced Application',
  'Exam Simulator'
);

CREATE TYPE node_status AS ENUM ('completed', 'in_progress', 'locked');

CREATE TYPE recommendation_category AS ENUM (
  'Next Challenge',
  'Revision Spaced',
  'Gap Remedy',
  'Career Milestone'
);

CREATE TYPE urgency_level AS ENUM ('high', 'medium', 'normal');

CREATE TYPE student_theme AS ENUM (
  'cosmic', 'daylight', 'emerald', 'cyber', 'sunset'
);

-- ============================================================
-- 2. LOOKUP / REFERENCE TABLES
-- ============================================================

CREATE TABLE avatars (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  emoji         TEXT NOT NULL,
  badge         TEXT NOT NULL,
  bg_color      TEXT NOT NULL,          -- e.g. 'bg-indigo-600'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE themes (
  id            student_theme PRIMARY KEY,
  name          TEXT NOT NULL,
  emoji         TEXT NOT NULL,
  description   TEXT,
  accent_color  TEXT
);

-- ============================================================
-- 3. USERS & AUTHENTICATION
-- ============================================================

CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email             CITEXT UNIQUE NOT NULL,
  password_hash     TEXT NOT NULL,                 -- store bcrypt/argon2 hash, never plain text
  role              user_role NOT NULL DEFAULT 'student',
  name              TEXT NOT NULL,
  grade             grade_level,
  stream            academic_stream,
  avatar_id         TEXT REFERENCES avatars(id),
  dream_career      TEXT,
  interests         TEXT[] DEFAULT '{}',
  xp                INTEGER NOT NULL DEFAULT 0,
  streak_days       INTEGER NOT NULL DEFAULT 0,
  level             INTEGER NOT NULL DEFAULT 1,
  overall_score     NUMERIC(5,2) DEFAULT 0,
  target_exam       TEXT,
  school_name       TEXT,
  phone             TEXT,
  theme             student_theme DEFAULT 'cosmic',
  is_active         BOOLEAN DEFAULT TRUE,
  joined_at         TIMESTAMPTZ DEFAULT NOW(),
  last_login_at     TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token         TEXT UNIQUE NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  used_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. DIAGNOSTIC TEST
-- ============================================================

CREATE TABLE diagnostic_questions (
  id              TEXT PRIMARY KEY,
  subject         subject_type NOT NULL,
  difficulty      difficulty_level NOT NULL,
  question        TEXT NOT NULL,
  options         TEXT[] NOT NULL,          -- array of 4 options
  correct_index   SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  explanation     TEXT NOT NULL,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE diagnostic_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  total_score     NUMERIC(5,2),
  time_taken_secs INTEGER
);

CREATE TABLE diagnostic_answers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id        UUID NOT NULL REFERENCES diagnostic_attempts(id) ON DELETE CASCADE,
  question_id       TEXT NOT NULL REFERENCES diagnostic_questions(id),
  selected_index    SMALLINT,
  is_correct        BOOLEAN,
  time_taken_secs   INTEGER,
  answered_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. SUBJECT PERFORMANCE
-- ============================================================

CREATE TABLE subject_scores (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject             subject_type NOT NULL,
  score               NUMERIC(5,2) NOT NULL,
  total_questions     INTEGER NOT NULL,
  correct_questions   INTEGER NOT NULL,
  percentile          NUMERIC(5,2),
  speed_secs_avg      NUMERIC(8,2),
  status              mastery_status NOT NULL,
  icon                TEXT,
  color               TEXT,                   -- Tailwind gradient class
  recorded_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, subject, recorded_at)
);

CREATE INDEX idx_subject_scores_user ON subject_scores(user_id);

-- ============================================================
-- 6. KNOWLEDGE GAPS
-- ============================================================

CREATE TABLE knowledge_gaps (
  id                      TEXT PRIMARY KEY,
  user_id                 UUID REFERENCES users(id) ON DELETE CASCADE,  -- NULL = global template
  subject                 subject_type NOT NULL,
  target_concept          TEXT NOT NULL,
  target_mastery          NUMERIC(5,2) NOT NULL,
  prerequisite_concept    TEXT NOT NULL,
  prerequisite_mastery    NUMERIC(5,2) NOT NULL,
  severity                gap_severity NOT NULL,
  root_cause              TEXT,
  bridge_remedy           TEXT,
  estimated_fix_time      TEXT,
  is_resolved             BOOLEAN DEFAULT FALSE,
  resolved_at             TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_knowledge_gaps_user ON knowledge_gaps(user_id);

-- ============================================================
-- 7. LEARNING PATH
-- ============================================================

CREATE TABLE learning_path_nodes (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  subject           subject_type NOT NULL,
  phase             path_phase NOT NULL,
  xp_reward         INTEGER NOT NULL DEFAULT 0,
  duration_minutes  INTEGER NOT NULL,
  description       TEXT,
  sort_order        INTEGER DEFAULT 0,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_learning_path (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  node_id       TEXT NOT NULL REFERENCES learning_path_nodes(id),
  status        node_status NOT NULL DEFAULT 'locked',
  started_at    TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  xp_earned     INTEGER DEFAULT 0,
  UNIQUE (user_id, node_id)
);

CREATE INDEX idx_user_learning_path_user ON user_learning_path(user_id);

-- ============================================================
-- 8. LEARNING CONTENT (Lessons + Flashcards)
-- ============================================================

CREATE TABLE lessons (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  subject             subject_type NOT NULL,
  topic               TEXT NOT NULL,
  summary             TEXT,
  core_concept        TEXT,
  real_world_analogy  TEXT,
  -- Interactive formula (optional, stored as JSONB)
  interactive_formula JSONB,   -- { latex, variables: [{symbol, label, defaultVal, unit, min, max}] }
  is_active           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE flashcards (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  front       TEXT NOT NULL,
  back        TEXT NOT NULL,
  hint        TEXT,
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE user_lesson_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id     TEXT NOT NULL REFERENCES lessons(id),
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  time_spent_secs INTEGER DEFAULT 0,
  UNIQUE (user_id, lesson_id)
);

-- ============================================================
-- 9. AI TUTOR CHAT
-- ============================================================

CREATE TABLE ai_chat_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id     TEXT REFERENCES lessons(id),
  started_at    TIMESTAMPTZ DEFAULT NOW(),
  ended_at      TIMESTAMPTZ
);

CREATE TABLE ai_chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  sender        TEXT NOT NULL CHECK (sender IN ('user', 'tutor')),
  text          TEXT NOT NULL,
  analogy       TEXT,
  hint          TEXT,
  quick_replies TEXT[],
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_chat_messages_session ON ai_chat_messages(session_id);

-- ============================================================
-- 10. ADAPTIVE QUIZ
-- ============================================================

CREATE TABLE adaptive_quiz_questions (
  id              TEXT PRIMARY KEY,
  subject         subject_type NOT NULL,
  difficulty      difficulty_level NOT NULL,
  xp              INTEGER NOT NULL DEFAULT 10,
  question        TEXT NOT NULL,
  options         TEXT[] NOT NULL,
  correct_index   SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  hint            TEXT,
  remedy_tip      TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE adaptive_quiz_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  total_xp        INTEGER DEFAULT 0,
  score           NUMERIC(5,2)
);

CREATE TABLE adaptive_quiz_answers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id        UUID NOT NULL REFERENCES adaptive_quiz_attempts(id) ON DELETE CASCADE,
  question_id       TEXT NOT NULL REFERENCES adaptive_quiz_questions(id),
  selected_index    SMALLINT,
  is_correct        BOOLEAN,
  xp_earned         INTEGER DEFAULT 0,
  time_taken_secs   INTEGER,
  answered_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. BADGES & GAMIFICATION
-- ============================================================

CREATE TABLE badges (
  id            TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT,
  icon          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_badges (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id      TEXT NOT NULL REFERENCES badges(id),
  unlocked      BOOLEAN DEFAULT FALSE,
  unlocked_at   TIMESTAMPTZ,
  UNIQUE (user_id, badge_id)
);

-- ============================================================
-- 12. RECOMMENDATIONS
-- ============================================================

CREATE TABLE recommendations (
  id              TEXT PRIMARY KEY,
  category        recommendation_category NOT NULL,
  title           TEXT NOT NULL,
  reason          TEXT,
  estimated_time  TEXT,
  xp_bonus        INTEGER DEFAULT 0,
  action_text     TEXT,
  urgency         urgency_level DEFAULT 'normal',
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_recommendations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id TEXT NOT NULL REFERENCES recommendations(id),
  is_dismissed      BOOLEAN DEFAULT FALSE,
  is_completed      BOOLEAN DEFAULT FALSE,
  shown_at          TIMESTAMPTZ DEFAULT NOW(),
  completed_at      TIMESTAMPTZ
);

-- ============================================================
-- 13. CAREER GUIDANCE
-- ============================================================

CREATE TABLE career_matches (
  id                    TEXT PRIMARY KEY,
  title                 TEXT NOT NULL,
  tagline               TEXT,
  category              TEXT,
  why_suggested         JSONB,   -- { academic: [], interest: [], aptitude: [] }
  key_pathways          TEXT[],
  entrance_exams_required TEXT[],
  top_roles             TEXT[],
  avg_starting_salary   TEXT,
  growth_outlook        TEXT,
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_career_matches (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  career_id         TEXT NOT NULL REFERENCES career_matches(id),
  match_score       NUMERIC(5,2) NOT NULL,
  academic_score    NUMERIC(5,2),
  interest_score    NUMERIC(5,2),
  aptitude_score    NUMERIC(5,2),
  calculated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, career_id)
);

-- ============================================================
-- 14. ENTRANCE EXAMS
-- ============================================================

CREATE TABLE entrance_exams (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  target_field          TEXT,
  conducting_body       TEXT,
  eligibility           TEXT,
  subjects              TEXT[],
  exam_pattern          TEXT,
  upcoming_date         DATE,
  official_source_url   TEXT,
  high_weightage_topics TEXT[],
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_exam_readiness (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_id               TEXT NOT NULL REFERENCES entrance_exams(id),
  readiness_percentage  NUMERIC(5,2) DEFAULT 0,
  last_updated          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, exam_id)
);

-- ============================================================
-- 15. SUBSCRIPTION & SCHOLARSHIP
-- ============================================================

CREATE TABLE subscription_plans (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  base_price_monthly    NUMERIC(10,2) NOT NULL,
  annual_multiplier     NUMERIC(4,2) DEFAULT 10,   -- e.g. 10 = ~2 months free
  features              TEXT[],
  is_popular            BOOLEAN DEFAULT FALSE,
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE scholarship_tiers (
  id                    SERIAL PRIMARY KEY,
  min_score             NUMERIC(5,2) NOT NULL,
  max_score             NUMERIC(5,2) NOT NULL,
  discount_percentage   NUMERIC(5,2) NOT NULL,
  label                 TEXT NOT NULL,
  badge_text            TEXT,
  message               TEXT,
  perks                 TEXT[]
);

CREATE TABLE user_subscriptions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id           TEXT NOT NULL REFERENCES subscription_plans(id),
  scholarship_tier_id INTEGER REFERENCES scholarship_tiers(id),
  start_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date          DATE,
  amount_paid       NUMERIC(10,2),
  discount_applied  NUMERIC(5,2) DEFAULT 0,
  status            TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'pending')),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 16. HELPER FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Award XP and recalculate level (simple example)
CREATE OR REPLACE FUNCTION award_xp(p_user_id UUID, p_xp INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET xp = xp + p_xp,
      level = GREATEST(1, FLOOR((xp + p_xp) / 400.0) + 1)
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 17. SEED DATA (from frontend mock)
-- ============================================================

-- Avatars
INSERT INTO avatars (id, name, emoji, badge, bg_color) VALUES
  ('av-1', 'AstroBot', '🚀', 'Cosmic Explorer', 'bg-indigo-600'),
  ('av-2', 'Sparky',   '⚡', 'Fast Thinker',    'bg-amber-600'),
  ('av-3', 'Nova',     '🌟', 'Deep Analyzer',   'bg-violet-600'),
  ('av-4', 'Byte',     '🤖', 'Tech Wizard',     'bg-emerald-600'),
  ('av-5', 'Leo',      '🦁', 'Fearless Leader', 'bg-rose-600');

-- Themes
INSERT INTO themes (id, name, emoji, description, accent_color) VALUES
  ('cosmic',   'Cosmic',   '🌌', 'Deep space vibes',     '#6366f1'),
  ('daylight', 'Daylight', '☀️', 'Bright & clean',       '#0ea5e9'),
  ('emerald',  'Emerald',  '🌿', 'Calm nature focus',    '#10b981'),
  ('cyber',    'Cyber',    '👾', 'Neon tech energy',     '#a855f7'),
  ('sunset',   'Sunset',   '🌅', 'Warm evening glow',    '#f97316');

-- Demo users (password = 'Password@123' – replace with real hashes in production!)
-- Using a simple placeholder hash for demo. In real apps use bcrypt/argon2.
INSERT INTO users (
  id, email, password_hash, role, name, grade, stream, avatar_id,
  dream_career, interests, xp, streak_days, level, overall_score,
  target_exam, school_name, joined_at
) VALUES
  (
    'a1000000-0000-4000-8000-000000000001',
    'aryan.sharma@example.com',
    crypt('Password@123', gen_salt('bf')),
    'student', 'Aryan Sharma', 'Class 11', 'Science (PCM)', 'av-1',
    'AI & Robotics Engineer',
    ARRAY['Artificial Intelligence', 'Space & Astronomy', 'Competitive Math', 'Game Development'],
    1450, 7, 4, 62,
    'JEE Advanced', 'Delhi Public School, R.K. Puram', '2026-01-15'
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'priya.patel@example.com',
    crypt('Password@123', gen_salt('bf')),
    'student', 'Priya Patel', 'Class 12', 'Science (PCB)', 'av-3',
    'Neurosurgeon & Biotech Researcher',
    ARRAY['Biotechnology', 'Competitive Math', 'Artificial Intelligence'],
    2380, 14, 6, 84,
    'NEET UG', 'National Public School, Bangalore', '2025-11-10'
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'rohan.verma@example.com',
    crypt('Password@123', gen_salt('bf')),
    'student', 'Rohan Verma', 'Class 10', 'Foundational STEM', 'av-2',
    'Quantitative Trader & FinTech Architect',
    ARRAY['Fintech & Markets', 'Competitive Math', 'Robotics & Hardware'],
    920, 4, 3, 54,
    'KVPY / NTSE', 'St. Xavier Collegiate School', '2026-02-01'
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'ananya.sen@example.com',
    crypt('Password@123', gen_salt('bf')),
    'student', 'Ananya Sen', 'Class 9', 'Foundational STEM', 'av-4',
    'Astrophysicist & Quantum Computing Scientist',
    ARRAY['Space & Astronomy', 'Artificial Intelligence', 'Design & UX'],
    1840, 11, 5, 78,
    'Olympiad (INMO/INPO)', 'Modern High School, Kolkata', '2025-12-05'
  );

-- Diagnostic questions
INSERT INTO diagnostic_questions (id, subject, difficulty, question, options, correct_index, explanation) VALUES
  ('dq-1', 'Mathematics', 'Medium',
   'If the roots of the quadratic equation x² - 7x + 12 = 0 are α and β, what is the value of α² + β²?',
   ARRAY['25', '49', '37', '14'], 0,
   'α + β = 7 and αβ = 12. Using α² + β² = (α + β)² - 2αβ = 49 - 24 = 25.'),
  ('dq-2', 'Physics', 'Medium',
   'A ball is projected horizontally with velocity 20 m/s from a height of 80 m. How long does it take to hit the ground? (g = 10 m/s²)',
   ARRAY['2.0 s', '4.0 s', '8.0 s', '16.0 s'], 1,
   'Vertical motion: h = 0.5 * g * t² => 80 = 5t² => t² = 16 => t = 4 s.'),
  ('dq-3', 'Logical Reasoning', 'Hard',
   'In a code, VECTOR is written as WFDUPU. What will MATRIX be written as?',
   ARRAY['NBUJSY', 'NBUSJY', 'NBVJSY', 'MCUJSY'], 0,
   'Each letter is shifted +1, +0, +1, +0 pattern or +1 for consonants: M->N, A->B, T->U, R->S, I->J, X->Y.'),
  ('dq-4', 'Biology', 'Easy',
   'Which organelle is responsible for generating cellular ATP during aerobic respiration?',
   ARRAY['Golgi Apparatus', 'Ribosome', 'Mitochondria', 'Lysosome'], 2,
   'Mitochondria are often referred to as the powerhouse of the cell because they synthesize ATP.');

-- Knowledge gaps (global templates – can later be assigned per user)
INSERT INTO knowledge_gaps (id, subject, target_concept, target_mastery, prerequisite_concept, prerequisite_mastery, severity, root_cause, bridge_remedy, estimated_fix_time) VALUES
  ('kg-1', 'Mathematics', 'Quadratic Equations & Complex Roots', 58,
   'Algebraic Factorization & Splitting Middle Term', 42, 'critical',
   'Difficulty isolating roots stems from incomplete prerequisite intuition of factoring trinomials.',
   'Complete 10-minute micro-module on Quadratic Factorization shortcuts.', '15 mins'),
  ('kg-2', 'Physics', '2D Projectile Motion under Gravity', 65,
   'Vector Decomposition (Orthogonal Components)', 51, 'moderate',
   'Mixing horizontal velocity with gravitational acceleration vectors.',
   'Interactive Vector Split simulator with instant trajectory visualization.', '12 mins'),
  ('kg-3', 'Biology', 'Cellular Respiration & Krebs Cycle', 50,
   'Glycolysis & Enzyme Activation Energy', 48, 'critical',
   'Struggling to track carbon atom transitions between pyruvate and acetyl-CoA.',
   'Visual step-by-step metabolic cycle builder with memory anchors.', '20 mins');

-- Learning path nodes
INSERT INTO learning_path_nodes (id, title, subject, phase, xp_reward, duration_minutes, description, sort_order) VALUES
  ('node-1', 'Bridge: Trinomial Factorization Fundamentals', 'Mathematics', 'Bridge Prerequisite', 100, 12,
   'Master grouping and splitting the middle term with zero hesitation.', 1),
  ('node-2', 'Core: Quadratic Roots & Discriminant Analysis', 'Mathematics', 'Core Mastery', 150, 18,
   'Understand nature of roots and solve complex quadratic problems.', 2);

-- Subscription plans
INSERT INTO subscription_plans (id, name, base_price_monthly, annual_multiplier, features, is_popular) VALUES
  ('plan-free',    'Explorer',  0,    1,  ARRAY['Basic diagnostic', 'Limited AI tutor', '3 lessons/week'], FALSE),
  ('plan-pro',     'Scholar',   499,  10, ARRAY['Unlimited adaptive quizzes', 'Full AI tutor', 'All lessons', 'Career guidance'], TRUE),
  ('plan-premium', 'Achiever',  999,  10, ARRAY['Everything in Scholar', '1:1 mentor sessions', 'Exam simulator', 'Scholarship priority'], FALSE);

-- Scholarship tiers
INSERT INTO scholarship_tiers (min_score, max_score, discount_percentage, label, badge_text, message, perks) VALUES
  (90, 100, 50, 'Elite Scholar',   '50% OFF', 'Outstanding performance!', ARRAY['Priority mentor access', 'Free exam mocks']),
  (75, 89,  30, 'Rising Star',     '30% OFF', 'Great progress – keep going!', ARRAY['Extra practice sets']),
  (60, 74,  15, 'Momentum Builder','15% OFF', 'Solid foundation forming.', ARRAY['Weekly progress report']);

-- ============================================================
-- 18. USEFUL VIEWS
-- ============================================================

CREATE OR REPLACE VIEW v_student_dashboard AS
SELECT
  u.id,
  u.name,
  u.email,
  u.grade,
  u.stream,
  u.xp,
  u.streak_days,
  u.level,
  u.overall_score,
  u.dream_career,
  u.target_exam,
  a.name AS avatar_name,
  a.emoji AS avatar_emoji,
  a.badge AS avatar_badge,
  (SELECT COUNT(*) FROM user_badges ub WHERE ub.user_id = u.id AND ub.unlocked) AS badges_unlocked,
  (SELECT COUNT(*) FROM user_learning_path ulp WHERE ulp.user_id = u.id AND ulp.status = 'completed') AS nodes_completed
FROM users u
LEFT JOIN avatars a ON a.id = u.avatar_id
WHERE u.role = 'student';

-- ============================================================
-- DONE
-- ============================================================
-- To create the database:
--   createdb adaptive_learning
--   psql -d adaptive_learning -f adaptive_learning_schema.sql
-- ============================================================
