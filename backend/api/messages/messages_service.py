from api.messages.message import Message
from api.messages.message import CourseReview
from api import config
import uuid
import boto3
import time
from flask import jsonify, request
import os
from dotenv import load_dotenv

load_dotenv()

aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
region_name = os.getenv('AWS_REGION_NAME')

dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)
table = dynamodb.Table('CourseReviews')

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


def submit_review():
    data = request.get_json()
    #print(data)

    reviewer = data['reviewer']
    # review_id = str(uuid.uuid4())
    # timestamp = str(int(time.time() * 1000))
    #
    # course_review = {
    #     'PK': f'REVIEW#{review_id}',
    #     'SK': f'USER#{reviewer}',
    #     'GSI1PK': f'USER#{reviewer}',
    #     'CourseCode': data['course_code'],
    #     'CourseName': data['course_name'],
    #     'Difficulty': data['difficulty'],
    #     'Interest': data['interest'],
    #     'Usefulness': data['usefulness'],
    #     'Organization': data['organization'],
    #     'Workload': data['workload'],
    #     'Rating': data['rating'],
    #     'ReviewText': data['review_text'],
    #     'Term': data['term'],
    #     'Year': data['year'],
    #     'Upvotes': 0,
    #     'Status': 'active',
    #     'CreateDate': timestamp,
    #     'ModifiedDate': timestamp,
    #     'ReviewId': review_id
    # }

    #response = table.put_item(Item=course_review)
    return {"Message":"Submit Review Success"}