
# <<<<<<< HEAD:backend/api/reviews/test_professor_reviews_service.py
from  backend.reviews.service import submit_professor_review, professor_reviews, get_reviews_by_professor, get_recent_professor_reviews, get_all_professors, profs_collection, search_professor_reviews, update_professor_averages
# =======
# from backend.reviews.service import submit_professor_review, professor_reviews, get_reviews_by_professor, get_recent_professor_reviews, get_all_professors, profs_collection
# >>>>>>> 829e8a0f6d0a65e8ae16c92dfddae020f240cb67:backend/reviews/test_professor_reviews_service.py


def test_submit_professor_review(mocker):
    
    mocker.patch(
        'backend.reviews.service.professor_reviews.insert_one',
        return_value = True
    )

    mocker.patch(
        'backend.reviews.service.uuid.uuid4',
        return_value = "1"
    )

    mocker.patch(
        'backend.reviews.service.time.time',
        return_value = "1680495280"
    )

    mocker.patch(
        'backend.reviews.service.update_professor_averages',
        return_value=True
    )

    json_from_create = {
        'reviewer': 'Paul',
        'professor': 'John Doe',
        'communication': 1,
        'organization': 2,
        'availability': 3,
        'grading': 4,
        'competency': 5,
        'review_text': 'This is a test'
    }

    expected = {"Message": "Submit Review Success"}
    actual = submit_professor_review(json_from_create)

    expected_db_parameter = {
        '_id': "1",
        'Reviewer': 'Paul',
        'Rating': 3,
        'professor': 'John Doe',
        'Communication': 1,
        'Organization': 2,
        'Availability': 3,
        'Grading': 4,
        'Competency': 5,
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
        'backend.reviews.service.professor_reviews.find',
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
        'backend.reviews.service.professor_reviews.find',
        return_value = []
    )

    assert get_reviews_by_professor('') ==  []

    professor_reviews.find.assert_called_once_with({'professor': ''})



def test_get_recent_profesor_reviews(mocker):

    mocker.patch(
        'backend.reviews.service.professor_reviews.find',
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
        'backend.reviews.service.profs_collection.find',
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

def test_search_professor_reviews(mocker):

    mocker.patch(
        'backend.reviews.service.professor_reviews.find',
        return_value = ( [ {"Availability":4,"Comments":["Not great prof !"],"Communication":2,"Competency":3,"CreateDate":"1681777011","DownVotes":1,"Grading":1,"Organization":5,"Rating":3,"ReviewText":"1111111111111111111","Reviewer":"johndoe",
                        "Status":"active","UpVotes":0,"Upvotes":0,"_id":"d756445e-db2b-450e-a099-56bfb40387b8","professor":"Jane Doe"},
                    {"Availability":4,"Comments":["Great prof !"],"Communication":5,"Competency":5,"CreateDate":"1681777223","DownVotes":1,"Grading":4,"Organization":5,"Rating":4.5,"ReviewText":"1111111111111111111","Reviewer":"jackfranck",
                        "Status":"active","UpVotes":0,"Upvotes":0,"_id":"d756445e-db2b-450e-a099-56bfb40387b8","professor":" Jane Doe"}
                                                        ])
    )

    query = 'Jane Doe'
    sort_by = "Year"


    assert search_professor_reviews(query, sort_by) == [ {"Availability":4,"Comments":["Not great prof !"],"Communication":2,"Competency":3,"CreateDate":"1681777011","DownVotes":1,"Grading":1,"Organization":5,"Rating":3,"ReviewText":"1111111111111111111","Reviewer":"johndoe",
                        "Status":"active","UpVotes":0,"Upvotes":0,"_id":"d756445e-db2b-450e-a099-56bfb40387b8","professor":"Jane Doe"},
                    {"Availability":4,"Comments":["Great prof !"],"Communication":5,"Competency":5,"CreateDate":"1681777223","DownVotes":1,"Grading":4,"Organization":5,"Rating":4.5,"ReviewText":"1111111111111111111","Reviewer":"jackfranck",
                        "Status":"active","UpVotes":0,"Upvotes":0,"_id":"d756445e-db2b-450e-a099-56bfb40387b8","professor":" Jane Doe"}
                                                        ]
                    


    professor_reviews.find.assert_called_once_with({'professor': {'$regex': query, '$options': 'i'}}, sort=[(sort_by, -1)])

def test_update_professor_averages(mocker):

    

    mocker.patch(
        'backend.reviews.service.profs_collection.find',
        return_value = [{"_id": "642ccf32b057456","professor":"Aaron Kent","Availability":0,"Communication":0,"Competency":0,"Grading":0,
                         "Organization":0,"Rating":0
                         }
        ]
        
     )
    
    mocker.patch(
        'backend.reviews.service.professor_reviews.find',
        return_value= [ {"_id":"3511ceb4-aa55-4aec-84f7","Reviewer":"jane doe","Rating":4,"professor":"Aaron Kent","Communication":4,"Organization":4,"Availability":4,"Grading":5,"Competency":4,"ReviewText":"Aaron was okay not the best","Upvotes":0,"DownVotes":0,
     "Comments":[],"Status":"active","CreateDate":"1681865291","UpVotes":1},
        {"_id":"3511ceb4-az55-5aec-84f7","Reviewer":"john doe","Rating":4,"professor":"Aaron Kent","Communication":5,"Organization":5,"Availability":5,"Grading":5,"Competency":5,"ReviewText":"Aaron was the best","Upvotes":0,"DownVotes":0,
        "Comments":[],"Status":"active","CreateDate":"1681865291","UpVotes":1}
                            ]
                )
    
    mocker.patch(
        'backend.reviews.service.profs_collection.update_one',
        return_value = [{"_id": "642ccf32b057456","professor":"Aaron Kent","Availability":4.5,"Communication":4.5,"Competency":4.5,"Grading":5,
                         "Organization":4.5,"Rating":4
                         }
                ]
    )

    update_professor_averages()
    
    updated_professor =  {"_id": "642ccf32b057456","professor":"Aaron Kent","Availability":4.5,"Communication":4.5,"Competency":4.5,"Grading":5,
                         "Organization":4.5,"Rating":4
                     }

    profs_collection.update_one.assert_called_once_with({'_id': "642ccf32b057456"}, {'$set': updated_professor})
