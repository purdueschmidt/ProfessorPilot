import flask

from flask import (
    Blueprint, request, jsonify
)

from .courses_services import (
    get_all_courses,

    # get_course_reviews
)

bp_name = 'api-courses'
bp_url_prefix = '/api/courses'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)

@bp.route('/coursesPage', methods=(['GET', 'OPTIONS']))
@bp.route('/courses', methods=(['GET', 'OPTIONS']))
def get_courses():
    if request.method == 'GET':
        courses = get_all_courses()
        response = jsonify(courses)
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


@bp.route('/courses/<course_id>/reviews', methods=(['GET', 'OPTIONS']))
def get_course_reviews(course_id):
  if request.method == 'GET':
    reviews = get_course_reviews(course_id)
    response = jsonify(reviews)
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


# @bp.route("/api/courses", methods=["GET"])
# def get_courses():
#     if request.method=='GET':
#         courses = get_courses_from_db()
#         response = jsonify(courses)
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#         response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#         return response, 200