from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

## Get all Posts
@post_routes.route('/')
def all_posts():
    """
    Query for all posts with reviews
    """
    