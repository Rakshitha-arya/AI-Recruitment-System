from nlp.skill_extractor import extract_skills


def analyze_job_match(resume_skills, job_description):

    # Extract skills from Job Description
    jd_skills = extract_skills(job_description)

    matched = []
    missing = []

    for skill in jd_skills:
        if skill.lower() in [s.lower() for s in resume_skills]:
            matched.append(skill)
        else:
            missing.append(skill)

    if len(jd_skills) == 0:
        score = 0
    else:
        score = round((len(matched) / len(jd_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }