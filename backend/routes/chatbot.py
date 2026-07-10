from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from services.chatbot_engine import get_chatbot_response

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chat", methods=["POST"])
@jwt_required()
def chat():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "Request body is missing."
            }), 400

        message = data.get("message", "").strip()
        analysis = data.get("analysis", {})

        if message == "":
            return jsonify({
                "status": "error",
                "message": "Please enter a message."
            }), 400

        reply = get_chatbot_response(
            message,
            analysis
        )

        return jsonify({

            "status": "success",
            "reply": reply

        }), 200

    except Exception as e:

        return jsonify({

            "status": "error",
            "message": str(e)

        }), 500