
from  api.reviews.service import submit_professor_review, professor_reviews, get_reviews_by_professor, get_recent_professor_reviews, get_all_professors, profs_collection


def test_submit_professor_review(mocker):
    
    mocker.patch(
        'api.reviews.service.professor_reviews.insert_one',
        return_value = True
    )

    mocker.patch(
        'api.reviews.service.uuid.uuid4',
        return_value = "1"
    )

    mocker.patch(
        'api.reviews.service.time.time',
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
        '_id': "1",
        'Reviewer': 'Paul',
        'professor': 'John Doe',
        'Communication': '5',
        'Organization': '5',
        'Availability': '5',
        'Grading': '5',
        'Competency': '5',
        'ReviewText': 'This is a test',
        'Upvotes': 0,
        'DownVotes': 0,
        'Comments': [],
        'Status': "active",
        'CreateDate': "1680495280"
    }

    professor_reviews.insert_one.assert_called_once_with(expected_db_parameter)
    assert expected == actual


def test_get_reviews_by_professor(mocker):
    
    mocker.patch(
        'api.reviews.service.professor_reviews.find',
        return_value = [{'_id':"1",'Reviewer': 'Paul','professor': 'John Doe','Communication': '5',
            'Organization': '5','Availability': '5','Grading': '5', 'Competency': '5',
            'ReviewText': 'This is a test', 'UpVotes': 0, 'DownVotes': 0, 'Status' : "active",
            'CreateDate': "1680495280"
        }
    ]
    )

    assert   get_reviews_by_professor('John Doe') ==  [
        {'_id':"1",'Reviewer': 'Paul','professor': 'John Doe','Communication': '5',
            'Organization': '5','Availability': '5','Grading': '5', 'Competency': '5',
            'ReviewText': 'This is a test', 'UpVotes': 0, 'DownVotes': 0, 'Status' : "active",
            'CreateDate': "1680495280"
        }
        
    ]

    professor_reviews.find.assert_called_once_with({'professor': 'John Doe'})


# test case with empty or incorrect input
    mocker.patch(
        'api.reviews.service.professor_reviews.find',
        return_value = []
    )

    assert get_reviews_by_professor('') ==  []

    professor_reviews.find.assert_called_once_with({'professor': ''})



def test_get_recent_profesor_reviews(mocker):

    mocker.patch(
        'api.reviews.service.professor_reviews.find',
        return_value = [{'_id':"1",'Reviewer': 'Paul','professor': 'John Doe','Communication': '5',
            'Organization': '5', 'Availability': '5','Grading': '5','Competency': '5', 
            'ReviewText': 'This is a test','UpVotes': 0, 'DownVotes': 0,"Status" : "active",
            "CreateDate": "1680495290" },
        {'_id':"2", 'Reviewer': 'John','professor': 'Jane Doe','Communication': '5',
            'Organization': '3','Availability': '4','Grading': '2','Competency': '5',
            'ReviewText': 'This is a test','UpVotes': 0,'DownVotes': 0,"Status" : "active",
            "CreateDate": "1680495280"
        }
    ]
    )
    
    assert get_recent_professor_reviews() == [
        {'_id':"1",'Reviewer': 'Paul','professor': 'John Doe','Communication': '5',
            'Organization': '5', 'Availability': '5','Grading': '5','Competency': '5', 
            'ReviewText': 'This is a test','UpVotes': 0, 'DownVotes': 0,"Status" : "active",
            "CreateDate": "1680495290" },
        {'_id':"2", 'Reviewer': 'John','professor': 'Jane Doe','Communication': '5',
            'Organization': '3','Availability': '4','Grading': '2','Competency': '5',
            'ReviewText': 'This is a test','UpVotes': 0,'DownVotes': 0,"Status" : "active",
            "CreateDate": "1680495280"
        }
    ]


    professor_reviews.find.assert_called_once_with(
        {"Status": "active"},
        sort=[("CreateDate", -1)],
        limit=25
    )
     


def test_get_all_professors(mocker):

    mocker.patch(
        'api.reviews.service.profs_collection.find',
        return_value = [{'_id': '1', 'professor': 'John Doe'}, 
                        {'_id': '2', 'professor': 'Jane Doe'}, 
                        {'_id': '3','professor': 'Franck Alex'}, 
                        {'_id': '4', 'professor': 'Paul John'}
                        ] )
    
    assert get_all_professors() == [{'_id': '1', 'professor': 'John Doe'}, 
                        {'_id': '2', 'professor': 'Jane Doe'}, 
                        {'_id': '3','professor': 'Franck Alex'}, 
                        {'_id': '4', 'professor': 'Paul John'}
                        ]
                        
    profs_collection.find.assert_called_once_with({})
