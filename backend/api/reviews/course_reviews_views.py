import flask
from flask import (
    Blueprint, request, jsonify
)

from flask_cors import CORS

from .course_reviews_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
    submit_course_review,
    get_recent_course_reviews
)
from ..security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions
)

bp_name = 'api-reviews'
bp_url_prefix = '/api/reviews'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)

@bp.route('/', methods=(['GET', 'POST']))
@bp.route('/home', methods=(['GET', 'POST', 'OPTONS']))
@bp.route('/submit_course_review', methods=['GET', 'POST', 'OPTIONS'])
@bp.route('/recent_course_reviews', methods=['GET', 'OPTIONS'])
#@authorization_guard
def home():
    if request.method == 'GET':
        recent_course_reviews = get_recent_course_reviews()
        response = jsonify(recent_course_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response, 200
    if request.method == 'OPTIONS':
        response = flask.Response(status=200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response
    if request.method == 'POST':
        val = submit_course_review()
        return jsonify(val), 200




@bp.route("/public")
def public():
    return vars(get_public_message())


@bp.route("/protected")
@authorization_guard
def protected():
    return vars(get_protected_message())


@bp.route("/admin")
@authorization_guard
@permissions_guard([admin_messages_permissions.read])
def admin():
    return vars(get_admin_message())