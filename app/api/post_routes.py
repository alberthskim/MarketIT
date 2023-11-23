from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


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
@post_routes.route("/new", methods=['POST'])
@login_required
def create_post():
    """
    Create a post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return "<h1>URL does not exist</h1>"

        post = Post(
            user_id = current_user.id,
            image = upload["url"],
            categories = form.data['categories'],
            title = form.data['title'],
            content = form.data['content'],
            location = form.data['location']
        )

        db.session.add(post)
        db.session.commit()
        post_dict = post.to_dict()
        return post_dict

    if form.errors:
        return form.errors

    return




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

    file_delete = remove_file_from_s3(post.image)

    if file_delete:
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Post Has Been Successfully Deleted!'}

    else:
        return "<h1>File Delete Error!</h1>"
