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
    input_str = data["Text"]
    prediction = detection(input_str)

    response = (
        supabase.table("countries")
        .insert({"input": input_str, "prediction": prediction})
        .execute()
    )
    print(response)

    return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True)
