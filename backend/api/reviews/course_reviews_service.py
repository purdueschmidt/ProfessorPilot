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
vote_collection = db['Votes']
comment_collection = db['Comments']



# category_index = course_reviews.create_index("course_code") # create course_code index on collection

#SEARCH

def search_course_reviews(query, sort_by):
    print(query, sort_by)
    search_result = []
    if query:
        reviews = course_reviews.find({'course_code': {'$regex': query, '$options': 'i'}}).sort(sort_by)
        for row in reviews:
            search_result.append(dict(row))
    else:
        reviews = course_reviews.find().sort(sort_by)

    return search_result

def search_professor_reviews(query, sort_by):
    print(query, sort_by)
    search_result = []
    if query:
        reviews = professor_reviews.find({'professor': {'$regex': query, '$options': 'i'}}).sort(sort_by)
        for row in reviews:
            search_result.append(dict(row))
    else:
        reviews = professor_reviews.find().sort(sort_by)

    return search_result

#REVIEWS

#COURSE REVIEWS
def submit_course_review(course_json):
    data = course_json
    reviewer = data['reviewer']
    _id = str(uuid.uuid4())
    timestamp = str(int(time.time()))
    rating = (data['difficulty'] + data['interest'] + data['usefulness'] + data['organization'] + data['workload']) / 5.0

    course_review = {
        '_id': _id,
        'Reviewer': str(reviewer),
        'course_code': data['course_code'],
        'Term': data['term'],
        'Year': data['year'],
        'Rating': rating,
        'Difficulty': data['difficulty'],
        'Interest': data['interest'],
        'Usefulness': data['usefulness'],
        'Organization': data['organization'],
        'Workload': data['workload'],
        'ReviewText': data['review_text'],
        'UpVotes': 0,
        'DownVotes': 0,
        'Comments': [],
        'Status': 'active',
        'CreateDate': timestamp,
        'ModifiedDate': timestamp
    }
    response = course_reviews.insert_one(course_review)
    return {"Submit": "Submit Review Success"}

def vote(_id, action, user, review_type):
    # Check if the user has already voted
    existing_vote = vote_collection.find_one({'Review_id': _id, 'User': user})

    # Update the upvote/downvote counts in the review
    update_query = {}

    if existing_vote:
        if existing_vote["Vote"] == action:
            # User is trying to vote the same way again, do not proceed
            return {"Submit": "User has already voted this way"}

        # User wants to change their vote
        if action == 'upvote':
            update_query = {'$inc': {'UpVotes': 1, 'DownVotes': -1}}
        else:  # action == 'downvote'
            update_query = {'$inc': {'UpVotes': -1, 'DownVotes': 1}}

        # Update the user's vote in the vote collection
        vote_collection.update_one(
            {'_id': existing_vote["_id"]},
            {'$set': {'Vote': action}}
        )
    else:
        # User has not voted yet
        if action == 'upvote':
            update_query = {'$inc': {'UpVotes': 1}}
        elif action == 'downvote':
            update_query = {'$inc': {'DownVotes': 1}}
        else:
            return 0

        # Add the user's vote to the vote collection
        vote = {
            '_id': str(uuid.uuid4()),
            'Review_id': _id,
            'User': user,
            'Vote': action
        }
        response = vote_collection.insert_one(vote)

    # Update the upvote/downvote counts in the review based on review_type
    if review_type == 'course':
        target_collection = course_reviews
    elif review_type == 'professor':
        target_collection = professor_reviews

    result = target_collection.update_one(
        {'_id': _id},
        update_query
    )

    return {"Submit": "Submit Vote Success"}


def comment(_id, comment_text, user, review_type):
    
    comment = {
        '_id': str(uuid.uuid4()),
        'Review_id': _id,
        'Username': user,
        'Comment': comment_text,
        'Timestamp': str(int(time.time()))
    }

    response = comment_collection.insert_one(comment)

    # Update the review with the new comment based on review_type
    if review_type == 'course':
        target_collection = course_reviews
    elif review_type == 'professor':
        target_collection = professor_reviews
    else:
        return {"Error": "Invalid review_type"}

    target_collection.update_one(
        {'_id': _id},
        {'$push': {'Comments': comment}}
    )
    return {"Submit": "Submit Comment Success"}


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


def update_review_upvote_downvote(_id, action):
    update_query = {}

    if action == 'upvote':
        update_query = {'$inc': {'UpVotes': 1}}
    elif action == 'downvote':
        update_query = {'$inc': {'DownVotes': 1}}
    else:
        return 0

    result = course_reviews.update_one(
        {'_id': _id},
        update_query
    )
    return result.modified_count


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
    rating = (data['communication'] + data['organization'] + data['availability'] + data['grading'] + data['competency']) / 5.0


    professor_review = {
        '_id': _id,
        'Reviewer': str(reviewer),
        'Rating': rating,
        'professor': data['professor'],
        'Communication': data['communication'],
        'Organization': data['organization'],
        'Availability': data['availability'],
        'Grading': data['grading'],
        'Competency': data['competency'],
        'ReviewText': data['review_text'],
        'Upvotes': 0,
        'DownVotes': 0,
        'Comments': [],
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