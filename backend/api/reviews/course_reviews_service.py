from api.reviews.message import Message
from api import config
import uuid
import time
from flask import jsonify, request
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client_url = os.getenv('CLIENT')


client = MongoClient(client_url)
db = client['ProfessorPilot']
course_reviews = db['CourseReviews']


def submit_course_review():
    data = request.get_json()
    reviewer = data['reviewer']
    review_id = str(uuid.uuid4())
    timestamp = str(int(time.time() * 1000))

    course_review = {
        'Reviewer': str(reviewer),
        'Difficulty': data['difficulty'],
        'Interest': data['interest'],
        'Usefulness': data['usefulness'],
        'Organization': data['organization'],
        'Workload': data['workload'],
        'ReviewText': data['review_text'],
        'Term': data['term'],
        'Year': data['year'],
        'Upvotes': 0,
        'Status': 'active',
        'CreateDate': timestamp,
        'ModifiedDate': timestamp,
        'ReviewId': review_id
    }

    response = course_reviews.insert_one(course_review)
    return {"Message": "Submit Review Success"}


def get_recent_course_reviews():
    cursor = course_reviews.find({"ReviewId": {"$regex": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"}}).sort("CreateDate", -1).limit(25)
    recent_course_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]
    if recent_course_reviews is None:
        print("null")
    else:
        print("not null")
    print('recent course reviews:', recent_course_reviews)
    return recent_course_reviews



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