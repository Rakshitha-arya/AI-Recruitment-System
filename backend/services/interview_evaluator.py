import google.generativeai as genai
from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def evaluate_answer(question, answer):

    prompt = f"""
You are a Senior Software Engineer.

Question

{question}

Candidate Answer

{answer}

Evaluate.

Return ONLY JSON.

{{
 "score":9,
 "correct_answer":"...",
 "strengths":"...",
 "weaknesses":"...",
 "improvement":"..."
}}

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