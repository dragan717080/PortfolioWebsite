from routing.routes import *
from routing.routes_games import *
from create_app import create_app

app = create_app()

app.register_blueprint(index_pages)
app.register_blueprint(games_pages)

if __name__ == "__main__":
    app.run(debug = True)
