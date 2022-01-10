import pandas as pd
import numpy as np
import string
import operator
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from tensorflow.keras.layers import Input, LSTM, Embedding, Dense, Dropout
from tensorflow.keras.models import Model,Sequential
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import os
import re
import pickle
printable=set(string.printable)
os.environ['TF_XLA_FLAGS'] = '--tf_xla_enable_xla_devices'
max_length=100
len_words=15642

def decontracted(phrase):
    phrase = re.sub(r"won't", "will not", phrase)
    phrase = re.sub(r"can\'t", "can not", phrase)
    phrase = re.sub(r"haven't", "will not", phrase)
    phrase = re.sub(r"wasn\'t", "can not", phrase)
    phrase = re.sub(r"n\'t", " not", phrase)
    phrase = re.sub(r"\'re", " are", phrase)
    phrase = re.sub(r"\'s", " is", phrase)
    phrase = re.sub(r"\'d", " would", phrase)
    phrase = re.sub(r"\'ll", " will", phrase)
    phrase = re.sub(r"\'t", " not", phrase)
    phrase = re.sub(r"\'ve", " have", phrase)
    phrase = re.sub(r"\'m", " am", phrase)
    return phrase

def create_model():
    global model
    model=Sequential()
    model.add(Embedding(len_words,100,input_length=max_length))
    model.add(Dropout(0.2))
    model.add(LSTM(100,dropout=0.2,recurrent_dropout=0.2))
    model.add(Dense(30,activation='softmax'))
    model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])

def clean_title(title):
    try:
        title=title.replace(',','')
        title = ''.join(filter(lambda x: x in printable, title))
        title = re.sub(r"http\S+", "", title)
        title = re.sub("\S*\d\S*", "", title).strip()
        title = re.sub('[^A-Za-z]+', ' ', title)
        title = ' '.join(e.lower() for e in title.split())
        title = decontracted(title)
        return title.strip()
    except:
        return title

def load_resources():
    global tokenizer
    global model
    model.load_weights('./files/YTlstm.h5')
    with open('./files/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

def shape_title(title):
    title=clean_title(title)
    title=tokenizer.texts_to_sequences(title)
    title=pad_sequences(title,maxlen=max_length)
    return title

def predictCategory(title):
    title=shape_title(np.array([title]))
    cat=model.predict(title)
    cat=np.argmax(cat, axis=1)
    return cat

create_model()
load_resources()
