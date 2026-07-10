def generate_resume_suggestions(
    ats_score,
    matched_skills,
    missing_skills,
    resume_skills
):

    suggestions = []

    # ATS Score Suggestions
    if ats_score < 60:
        suggestions.append(
            "Your ATS score is low. Add more relevant technical skills."
        )

    elif ats_score < 80:
        suggestions.append(
            "Your ATS score is good but can be improved by adding more job-specific keywords."
        )

    else:
        suggestions.append(
            "Excellent ATS score! Your resume is highly compatible."
        )

    # Missing Skills
    for skill in missing_skills:
        suggestions.append(
            f"Consider learning and adding '{skill}' to your resume."
        )

    # Projects
    suggestions.append(
        "Include at least 2-3 industry-level projects with measurable outcomes."
    )

    # Certifications
    suggestions.append(
        "Add certifications relevant to your career goals."
    )

    # GitHub
    suggestions.append(
        "Include your GitHub repository links."
    )

    # LinkedIn
    suggestions.append(
        "Include your LinkedIn profile."
    )

    # Achievements
    suggestions.append(
        "Highlight achievements using action verbs and measurable results."
    )

    # Experience
    suggestions.append(
        "Mention internships, hackathons, or open-source contributions."
    )

    return suggestions