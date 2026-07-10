import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_interview(resume_text, resume_skills):

    prompt = f"""
You are an expert technical interviewer.

Candidate Resume:

{resume_text}

Skills:

{", ".join(resume_skills)}

Generate:

1. 5 HR Questions

2. 5 Technical Questions

3. 5 Coding Questions

4. 5 Project Based Questions

Return ONLY in this format:

## HR Questions

1.
2.
3.

## Technical Questions

1.
2.
3.

## Coding Questions

1.
2.
3.

## Project Questions

1.
2.
3.

Do not write explanations.
Generate questions only.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Gemini Error: {str(e)}"