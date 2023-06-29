import json
from db_models import *
#supply the hangman with the json data
from create_app import create_app
create_app()

def is_english(s):
    if not isinstance(s, str):
        raise TypeError("Expected string input")
    try:
        s.encode(encoding='utf-8').decode('ascii')
    except UnicodeDecodeError:
        return False
    else:
        return True

def movies_check(s):
    if not isinstance(s, str):
        raise TypeError("Expected string input")
    if "\\" in s:
        return False
    elif (s.isalpha() or " " in s):
        return True

def open_json_file(file_name):
    with open(file_name, 'r') as file:
        json_data = json.load(file)
    return json_data

data = open_json_file('data/books.json')['books']


