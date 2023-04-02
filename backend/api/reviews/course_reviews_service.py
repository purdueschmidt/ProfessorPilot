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
course_form =db['CourseForm']

def get_form_questions():
    cursor = course_form.find()
    questions = [entry for entry in cursor]
    return questions

def submit_course_review():
    data = request.get_json()
    reviewer = data['reviewer']
    _id = str(uuid.uuid4())
    timestamp = str(int(time.time() * 1000))

    course_review = {
        '_id': _id,
        'Reviewer': str(reviewer),
        'courseCode': data['courseCode'],
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
    cursor = course_reviews.find(
        {"Status": "active", "CourseCode": course_code},
        sort=[("CreateDate", -1)]
    )
    matching_reviews = [entry for entry in cursor]
    return matching_reviews

courses_collection = db['Courses']

def get_all_courses():
    cursor = courses_collection.find({})
    all_courses = [{**course, '_id': str(course['_id'])} for course in cursor]

    if all_courses is None:
        print("null")
    else:
        print("not null")

    print('All courses:', all_courses)
    return all_courses
    

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