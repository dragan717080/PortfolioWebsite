from flask import render_template, Blueprint
from db_models import Movie

games_pages = Blueprint('games', __name__,
    template_folder='Templates', static_folder='static', url_prefix='/games')

@games_pages.route('/')
def games():
    return render_template('games/games.html')

@games_pages.route('/hangman')
def hangman():
    quiz = Movie.find_all(Movie)
    return render_template('games/hangman.html', quiz=quiz)

@games_pages.route('/memory')
def memory():
    return render_template('games/memory.html')
