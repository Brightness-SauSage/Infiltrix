from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

with open('model.pkl', 'rb') as f:
    detection = pickle.load(f)

@app.route('/predict', methods=['POST'])


def predict():

    data = request.get_json()
    input_str = data['TEXT']
    
    result = detection(input_str)
    
    return jsonify({'prediction ': result})

if __name__ == '__main__':
    app.run(debug=True)
