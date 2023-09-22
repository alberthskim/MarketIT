from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_posts():
    post1 = Post(
        user_id = 1,
        categories = 'Jobs',
        title = 'Looking for a job',
        content = 'Graduated from a bootcamp with languages in Python and Javascript'
    )

    post2 = Post(
        user_id = 2,
        categories = 'Relationships',
        title = 'Looking for a significant other (Male)',
        content = 'Must be atleast 5 foot 6 to be qualified!'
    )

    post3 = Post(
        user_id = 3,
        categories = 'Inquiries',
        title = 'How much is a car repair?',
        content = 'My engine broke and need replacement. I have a 2023 Toyota Prius and would like to know how much it cost.'
    )



    posts = [post1, post2, post3]

    [db.session.add(post) for post in posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
