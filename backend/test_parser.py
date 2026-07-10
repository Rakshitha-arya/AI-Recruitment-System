from nlp.resume_parser import extract_resume_text

resume_path = "C:\\Users\\renuk\\Downloads\\renuka resume.pdf"   # Change to your uploaded file name

text = extract_resume_text(resume_path)

print(text)