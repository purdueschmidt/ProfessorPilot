from api.reviews.course_reviews_service import submit_course_review, course_reviews


def test_submit_course_review(mocker):
    mocker.patch(
        'api.reviews.course_reviews_service.course_reviews.insert_one',
        return_value=True
    )

    mocker.patch(
        'api.reviews.course_reviews_service.uuid.uuid4',
        return_value="1"
    )

    mocker.patch(
        'api.reviews.course_reviews_service.time.time',
        return_value="1680495280"
    )

    json_from_create = {'reviewer': 'JOE',
                        'difficulty': '4',
                        'interest': '4',
                        'usefulness': '4',
                        'organization': '4',
                        'workload': '4',
                        'review_text': 'This is text',
                        'term': 'spring',
                        'year': '2000'}

    expected = {"Message": "Submit Review Success"}
    actual = submit_course_review(json_from_create)

    expected_db_parameter = {
        'Reviewer': "JOE",
        'Difficulty': "4",
        'Interest': "4",
        'Usefulness': "4",
        'Organization': "4",
        'Workload': "4",
        'ReviewText': "This is text",
        'Term': "spring",
        'Year': "2000",
        'Upvotes': 0,
        'Status': 'active',
        'CreateDate': "1680495280",
        'ModifiedDate': "1680495280",
        'ReviewId': "1"
    }

    course_reviews.insert_one.assert_called_once_with(expected_db_parameter)
    assert expected == actual

