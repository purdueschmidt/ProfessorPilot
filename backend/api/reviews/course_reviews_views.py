import flask
from flask import (
    Flask, Blueprint, request, jsonify
)

from .course_reviews_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
    submit_course_review,
    get_recent_course_reviews,
    get_all_courses,
    get_reviews_by_course_code,
    get_all_professors,
    submit_professor_review,
    get_recent_professor_reviews,
    get_reviews_by_professor
)
from ..security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions
)

bp_name = 'api-reviews'
bp_url_prefix = '/api/reviews'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


# COURSE-REVIEWS----------------------------------------------------------------------------------------

@bp.route('/', methods=(['GET', 'POST']))
@bp.route('/home', methods=(['GET', 'POST', 'OPTONS']))
@bp.route('/submit_course_review', methods=['GET', 'POST', 'OPTIONS'])
# @authorization_guard
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
        val = submit_course_review(request.get_json())
        return jsonify(val), 200


@bp.route("/recent_course_reviews", methods=["GET", "OPTIONS"])
def recent_course_entries():
    if request.method == 'GET':
        recent_course_reviews = get_recent_course_reviews()
        for entry in recent_course_reviews:
            entry["_id"] = str(entry["_id"])
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


@bp.route('/coursesPage/<course_code>', methods=['GET', 'OPTIONS'])
def get_course_reviews(course_code):
    "Gets reviews for a specific course"
    if request.method == 'OPTIONS':
        response = flask.Response(status=200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response
    if request.method == 'GET':
        course_reviews = get_reviews_by_course_code(course_code)
        for entry in course_reviews:
            entry["_id"] = str(entry["_id"])
        response = jsonify(course_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'

        return response, 200


# COURSES------------------------------------------------------------------------------------------------

@bp.route('/courses', methods=(['GET', 'OPTIONS']))
@bp.route('/coursesPage', methods=(['GET', 'OPTIONS']))
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


# PROFESSOR-REVIEWS--------------------------------------------------------------------------

@bp.route('/submit_professor_review', methods=['GET', 'POST', 'OPTIONS'])
# @authorization_guard
def submit_prof_review():
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
        return response
    if request.method == 'POST':
        val = submit_professor_review()
        return jsonify(val), 200


@bp.route("/recent_professor_reviews", methods=["GET", "OPTIONS"])
def recent_professor_entries():
    if request.method == 'GET':
        recent_professor_reviews = get_recent_professor_reviews()
        for entry in recent_professor_reviews:
            entry["_id"] = str(entry["_id"])
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
        return response


@bp.route('/professorsPage/<professor>', methods=['GET', 'OPTIONS'])
def get_professor_reviews(professor):
    "Gets reviews for a specific professor"
    if request.method == 'OPTIONS':
        response = flask.Response(status=200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response
    if request.method == 'GET':
        professor_reviews = get_reviews_by_professor(professor)
        for entry in professor_reviews:
            entry["_id"] = str(entry["_id"])
        response = jsonify(professor_reviews)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'

        return response, 200


# PROFESSORS--------------------------------------------------------------------------------------


@bp.route('/professors', methods=(['GET', 'OPTIONS']))
@bp.route('/professorsPage', methods=(['GET', 'OPTIONS']))
def get_professors():
    if request.method == 'GET':
        professors = get_all_professors()
        response = jsonify(professors)
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


# DEFAULT-PUBLIC-------------------------------------------------------------------------------------

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

# @bp.route("/courses", methods=["GET"])
# def get_courses():
#     if request.method=='GET':
#         courses = get_all_courses()
#         response = jsonify(courses)
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4040'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#         response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#         return response, 200