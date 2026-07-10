from flask import Flask

from config import Config
from extensions import db, cors, bcrypt, jwt

# Import Models
from models import *

# Import Blueprints
from routes.auth import auth_bp
from routes.resume import resume_bp
from routes.analysis import analysis_bp
from routes.chatbot import chatbot_bp
from routes.interview import interview_bp

# ----------------------------------
# Create Flask App
# ----------------------------------

app = Flask(__name__)
app.config.from_object(Config)

# ----------------------------------
# Initialize Extensions
# ----------------------------------

db.init_app(app)

cors.init_app(
    app,
    resources={
        r"/api/*": {
            "origins": "http://localhost:5173"
        }
    },
    supports_credentials=True
)

bcrypt.init_app(app)
jwt.init_app(app)

# ----------------------------------
# JWT Error Handlers
# ----------------------------------

@jwt.unauthorized_loader
def unauthorized_callback(reason):

    print("\nUNAUTHORIZED ERROR")
    print(reason)

    return {
        "status": "error",
        "message": reason
    }, 401


@jwt.invalid_token_loader
def invalid_token_callback(reason):

    print("\nINVALID TOKEN")
    print(reason)

    return {
        "status": "error",
        "message": reason
    }, 422


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):

    print("\nTOKEN EXPIRED")

    return {
        "status": "error",
        "message": "Token has expired. Please login again."
    }, 401


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):

    print("\nTOKEN REVOKED")

    return {
        "status": "error",
        "message": "Token has been revoked."
    }, 401


@jwt.needs_fresh_token_loader
def fresh_token_callback(jwt_header, jwt_payload):

    print("\nFRESH TOKEN REQUIRED")

    return {
        "status": "error",
        "message": "Fresh token required."
    }, 401


# ----------------------------------
# Register Blueprints
# ----------------------------------

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(resume_bp, url_prefix="/api/resume")
app.register_blueprint(analysis_bp, url_prefix="/api/analysis")
app.register_blueprint(chatbot_bp, url_prefix="/api/chatbot")
app.register_blueprint(interview_bp, url_prefix="/api/interview")
# ----------------------------------
# Home Route
# ----------------------------------

@app.route("/")
def home():

    return {
        "message": "AI Recruitment & Candidate Preparation System API",
        "status": "Running Successfully"
    }

# ----------------------------------
# Create Database
# ----------------------------------

with app.app_context():
    db.create_all()

# ----------------------------------
# Run App
# ----------------------------------

if __name__ == "__main__":
    app.run(debug=True)