from nlp.resume_parser import extract_resume_text
from nlp.skill_extractor import extract_skills

resume = r"C:\Users\renuk\Downloads\renuka resume.pdf"

text = extract_resume_text(resume)

skills = extract_skills(text)

print("\nExtracted Skills:\n")

for skill in skills:
    print(skill)