import google.generativeai as genai
from config import Config

# Configure Gemini
genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def get_chatbot_response(message, analysis=None):

    analysis = analysis or {}

    ats_score = analysis.get("ats_score", 0)
    matched_skills = analysis.get("matched_skills", [])
    missing_skills = analysis.get("missing_skills", [])
    resume_skills = analysis.get("resume_skills", [])

    prompt = f"""
You are an AI Placement Coach.

Help engineering students with:

- Resume Improvement
- ATS Score
- Interview Preparation
- Python
- Java
- C
- C++
- React
- Flask
- SQL
- DBMS
- Operating Systems
- Computer Networks
- Aptitude
- Data Structures
- Algorithms
- Projects
- Career Guidance
- Placement Preparation

If the question is about the uploaded resume, use this information.

Resume Analysis

ATS Score:
{ats_score}

Resume Skills:
{", ".join(resume_skills)}

Matched Skills:
{", ".join(matched_skills)}

Missing Skills:
{", ".join(missing_skills)}

User Question:

{message}

Rules:

1. Answer clearly.
2. Use bullet points whenever useful.
3. Keep answers easy to understand.
4. If the user asks programming questions, explain with examples.
5. If asked for interview questions, provide multiple questions.
6. If asked about ATS, use the ATS score above.
7. If asked about missing skills, recommend learning resources.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Gemini Error: {str(e)}"