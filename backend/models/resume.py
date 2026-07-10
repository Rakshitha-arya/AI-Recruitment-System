from extensions import db

class Resume(db.Model):
    __tablename__ = "resumes"

    resume_id = db.Column(db.Integer, primary_key=True)

    candidate_id = db.Column(
        db.Integer,
        db.ForeignKey("candidate_profiles.candidate_id"),
        nullable=False
    )

    resume_title = db.Column(db.String(150))
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)

    file_type = db.Column(
        db.Enum("PDF", "DOCX"),
        nullable=False
    )

    extracted_text = db.Column(db.Text)

    ats_score = db.Column(db.Numeric(5, 2), default=0.00)
    overall_match_percentage = db.Column(db.Numeric(5, 2), default=0.00)

    uploaded_at = db.Column(
        db.DateTime,
        server_default=db.func.current_timestamp()
    )

    candidate = db.relationship(
        "CandidateProfile",
        backref="resumes"
    )

    def __repr__(self):
        return f"<Resume {self.file_name}>"