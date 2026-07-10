from services.interview_engine import generate_interview

skills = [
    "Python",
    "Flask",
    "SQL"
]

questions = generate_interview(skills)

for section, qlist in questions.items():

    print("\n" + section)

    print("-" * 40)

    for i, q in enumerate(qlist, start=1):
        print(f"{i}. {q}")