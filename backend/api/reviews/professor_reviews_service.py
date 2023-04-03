# from api.reviews.message import Message
# import uuid
# import time
# from flask import jsonify, request
# import os
# from dotenv import load_dotenv
# from pymongo import MongoClient


# load_dotenv()

# client_url = os.getenv('CLIENT')

# client = MongoClient(client_url)
# db = client['ProfessorPilot']
# professor_reviews = db['ProfessorReviews']

# def submit_professor_review():
#     # data = request.get_json()
#     # reviewer = data['reviewer']
#     review_id = str(uuid.uuid4())
#     timestamp = str(int(time.time() * 1000))
#     professor_review = {
#         'User': 'Alex',
#         'ProfessorName': 'Henry Chen',
#         'Communication': 4,
#         'Organization': 5,
#         'Availability': 4,
#         'Grading': 5,
#         'Competency': 5,
#         'ReviewText': ' Great professor',
#         'Upvotes': 0,
#         'Status': 'active',
#         'CreateDate': timestamp,
#         'ReviewId': review_id
#     }
#     response = professor_reviews.insert_one(professor_review)
#     return {"Message": "Submit Review Success"}

# def get_recent_professor_reviews():
#     cursor = professor_reviews.find({"User": {"$regex": "^REVIEW#"}}).sort("CreateDate", -1).limit(25)
#     recent_professor_reviews = [{**review, '_id': str(review['_id'])} for review in cursor]
#     return recent_professor_reviews
# # print(get_recent_reviews)