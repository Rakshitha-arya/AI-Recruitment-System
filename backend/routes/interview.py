from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.interview_session import InterviewSession
from extensions import db

from services.interview_service import generate_questions
from services.interview_evaluator import evaluate_answer

interview_bp = Blueprint("interview", __name__)


# ============================================================
# START INTERVIEW
# ============================================================

@interview_bp.route("/start", methods=["POST"])
@jwt_required()
def start_interview():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "Request body missing."
            }), 400

        resume_text = data.get("resume_text", "")
        resume_skills = data.get("resume_skills", [])

        if resume_text == "":
            return jsonify({
                "status": "error",
                "message": "Resume text missing."
            }), 400

        questions = generate_questions(
            resume_text,
            resume_skills
        )

        user_id = get_jwt_identity()

        InterviewSession.query.filter_by(
            candidate_id=user_id,
            completed=False
        ).delete()

        session = InterviewSession(
            candidate_id=user_id,
            current_question=0,
            total_questions=len(questions),
            score=0,
            completed=False
        )

        db.session.add(session)
        db.session.commit()

        return jsonify({

            "status": "success",

            "session_id": session.id,

            "current_question": 0,

            "total_questions": len(questions),

            "question": questions[0],

            "questions": questions

        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ============================================================
# EVALUATE ANSWER
# ============================================================

@interview_bp.route("/answer", methods=["POST"])
@jwt_required()
def answer():

    try:

        data = request.get_json()

        session_id = data.get("session_id")
        questions = data.get("questions", [])

        index = data.get("question_index")

        answer = data.get("answer")

        session = InterviewSession.query.get(session_id)

        if not session:

            return jsonify({
                "status": "error",
                "message": "Interview session not found."
            }), 404

        question = questions[index]["question"]

        feedback = evaluate_answer(
            question,
            answer
        )

        score = feedback.get("score", 0)

        session.score += score

        session.current_question += 1

        if session.current_question >= session.total_questions:

            session.completed = True

        db.session.commit()

        return jsonify({

            "status": "success",

            "feedback": feedback,

            "next_index": session.current_question,

            "completed": session.completed

        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ============================================================
# FINAL REPORT
# ============================================================

@interview_bp.route("/report/<int:session_id>")
@jwt_required()
def report(session_id):

    session = InterviewSession.query.get(session_id)

    if not session:

        return jsonify({
            "status": "error"
        }), 404

    percentage = round(

        (session.score /
         (session.total_questions * 10)) * 100,

        2

    )

    return jsonify({

        "status": "success",

        "score": session.score,

        "percentage": percentage,

        "total_questions": session.total_questions,

        "completed": session.completed

    })