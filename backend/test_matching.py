from services.matching_engine import rank_jobs

candidate_skills = [
    "Python",
    "Flask",
    "React",
    "SQL",
    "Git",
    "Machine Learning"
]

jobs = [
    {
        "title": "Software Engineer",
        "company": "TCS",
        "skills": [
            "Python",
            "Flask",
            "React",
            "MySQL"
        ]
    },

    {
        "title": "AI Engineer",
        "company": "Infosys",
        "skills": [
            "Python",
            "Machine Learning",
            "TensorFlow",
            "SQL"
        ]
    },

    {
        "title": "Full Stack Developer",
        "company": "Wipro",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Flask"
        ]
    }
]

results = rank_jobs(candidate_skills, jobs)

for job in results:
    print(job)