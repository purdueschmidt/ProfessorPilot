from api.reviews.message import Message
import uuid
import time
from flask import jsonify, request
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import Decimal128

load_dotenv()

client_url = os.getenv('CLIENT')

client = MongoClient(client_url)
db = client['ProfessorPilot']
course_reviews = db['CourseReviews']
# course_form =db['CourseForm']
courses_collection = db['Courses']
profs_collection = db['Professors']
professor_reviews = db['ProfessorReviews']


# category_index = course_reviews.create_index("course_code") # create course_code index on collection


def submit_course_review(course_json):
    data = course_json
    reviewer = data['reviewer']
    _id = str(uuid.uuid4())
    timestamp = str(int(time.time()))

    course_review = {
        '_id': _id,
        'Reviewer': str(reviewer),
        'course_code': data['course_code'],
        'Term': data['term'],
        'Year': data['year'],
        'Difficulty': data['difficulty'],
        'Interest': data['interest'],
        'Usefulness': data['usefulness'],
        'Organization': data['organization'],
        'Workload': data['workload'],
        'ReviewText': data['review_text'],
        'Upvotes': 0,
        'Status': 'active',
        'CreateDate': timestamp,
        'ModifiedDate': timestamp
    }
    response = course_reviews.insert_one(course_review)
    return {"Message": "Submit Review Success"}


def get_recent_course_reviews():
    cursor = course_reviews.find(
        {"Status": "active"},
        sort=[("CreateDate", -1)],
        limit=25
    )
    recent_entries = [entry for entry in cursor]
    return recent_entries


def get_reviews_by_course_code(course_code):
    " Fetches course reviews for a specific course from the db collection"
    print(course_code)
    cursor = course_reviews.find(
        {"course_code": course_code}
    )
    return [entry for entry in cursor]


# COURSES


def get_all_courses():
    cursor = courses_collection.find({})
    all_courses = [{**course, '_id': str(course['_id'])} for course in cursor]

    if all_courses is None:
        print("null")
    else:
        print("not null")

    return all_courses


# PROFESSORS

def get_all_professors():
    cursor = profs_collection.find({})
    all_profs = [{**professor, '_id': str(professor['_id'])} for professor in cursor]

    if all_profs is None:
        print("null")
    else:
        print("not null")

    print(all_profs)
    return all_profs


# PROFESSOR REVIEWS

def submit_professor_review(professor_json):

    # data = request.get_json()

    data = professor_json
    reviewer = data['reviewer']
    _id = str(uuid.uuid4())
    timestamp = str(int(time.time()))
    professor_review = {
        '_id': _id,
        'Reviewer': str(reviewer),
        'professor': data['professor'],
        'Communication': data['communication'],
        'Organization': data['organization'],
        'Availability': data['availability'],
        'Grading': data['grading'],
        'Competency': data['competency'],
        'ReviewText': data['review_text'],
        'Upvotes': 0,
        'Status': 'active',
        'CreateDate': timestamp,
    }
    response = professor_reviews.insert_one(professor_review)
    return {"Message": "Submit Review Success"}


def get_recent_professor_reviews():
    cursor = professor_reviews.find(
        {"Status": "active"},
        sort=[("CreateDate", -1)],
        limit=25
    )
    recent_entries = [entry for entry in cursor]
    return recent_entries


def get_reviews_by_professor(professor):
    " Fetches professor reviews for a specific professor from the db collection"
    print(professor)
    cursor = professor_reviews.find(
        {"professor": professor}
    )
    print(entry for entry in cursor)
    return [entry for entry in cursor]


def get_public_message():
    return Message(
        "This is a public message."
    )


def get_protected_message():
    return Message(
        "This is a protected message."
    )


def get_admin_message():
    return Message(
        "This is an admin message."
    )