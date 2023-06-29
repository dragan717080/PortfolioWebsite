from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
import json

games_pages = Blueprint('games', __name__,
    template_folder='Templates', static_folder='static', url_prefix="/games")

@games_pages.route("/")
def games():
    return render_template("games/games.html")

@games_pages.route("/hangman")
def hangman():
    data_file = open("data/quiz_questions.json")
    quiz = json.load(data_file)["questions"]
    return render_template("games/hangman.html", quiz = quiz)

@games_pages.route("/memory")
def memory():
    return render_template("games/memory.html")
