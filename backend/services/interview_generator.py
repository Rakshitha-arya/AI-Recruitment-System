import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_interview(resume_text, resume_skills):

    skills = ", ".join(resume_skills)

    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Resume

{resume_text}

Candidate Skills

{skills}

Generate a COMPLETE personalized interview.

Use proper headings.

----------------------------------------------------

## HR ROUND

Generate ONLY 5 HR Questions.

For every question provide

Question
Expected Answer
Interview Tip

----------------------------------------------------

## TECHNICAL ROUND

Generate ONLY 8 Technical Questions.

Questions must be based on these skills:

{skills}

For every question provide

Question
Difficulty
Expected Answer
Interview Tip

----------------------------------------------------

## PROJECT ROUND

Generate ONLY 5 Project Questions.

Questions must come from the projects mentioned in the resume.

Ask about

Architecture
Database
Challenges
Deployment
API

Expected Answer

----------------------------------------------------

## CODING ROUND

Generate ONLY 5 Coding Questions.

For every question provide

Question
Difficulty
Approach
Expected Answer

----------------------------------------------------

## SQL ROUND

Generate ONLY 3 SQL Questions.

Topics

JOIN
Normalization
Transactions

Expected Answer

----------------------------------------------------

## FINAL FEEDBACK

Strong Points

Weak Areas

Missing Skills

Projects to Build

Placement Roadmap

IMPORTANT

Generate COMPLETE questions.

Never return only headings.

Never skip any section.

Use markdown formatting.
"""

    try:

        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                max_output_tokens=8192,
            ),
        )

        return response.text

    except Exception as e:

        return f"Gemini Error: {str(e)}"