LEARNING_RESOURCES = {
    "python": [
        "Python Official Tutorial",
        "Python for Everybody (Coursera)"
    ],
    "flask": [
        "Flask Documentation",
        "Build REST APIs with Flask"
    ],
    "react": [
        "React Official Documentation",
        "React Crash Course"
    ],
    "docker": [
        "Docker Official Documentation",
        "Docker for Beginners"
    ],
    "aws": [
        "AWS Cloud Practitioner Essentials",
        "AWS Skill Builder"
    ],
    "mysql": [
        "MySQL Documentation",
        "SQLBolt"
    ],
    "git": [
        "Git Documentation",
        "Learn Git Branching"
    ],
    "machine learning": [
        "Andrew Ng Machine Learning",
        "Hands-On Machine Learning"
    ]
}


def recommend_learning(missing_skills):
    recommendations = {}

    for skill in missing_skills:
        key = skill.lower()

        if key in LEARNING_RESOURCES:
            recommendations[skill] = LEARNING_RESOURCES[key]
        else:
            recommendations[skill] = [
                f"Search tutorials for {skill}"
            ]

    return recommendations