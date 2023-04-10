
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
        'UpVotes': 0,
        'DownVotes': 0,
        'Status' : "active",
        'CreateDate': "1680495280"
    }
    
    
    professor_reviews.insert_one.assert_called_once_with(expected_db_parameter)
    assert expected == actual


def test_get_reviews_by_professor(mocker):
    
    mocker.patch(
        'api.reviews.course_reviews_service.professor_reviews.find',
        return_value = [{
            '_id':"1",
            'Reviewer': 'Paul',
            'professor': 'John Doe',
            'Communication': '5',
            'Organization': '5',
            'Availability': '5',
            'Grading': '5',
            'Competency': '5',
            'ReviewText': 'This is a test',
            'UpVotes': 0,
            'DownVotes': 0,
            'Status' : "active",
            'CreateDate': "1680495280"
        }
    ]
    )

    argument_1 = get_reviews_by_professor('John Doe')

    expected_outcome_1 = [{
            '_id':"1",
            'Reviewer': 'Paul',
            'professor': 'John Doe',
            'Communication': '5',
            'Organization': '5',
            'Availability': '5',
            'Grading': '5',
            'Competency': '5',
            'ReviewText': 'This is a test',
            'UpVotes': 0,
            'DownVotes': 0,
            'Status' : "active",
            'CreateDate': "1680495280"
        }
    ]

    professor_reviews.find.assert_called_once_with({'professor': 'John Doe'})

    assert expected_outcome_1 ==  argument_1


# test case with empty or incorrect input
    mocker.patch(
        'api.reviews.course_reviews_service.professor_reviews.find',
        return_value = []
    )

    argument_2 =  get_reviews_by_professor('')
    expected_outcome_2 = []

    professor_reviews.find.assert_called_once_with({'professor': ''})

    assert expected_outcome_2 ==  argument_2

