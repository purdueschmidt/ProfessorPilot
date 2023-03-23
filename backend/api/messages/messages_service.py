from api.messages.message import Message
from api.messages.message import CourseReview


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

    course_review = CourseReview()
    course_review.create_review(
    reviewer=data['reviewer'],
    coursename=data['course_name'],
    criteria=[data['difficulty'], data['interest'], data['usefulness'], data['organization'], data['workload'], data['rating']],
    code=data['course_code'],
    text=data['review_text'],
    term=data['term'],
    year=data['year']
)
    
    return jsonify({'message': 'Review submitted successfully'}), 201