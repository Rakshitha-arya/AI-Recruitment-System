import os

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from nlp.resume_parser import extract_resume_text
from nlp.skill_extractor import extract_skills

from services.ats_engine import calculate_ats_score
from services.recommendation_engine import recommend_learning
from services.resume_suggestion import generate_resume_suggestions
from services.job_description_matcher import analyze_job_match

analysis_bp = Blueprint("analysis", __name__)

JOB_SKILLS = [
    "Python",
    "Flask",
    "React",
    "MySQL",
    "Git",
    "Docker",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL"
]


@analysis_bp.route("/analyze", methods=["POST"])
@jwt_required()
def analyze():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is missing."
            }), 400

        file_path = data.get("file_path")
        job_description = data.get("job_description", "")

        if not file_path:
            return jsonify({
                "error": "Resume file path is required."
            }), 400

        if not os.path.exists(file_path):
            return jsonify({
                "error": "Resume file not found."
            }), 404

        # -----------------------------
        # Resume Parsing
        # -----------------------------

        resume_text = extract_resume_text(file_path)

        if not resume_text:
            return jsonify({
                "error": "Unable to read resume."
            }), 400

        # -----------------------------
        # Extract Skills
        # -----------------------------

        resume_skills = extract_skills(resume_text)

        # -----------------------------
        # ATS Score
        # -----------------------------

        ats_result = calculate_ats_score(
            resume_skills,
            JOB_SKILLS
        )

        # -----------------------------
        # Job Description Match
        # -----------------------------

        if job_description.strip():

            job_match = analyze_job_match(
                resume_skills,
                job_description
            )

        else:

            job_match = {
                "match_score": 0,
                "matched_skills": [],
                "missing_skills": []
            }

        # -----------------------------
        # Learning Recommendation
        # -----------------------------

        learning = recommend_learning(
            ats_result["missing_skills"]
        )

        # -----------------------------
        # Resume Suggestions
        # -----------------------------

        resume_suggestions = generate_resume_suggestions(
            ats_result["ats_score"],
            ats_result["matched_skills"],
            ats_result["missing_skills"],
            resume_skills
        )

        # -----------------------------
        # Job Recommendation
        # -----------------------------

        job_matches = []

        if "Python" in resume_skills:
            job_matches.append({
                "title": "Python Developer",
                "company": "Infosys",
                "match": 95
            })

        if "Flask" in resume_skills:
            job_matches.append({
                "title": "Backend Developer",
                "company": "TCS",
                "match": 90
            })

        if "React" in resume_skills:
            job_matches.append({
                "title": "Frontend Developer",
                "company": "Wipro",
                "match": 88
            })

        if "JavaScript" in resume_skills:
            job_matches.append({
                "title": "Full Stack Developer",
                "company": "Accenture",
                "match": 92
            })

        if "MySQL" in resume_skills:
            job_matches.append({
                "title": "Database Developer",
                "company": "Capgemini",
                "match": 85
            })

        if len(job_matches) == 0:
            job_matches.append({
                "title": "Software Engineer",
                "company": "Cognizant",
                "match": 70
            })

        return jsonify({

            "status": "success",

            "resume_text": resume_text,

            "resume_skills": resume_skills,

            "ats_score": ats_result["ats_score"],

            "matched_skills": ats_result["matched_skills"],

            "missing_skills": ats_result["missing_skills"],

            "job_matches": job_matches,

            "job_match": job_match,

            "learning_recommendations": learning,

            "resume_suggestions": resume_suggestions

        }), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@analysis_bp.route("/job-match", methods=["POST"])
@jwt_required()
def job_match():

    try:

        data = request.get_json()

        resume_skills = data.get("resume_skills", [])

        job_description = data.get("job_description", "")

        if not job_description:

            return jsonify({
                "error": "Job Description is required."
            }), 400

        result = analyze_job_match(
            resume_skills,
            job_description
        )

        return jsonify(result), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500