from flask import render_template, Blueprint
from db_models import Book, Blog, Quote
from flask_paginate import Pagination, get_page_args
import math
import random

index_pages = Blueprint('index', __name__,
    template_folder='Templates', static_folder='static', url_prefix='/')

@index_pages.route('/')
def index():
    quote = random.choice(Quote.find_all(Quote))
    return render_template('index.html', quote = quote)

def get_books(offset = 0, per_page = 10):
    return Book.find_all(Book)[offset: offset + per_page]

@index_pages.route('/books')
def books():
    page, per_page, offset = get_page_args(page_parameter='page', per_page_parameter='per_page')
    books = get_books(offset=offset, per_page=per_page)
    total = math.ceil(len(Book.find_all(Book)) / 10) * 10
    pagination = Pagination(page=page, per_page=per_page, total=total, css_framework='bootstrap4')
    return render_template('books.html', books=books, page=page, per_page=50, pagination=pagination, total=total)

@index_pages.route('/projects')
def projects():
    return render_template('projects.html')

@index_pages.route('/blog')
def blogs():
    return render_template('blogs.html', blogs=Blog.find_all(Blog))

@index_pages.route('blog/<int:blog_id>')
def blog(blog_id):
    blog = Blog.find_by_id(Blog, blog_id)
    return render_template('blogs/{}.html'.format(blog.template))
