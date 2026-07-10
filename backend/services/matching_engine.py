from services.ats_engine import calculate_ats_score


def rank_jobs(candidate_skills, jobs):
    """
    Rank multiple jobs based on ATS score.
    """

    ranked_jobs = []

    for job in jobs:

        result = calculate_ats_score(
            candidate_skills,
            job["skills"]
        )

        ranked_jobs.append({
            "job_title": job["title"],
            "company": job["company"],
            "ats_score": result["ats_score"],
            "matched_skills": result["matched_skills"],
            "missing_skills": result["missing_skills"]
        })

    ranked_jobs.sort(
        key=lambda x: x["ats_score"],
        reverse=True
    )

    return ranked_jobs