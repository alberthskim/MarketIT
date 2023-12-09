from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
from random import randint

def random_date(start, end):
    """Generate a random datetime between `start` and `end` which
    should be datetime objects"""
    random_date = start + timedelta(
        # Get a random amount of seconds between `start` and `end`
        seconds = randint(0, int((end - start).total_seconds())),
    )
    return random_date

def seed_posts():
    post1 = Post(
        user_id = 4,
        image = 'https://i.imgur.com/Jf1kHoC.png',
        categories = 'Jobs',
        title = 'Looking for a job',
        content = 'Recently Graduated from a bootcamp with languages in Python and Javascript, willing to work anyone in Los Angeles. Message me to connect!',
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post2 = Post(
        user_id = 2,
        image = 'https://i.imgur.com/4zr895e.jpg',
        categories = 'Relationships',
        title = 'Looking for a significant other (Male)',
        content = 'You can be the man on the left. Must be atleast 5 foot 6 to be qualified! Looking for someone caring who is willing to take me shopping. Looking for a cuddle buddy and netflix and chiller.',
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post3 = Post(
        user_id = 3,
        image = 'https://i.imgur.com/jQMeYl5.png',
        categories = 'Inquiries',
        title = 'How much is a car repair?',
        content = 'My engine broke and need replacement. I have a 2023 Toyota Prius and would like to know how much it cost. Someone also stole my catalytic converter and I need to know how much it will cost to replace.',
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post4 = Post(
        user_id = 3,
        image = 'https://i.imgur.com/UgfwfdA.png',
        categories = 'For Sale',
        title = "Selling my girlfriend's PS5",
        content = 'My girlfriend has been playing too much fortnite and I need to make her stop. Selling secretly and using the money to buy a catalytic converter. Please let me know if you or anyone is interested.',
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post5 = Post(
        user_id = 2,
        image = 'https://i.imgur.com/3yPS49f.jpg',
        categories = 'Random',
        title = 'Anyone have any good pick up lines?',
        content = 'Working on expanding my skills in saying the right pick-up line. Anything advice or pickup lines would be greatly appreciated.',
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post6 = Post(
        user_id = 1,
        image = 'https://i.imgur.com/H8Uoa0G.jpg',
        categories = 'Relationships',
        title = 'Looking for a 5-Stack in Valorant',
        content = 'Need a solid 5th player for valorant for premiers. Must be Diamond or higher! Message me for tryouts.',
        location = "Anywhere",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post7 = Post(
        user_id = 1,
        image = 'https://i.imgur.com/VLX7DsX.jpg',
        categories = 'Inquiries',
        title = 'Need a new macbook for coding',
        content = "My 2013 macbook can't process VScode fast enough. Would love to see if I can buy a used one of someone. Looking to offer $500 or less. I'm broke...",
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post8 = Post(
        user_id = 2,
        image = 'https://i.imgur.com/ynx22BL.jpg',
        categories = 'For Sale',
        title = 'Selling TV to purchase a bigger one.',
        content = "Selling a Samsung 42-inch TV. Need to get a bigger one for future netflix and chill boyfriend :)",
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    post9 = Post(
        user_id = 3,
        image = 'https://i.imgur.com/ngF4NAx.png',
        categories = 'Jobs',
        title = 'Looking to hire a new-tech grad',
        content = "My company, MarketIt is looking to hire someone who is a recent grad. Looking for someone with skills in Python, React, Redux, JavaScript, HTML, CSS and more!",
        location = "Los Angeles, CA",
        created_at = random_date(datetime(2023, 1, 1), datetime(2023, 10, 10))
    )

    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9]

    [db.session.add(post) for post in posts]
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
