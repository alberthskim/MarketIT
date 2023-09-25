from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


## WORKING!!!
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
@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    """
    Create a post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id = current_user.id,
            images = form.data['images'],
            categories = form.data['categories'],
            title = form.data['title'],
            content = form.data['content']
        )

        db.session.add(post)
        db.session.commit()

        post_dict = post.to_dict()
        return post_dict



## Update a Post
@post_routes.route('/<int:postId>', methods=['PUT'])
@login_required
def update_post(postId):
    """
    Update a post
    """
    post = Post.query.get(postId)

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.categories = form.data['categories'],
        post.title = form.data['title'],
        post.content = form.data['content']

        db.session.commit()
        return post.to_dict()


## Delete a Post
@post_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def delete_post(postId):
    """
    Delete a post
    """

    post = Post.query.get(postId)

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post Has Been Successfully Deleted!'}
