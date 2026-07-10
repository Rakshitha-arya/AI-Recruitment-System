from extensions import db

class Analysis(db.Model):
    __tablename__ = "analysis"

    analysis_id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id")
    )

    ats_score = db.Column(db.Float)

    matched_skills = db.Column(db.Text)

    missing_skills = db.Column(db.Text)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.current_timestamp()
    )