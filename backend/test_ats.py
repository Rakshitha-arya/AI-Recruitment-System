from services.ats_engine import calculate_ats_score

resume_skills = [
    "Python",
    "Flask",
    "React",
    "SQL",
    "Git",
    "Communication"
]

job_skills = [
    "Python",
    "Flask",
    "React",
    "MySQL",
    "Git",
    "Docker"
]

result = calculate_ats_score(
    resume_skills,
    job_skills
)

print(result)