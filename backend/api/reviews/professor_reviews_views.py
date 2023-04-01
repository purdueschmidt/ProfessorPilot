import json

import flask
from flask import (
    Blueprint, request, jsonify, app
)

from .professor_reviews_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
    submit_professor_review,
    get_recent_professor_reviews,
    get_all_professor_reviews,
    get_professor_reviews

)
from ..security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions
)

bp_name = 'api-reviews'
bp_url_prefix = '/api/reviews'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/public")
def public():
    return vars(get_public_message())

@bp.route('/home', methods=(['GET', 'POST', 'OPTONS']))
@bp.route('/recent_professor_reviews', methods=['GET', 'OPTIONS'])
def Home():
    if request.method == 'GET':
        recent_professor_reviews = get_recent_professor_reviews
        response = jsonify(recent_professor_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response, 200
    if request.method == 'OPTIONS':
        response = flask.Response(status=200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'


@bp.route('/submit_professor_review', methods=['GET', 'POST', 'OPTIONS'])
def submit_professor_review():
    if request.method == 'POST':
        val = submit_professor_review
        return jsonify(val), 200


@bp.route('/all_professors_reviews', methods=['GET', 'OPTIONS'])
def get_all_professor_reviews():  
    "Gets all professor reviews"

    if request.method == 'GET':
        professor_reviews = get_all_professor_reviews
        response = jsonify(professor_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'

        return response, 200
    
@bp.route('/professors/<professor_name>/professors_reviews', methods=['GET', 'OPTIONS'])
def get_professor_reviews(professor_name:str):  
    "Gets reviews for a specific professor"

    if request.method == 'GET':
        professor_reviews = get_professor_reviews(professor_name)
        response = jsonify(professor_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'

        return response, 200
       

