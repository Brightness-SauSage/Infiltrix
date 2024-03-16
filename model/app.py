from flask import Flask, request, jsonify, abort
import pickle
from model import detection

app = Flask(__name__)

# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_str = data['text']
    
    result = detection(input_str)

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
