from datetime import datetime
from config import db

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    excluded_keys = ['_sa_instance_state']

    @staticmethod
    def remove_excluded_keys(item):
        return {var: value for var, value in vars(item).items() if var not in BaseModel.excluded_keys}

    @staticmethod
    def find_all(cls):
        return [cls.remove_excluded_keys(item) for item in cls.query.all()]

    @staticmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def delete_one(cls, **kwargs):
        cls.query.filter_by(**kwargs).delete()
        db.session.commit()

    @staticmethod
    def delete_all(cls):
        db.session.query(cls).delete()
        db.session.commit()

    def __repr__(self):
        return f'{self.__class__.__name__} {self.id}'

class Book(BaseModel):
    __bind_key__ = 'books'
    title = db.Column(db.String(100))
    author = db.Column(db.String(70))
    rating = db.Column(db.Integer)
    img = db.Column(db.String)
    review = db.Column(db.String)

    def __repr__(self):
        return f'{self.__class__.__name__} {self.id}'

class Quote(BaseModel):
    __bind_key__ = 'quotes'
    quote = db.Column(db.String)
    author = db.Column(db.String)

class Blog(BaseModel):
    __bind_key__ = 'blogs'
    title = db.Column(db.String(100))
    subtitle = db.Column(db.String)
    template = db.Column(db.String)
    img = db.Column(db.String)

class Movie(BaseModel):
    __bind_key__ = 'movies'
    title = db.Column(db.String(100))
    original_language = db.Column(db.String(3))
    overview = db.Column(db.String)
    poster_path = db.Column(db.String)
    release_date = db.Column(db.Integer)