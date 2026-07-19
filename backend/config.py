import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:

    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///recruitment.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "your_jwt_secret_key"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
