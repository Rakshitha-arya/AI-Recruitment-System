from extensions import db

class RecruiterProfile(db.Model):
    __tablename__ = "recruiter_profiles"

    recruiter_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    company_name = db.Column(db.String(150), nullable=False)
    designation = db.Column(db.String(100))
    company_email = db.Column(db.String(100))
    company_phone = db.Column(db.String(15))
    company_website = db.Column(db.String(255))
    company_address = db.Column(db.Text)

    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))

    user = db.relationship("User", backref="recruiter_profile")

    def __repr__(self):
        return f"<RecruiterProfile {self.company_name}>"