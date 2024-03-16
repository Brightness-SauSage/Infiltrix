# %%
import pandas as pd
import string
from sklearn.preprocessing import LabelEncoder

# %%

df = pd.read_csv('Dataset_5971.csv', encoding='ISO-8859-1')

df["TEXT"] = df["TEXT"].astype(str)

def remove_punctuations(text):
    for char in string.punctuation:
        text = text.replace(char, '')
    return text

df['TEXT'] = df['TEXT'].apply(remove_punctuations) 
df['TEXT'] = df['TEXT'].str.lower()
df['LABEL'] = df['LABEL'].str.lower()


# %%
df.info()

# %%
df

# %%
label_encoder = LabelEncoder()
encoder_email = LabelEncoder()
encoder_url = LabelEncoder()
encoder_phone = LabelEncoder()

# Fit and transform each column
df['LABEL'] = label_encoder.fit_transform(df['LABEL'])
df['EMAIL'] = encoder_email.fit_transform(df['EMAIL'])
df['URL'] = encoder_url.fit_transform(df['URL'])
df['PHONE'] = encoder_phone.fit_transform(df['PHONE'])

# %%
df.head(10)

# %%
print(df['LABEL'].unique())
print(df['URL'].unique())
print(df['EMAIL'].unique())
print(df['PHONE'].unique())

# %%
label_mapping = {label: category for label, category in zip(label_encoder.transform(label_encoder.classes_), label_encoder.classes_)}
email_mapping = {label: category for label, category in zip(encoder_email.transform(encoder_email.classes_), encoder_email.classes_)}
url_mapping = {label: category for label, category in zip(encoder_url.transform(encoder_url.classes_), encoder_url.classes_)}
phone_mapping = {label: category for label, category in zip(encoder_phone.transform(encoder_phone.classes_), encoder_phone.classes_)}

# Print out mappings
print("Mapping for 'LABEL':", label_mapping)
print("Mapping for 'EMAIL':", email_mapping)
print("Mapping for 'URL':", url_mapping)
print("Mapping for 'PHONE':", phone_mapping)

# %%
df = df.drop_duplicates()
df.groupby('LABEL').describe()

# %%
import nltk
from nltk.tokenize import word_tokenize
nltk.download('punkt')

# %%
df['TEXT TOKEN'] = df['TEXT'].apply(word_tokenize)


# %%
df.tail()

# %%
from nltk.stem import WordNetLemmatizer
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

lemmatizer = WordNetLemmatizer()
df['Text Lemmatize'] = df['TEXT TOKEN'].apply(lambda tokens: [lemmatizer.lemmatize(token) for token in tokens])

# %%
df.head(100)

# %%
df['TEXT'] = df['Text Lemmatize'].apply(lambda token: ' '.join(token) )
df.head(10)


# %%
df.drop(['TEXT TOKEN','Text Lemmatize'],axis=1,inplace=True)

# %%
df.to_csv('output.csv', index=False)

# %%
df.head()

# %%
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder
import re

# Feature extraction
X_text = df['TEXT']
X_additional_features = df[['URL', 'EMAIL', 'PHONE']]
y = df['LABEL'] 

vectorizer = TfidfVectorizer()
X_text_tfidf = vectorizer.fit_transform(X_text)


import scipy.sparse as sp
X_combined = sp.hstack((X_text_tfidf, X_additional_features.values), format='csr')

X_train, X_test, y_train, y_test = train_test_split(X_combined, y, test_size=0.2, random_state=42)

adaboost_clf = AdaBoostClassifier(n_estimators=50, random_state=42)
adaboost_clf.fit(X_train, y_train)

y_pred = adaboost_clf.predict(X_test)

# Evaluation
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# %%
def detect_url(input_str):
    url_pattern = re.compile(r'https?://\S+|www\.\S+|bit\.ly/\S+')
    return bool(re.search(url_pattern, input_str))

def detect_email(input_str):
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    return bool(re.search(email_pattern, input_str))

def detect_phone(input_str):
    phone_pattern = re.compile(r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b')
    return bool(re.search(phone_pattern, input_str))

def detection(input_str):

    user_url = detect_url(input_str)
    user_email = detect_email(input_str)
    user_phone = detect_phone(input_str)

    input_str_tfidf = vectorizer.transform([input_str])

    import scipy.sparse as sp
    input_str_combined = sp.hstack((input_str_tfidf, [[user_url, user_email, user_phone]]), format='csr')

    predicted_label = adaboost_clf.predict(input_str_combined)

    if predicted_label == 2:
        return 'spam'
    elif predicted_label == 1:
        return 'smishing'
    else:
        return 'not spam'

# %%
test = 'Dear valued customer, our company is delighted to offer you a special discount on our latest products. Please visit our website for more information.'
detection(test)

# %%
# import pickle

# with open('model.pkl', 'wb') as f:
#     pickle.dump((vectorizer, adaboost_clf, detection), f)


