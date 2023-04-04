from api.reviews.message import Message

import uuid
import time
from flask import jsonify, request, Response
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
#category_index = course_reviews.create_index("course_code") # create course_code index on collection


def submit_course_review(course_json):
    data = course_json

    reviewer = data['reviewer']
    review_id = str(uuid.uuid4())
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
    course_code = course_code.replace(" ", "%20")

    cursor = course_reviews.find(
        {"status": "active", "course_code": course_code},
        sort=[("CreateDate", -1)],
        limit=25
    )
    specific_course_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]
    return specific_course_reviews

#COURSES

courses_collection = db['Courses']
def get_all_courses():
    cursor = courses_collection.find({})
    all_courses = [{**course, '_id': str(course['_id'])} for course in cursor]

    if all_courses is None:
        print("null")
    else:
        print("not null")

    
    return all_courses

category_index = course_reviews.create_index("CourseName") # create CourseCode index on collection

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

def get_recent_course_reviews():
    cursor = course_reviews.find({"Status": "active"}).sort(("CreateDate", -1)).limit=25
    
    recent_entries = [entry for entry in cursor]
    return recent_entries



def get_course_reviews(course_code:str):
    " Fetches course reviews for a specific course from the db collection"

    cursor = course_reviews.find({"CourseName" : course_code}).sort("CreateDate", -1)
    specific_course_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]

    return  specific_course_reviews

