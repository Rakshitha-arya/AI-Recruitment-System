import re

# Common technical and soft skills
SKILLS = {
    "python", "java", "c", "c++", "javascript",
    "html", "css", "react", "angular", "vue",
    "node.js", "flask", "django", "spring",
    "mysql", "sql", "mongodb", "postgresql",
    "git", "github", "docker", "kubernetes",
    "aws", "azure", "machine learning",
    "deep learning", "data science",
    "artificial intelligence",
    "nlp", "opencv", "tensorflow",
    "pytorch", "linux",
    "problem solving",
    "communication",
    "leadership",
    "teamwork",
    "time management"
}


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill.title())

    return sorted(list(set(found_skills)))