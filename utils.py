import re
import pickle

# from sklearn.feature_extraction.text import TfidfVectorizer
import scipy.sparse as sp


def detect_url(input_str):
    url_pattern = re.compile(r"https?://\S+|www\.\S+|bit\.ly/\S+")
    return bool(re.search(url_pattern, input_str))


def detect_email(input_str):
    email_pattern = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b")
    return bool(re.search(email_pattern, input_str))


def detect_phone(input_str):
    phone_pattern = re.compile(r"\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b")
    return bool(re.search(phone_pattern, input_str))


def detection(input_str):
    model = pickle.load(open("model.pkl", "rb"))
    vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
    user_url = detect_url(input_str)
    user_email = detect_email(input_str)
    user_phone = detect_phone(input_str)

    input_str_tfidf = vectorizer.transform([input_str])

    input_str_combined = sp.hstack(
        (input_str_tfidf, [[user_url, user_email, user_phone]]), format="csr"
    )
    predicted_label = model.predict(input_str_combined)

    if predicted_label == 2:
        return 2  #'spam'
    elif predicted_label == 1:
        return 1  #'smishing'
    else:
        return 0  #'not spam'
