from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__='posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    image = db.Column(db.String, nullable=False)
    categories = db.Column(db.String)
    title = db.Column(db.String(100))
    content = db.Column(db.String(5000))
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default = datetime.utcnow())

    user = db.relationship('User', back_populates='posts')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "image": self.image,
            "categories": self.categories,
            "title": self.title,
            "content": self.content,
            "location": self.location,
            "createdAt": self.created_at
        }
