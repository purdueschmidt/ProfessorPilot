from api.reviews.message import Message
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
professor_reviews_collection = db['ProfessorReviews']

category_index = professor_reviews_collection.create_index("ProfessorName") # create CourseCode index on collection


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

# def submit_professor_review():
#     data = request.get_json()
#     reviewer = data['reviewer']
#     review_id = str(uuid.uuid4())
#     timestamp = str(int(time.time() * 1000))
#
#     professor_review = {
#         'Reviewer': str(reviewer),
#         'Communication': data['communication'],
#         'Organization': data['organization'],
#         'Availability': data['availability'],
#         'Grading': data['grading'],
#         'Competency': data['competency'],
#         'ReviewText': data['review_text'],
#         'Upvotes': 0,
#         'Status': 'active',
#         'CreateDate': timestamp,
#         'ModifiedDate': timestamp,
#         'ReviewId': review_id
#
#     }
#     response = professor_reviews_collection.insert_one(professor_review)
#     return {"Message": "Submit Review Success"}

def get_recent_professor_reviews():
    cursor = professor_reviews_collection.find({"ReviewId": {"$regex": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"}}).sort("CreateDate", -1).limit(25)
    recent_professor_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]

    return recent_professor_reviews

def get_all_professor_reviews():
    " Fetches all professor reviews from the db collection"
    cursor = professor_reviews_collection.find({"ReviewId": {"$regex": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"}}).sort("CreateDate", -1)
    all_professor_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]

    
    return all_professor_reviews

def get_professor_reviews(professor_name):
    " Fetches reviews for a specific professor from the db collection"

    cursor = professor_reviews_collection.find({"ProfessorName" : professor_name}).sort("CreateDate", -1)
    specific_professor_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]

    return  specific_professor_reviews

