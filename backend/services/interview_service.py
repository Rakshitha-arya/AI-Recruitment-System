import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_questions(resume_text, resume_skills):

    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Resume

{resume_text}

Skills

{', '.join(resume_skills)}

Generate exactly 10 interview questions.

Mix

HR

Technical

Coding

Projects

SQL

Return ONLY JSON.

Example

[
 {{
   "type":"HR",
   "question":"Tell me about yourself."
 }},
 {{
   "type":"Technical",
   "question":"Explain Flask Blueprint."
 }}
]

Do not return markdown.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "")

    elif text.startswith("```"):
        text = text.replace("```", "")

    import json

    return json.loads(text)