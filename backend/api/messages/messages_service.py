from api.messages.message import Message
from api.messages.message import CourseReview
from api import config
import uuid
import boto3
import time
from flask import jsonify, request

# dynamodb = boto3.resource('dynamodb', aws_access_key_id   = 'AKIAWQOUMGGDI7G4YO3F',
#         aws_secret_access_key = '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',
#         region_name = 'us-east-2')
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


def submit_review(data):
    data = request.get_json()

    reviewer = data['reviewer']
    review_id = str(uuid.uuid4())
    timestamp = str(int(time.time() * 1000))

    course_review = {
        'PK': f'REVIEW#{review_id}',
        'SK': f'USER#{reviewer}',
        'GSI1PK': f'USER#{reviewer}',
        'CourseCode': data['course_code'],
        'CourseName': data['course_name'],
        'Difficulty': data['difficulty'],
        'Interest': data['interest'],
        'Usefulness': data['usefulness'],
        'Organization': data['organization'],
        'Workload': data['workload'],
        'Rating': data['rating'],
        'ReviewText': data['review_text'],
        'Term': data['term'],
        'Year': data['year'],
        'Upvotes': 0,
        'Status': 'active',
        'CreateDate': timestamp,
        'ModifiedDate': timestamp,
        'ReviewId': review_id
    }

    response = table.put_item(Item=course_review)
    return jsonify({'message': 'Review submitted successfully'}), 201