from extensions import db

class JobPosting(db.Model):
    __tablename__ = "job_postings"

    job_id = db.Column(db.Integer, primary_key=True)

    recruiter_id = db.Column(
        db.Integer,
        db.ForeignKey("recruiter_profiles.recruiter_id"),
        nullable=False
    )

    job_title = db.Column(db.String(150), nullable=False)
    company_name = db.Column(db.String(150), nullable=False)
    job_location = db.Column(db.String(150))

    employment_type = db.Column(
        db.Enum(
            "Full-time",
            "Part-time",
            "Internship",
            "Contract"
        ),
        default="Full-time"
    )

    experience_required = db.Column(db.String(50))
    salary_range = db.Column(db.String(100))

    job_description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.Text, nullable=False)
    qualifications = db.Column(db.Text)

    application_deadline = db.Column(db.Date)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.current_timestamp()
    )

    recruiter = db.relationship(
        "RecruiterProfile",
        backref="job_postings"
    )

    def __repr__(self):
        return f"<JobPosting {self.job_title}>"