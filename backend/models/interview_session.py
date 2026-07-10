from extensions import db


class InterviewSession(db.Model):

    __tablename__ = "interview_sessions"

    id = db.Column(db.Integer, primary_key=True)

    candidate_id = db.Column(db.Integer)

    current_question = db.Column(db.Integer, default=0)

    total_questions = db.Column(db.Integer, default=10)

    score = db.Column(db.Float, default=0)

    completed = db.Column(db.Boolean, default=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )