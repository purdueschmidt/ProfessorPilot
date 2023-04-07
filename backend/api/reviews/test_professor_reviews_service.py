
from  api.reviews.course_reviews_service import submit_professor_review, professor_reviews, get_reviews_by_professor


def test_submit_professor_review(mocker):
    
    mocker.patch(
        'api.reviews.course_reviews_service.professor_reviews.insert_one',
        return_value = True
    )

    mocker.patch(
        'api.reviews.course_reviews_service.uuid.uuid4',
        return_value = "1"
    )

    mocker.patch(
        'api.reviews.course_reviews_service.time.time',
        return_value = "1680495280"
    )

    json_from_create = {
        'reviewer': 'Paul',
        'professor': 'John Doe',
        'communication': '5',
        'organization': '5',
        'availability': '5',
        'grading': '5',
        'competency': '5',
        'review_text': 'This is a test'
    }

    expected = {"Message": "Submit Review Success"}
    actual = submit_professor_review(json_from_create)

    expected_db_parameter = {
        '_id':"1",
        'Reviewer': 'Paul',
        'professor': 'John Doe',
        'Communication': '5',
        'Organization': '5',
        'Availability': '5',
        'Grading': '5',
        'Competency': '5',
        'ReviewText': 'This is a test',
        'Upvotes': 0,
        'Status' : "active",
        'CreateDate': "1680495280"
    }
    
    
    professor_reviews.insert_one.assert_called_once_with(expected_db_parameter)
    assert expected == actual


def test_get_reviews_by_professor():

    professor_name = "John Doe"

    existing_parameters_in_db = [{
        '_id':"1",
        'Reviewer': 'Paul',
        'Communication': '5',
        'Organization': '5',
        'Availability': '5',
        'Grading': '5',
        'Competency': '4',
        'ReviewText': 'This is a test',
        'Upvotes': 0,
        'Status' : "active",
        'CreateDate': "1680495280",
        'professor': 'John Doe',

    },
    {
        '_id':"2",
        'Reviewer': 'Franck',
        'Communication': '5',
        'Organization': '5',
        'Availability': '5',
        'Grading': '5',
        'Competency': '4',
        'ReviewText': 'This is a test',
        'Upvotes': 0,
        'Status' : "active",
        'CreateDate': "1680495270",
        'professor': 'John Doe',

    }
    ]
        
    
    professor_reviews.insert_many.assert_called_once_with(existing_parameters_in_db)

    actual = get_reviews_by_professor(professor_name)

    assert actual == existing_parameters_in_db
