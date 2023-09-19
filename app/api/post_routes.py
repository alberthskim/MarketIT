from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

## Get all Posts
@post_routes.route('/')
# @login_required
def all_posts():
    """
    Query for all posts
    """
    posts = Post.query.all()
    posts_list = [post.to_dict() for post in posts]
    return posts_list

## Get all Users Posts
@post_routes.route('/<int:userId>')
@login_required
def user_posts(userId):
    """
    Query for all user posts
    """

    user_posts = Post.query.filter(Post.user_id == userId)
    user_posts_list = [user_post.to_dict() for user_post in user_posts]
    return user_posts_list


## Create A Post





## Update a Post





## Delete a Post
