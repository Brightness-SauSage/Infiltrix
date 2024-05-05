from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import *
import supabase
import database.setting as setting
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

supabase: Client = create_client(setting.url, setting.key)


@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    message = data["message"]
    prediction = detection(message)

    response = (
        supabase.table("homepage")
        .insert({"message": message, "prediction": prediction})
        .execute()
    )
    print("message submit: ", response)

    return jsonify(
        {
            "process": "homepage request",
            "status": "success",
            "message": message,
            "prediction": prediction,
        }
    )


@app.route("/api/train-model", methods=["POST"])
def train_model():
    data = request.get_json(force=True)
    message = data["message"]
    message_type = data["message_type"]
    response = (
        supabase.table("train_our_model")
        .insert({"message": message, "message_type": message_type})
        .execute()
    )
    print("train our model request submit: ", response)
    return jsonify(
        {
            "process": "train our model page request",
            "status": "success",
            "message": message,
            "message_type": message_type,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
