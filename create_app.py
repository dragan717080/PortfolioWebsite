from flask import Flask
from config import *
from db_models import *


def create_app():
    app = Flask(__name__, template_folder = 'Templates')

    set_config(app.config, app.jinja_env)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.app_context().push()
    SESSION_TYPE = 'sqlalchemy'
    app.config.from_object(__name__)

    return app
