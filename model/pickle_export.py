import pickle
from model import vectorizer, adaboost_clf, detection

with open('model.pkl', 'wb') as f:
    pickle.dump((vectorizer, adaboost_clf, detection), f)