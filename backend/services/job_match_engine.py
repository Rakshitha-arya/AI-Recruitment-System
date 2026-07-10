def analyze_job_match(resume_skills, job_description):

    job_description = job_description.lower()

    matched = []
    missing = []

    for skill in resume_skills:

        if skill.lower() in job_description:
            matched.append(skill)

    # Common technical skills
    all_skills = [
        "Python",
        "Flask",
        "React",
        "MySQL",
        "Git",
        "Docker",
        "AWS",
        "Java",
        "C++",
        "JavaScript",
        "Node.js",
        "MongoDB",
        "SQL"
    ]

    for skill in all_skills:

        if skill.lower() in job_description:

            if skill not in matched:
                missing.append(skill)

    total = len(matched) + len(missing)

    if total == 0:
        score = 0
    else:
        score = round((len(matched) / total) * 100)

    if score >= 85:
        recommendation = "Excellent Match"

    elif score >= 65:
        recommendation = "Good Match"

    elif score >= 40:
        recommendation = "Average Match"

    else:
        recommendation = "Poor Match"

    return {

        "match_score": score,

        "matched_skills": matched,

        "missing_skills": missing,

        "recommendation": recommendation

    }