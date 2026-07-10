from nlp.resume_parser import extract_resume_text
from nlp.skill_extractor import extract_skills

from services.ats_engine import calculate_ats_score
from services.recommendation_engine import recommend_learning
from services.interview_engine import generate_interview

JOB_SKILLS = [
    "Python",
    "Flask",
    "React",
    "MySQL",
    "Git",
    "Docker"
]

resume_path = r"C:\Users\renuk\Downloads\renuka resume.pdf"   # Change if needed

text = extract_resume_text(resume_path)

skills = extract_skills(text)

ats = calculate_ats_score(
    skills,
    JOB_SKILLS
)

learning = recommend_learning(
    ats["missing_skills"]
)

interview = generate_interview(skills)

print("=" * 50)

print("Extracted Skills")

print(skills)

print("=" * 50)

print("ATS Score")

print(ats)

print("=" * 50)

print("Learning")

print(learning)

print("=" * 50)

print("Interview")

print(interview)