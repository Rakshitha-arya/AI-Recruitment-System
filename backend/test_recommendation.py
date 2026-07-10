from services.recommendation_engine import recommend_learning

missing_skills = [
    "Docker",
    "AWS",
    "MySQL"
]

recommendations = recommend_learning(missing_skills)

for skill, resources in recommendations.items():
    print(f"\nSkill: {skill}")

    for resource in resources:
        print(f"  - {resource}")