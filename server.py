from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

from asgiref.wsgi import WsgiToAsgi
from app import app as flask_app

# Supervisor runs `uvicorn server:app` — expose the Flask WSGI app as ASGI.
app = WsgiToAsgi(flask_app)
