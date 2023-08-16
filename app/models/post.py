from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__='posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    picture = db.Column(db.String)
    categories = db.Column(db.String)
    title = db.Column(db.String(100))
    content = db.Column(db.String(500))
