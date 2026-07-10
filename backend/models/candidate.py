from extensions import db

class CandidateProfile(db.Model):
    __tablename__ = "candidate_profiles"

    candidate_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.Enum("Male", "Female", "Other"))
    address = db.Column(db.Text)
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))
    pincode = db.Column(db.String(10))

    college_name = db.Column(db.String(150))
    degree = db.Column(db.String(100))
    branch = db.Column(db.String(100))
    graduation_year = db.Column(db.Integer)
    cgpa = db.Column(db.Numeric(3, 2))

    linkedin_url = db.Column(db.String(255))
    github_url = db.Column(db.String(255))

    user = db.relationship("User", backref="candidate_profile")

    def __repr__(self):
        return f"<CandidateProfile {self.candidate_id}>"