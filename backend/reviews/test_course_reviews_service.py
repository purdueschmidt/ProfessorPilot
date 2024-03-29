# <<<<<<< HEAD:backend/api/reviews/test_course_reviews_service.py
from backend.reviews.service import submit_course_review, course_reviews, professor_reviews, get_reviews_by_course_code, get_recent_course_reviews, get_all_courses, courses_collection, comment, comment_collection, vote,vote_collection, search_course_reviews, update_course_averages, update_review_upvote_downvote
# =======
# from backend.reviews.service import submit_course_review, course_reviews, get_reviews_by_course_code, \
#     update_course_averages, get_recent_course_reviews, get_all_courses, courses_collection
# >>>>>>> 829e8a0f6d0a65e8ae16c92dfddae020f240cb67:backend/reviews/test_course_reviews_service.py


def test_submit_course_review(mocker):
    mocker.patch(
        'backend.reviews.service.course_reviews.insert_one',
        return_value=True
    )

    mocker.patch(
        'backend.reviews.service.uuid.uuid4',
        return_value="1"
    )

    mocker.patch(
        'backend.reviews.service.time.time',
        return_value="1680495280"
    )

    mocker.patch(
        'backend.reviews.service.update_course_averages',
        return_value=True
    )

    json_from_create = {'reviewer': 'JOE',
                        "course_code": 'SSW 695',
                        'difficulty': 1,
                        'interest': 2,
                        'usefulness': 3,
                        'organization': 4,
                        'workload': 5,
                        'review_text': 'This is text',
                        'term': 'spring',
                        'year': '2000'}

    expected = {"Submit": "Submit Review Success"}
    actual = submit_course_review(json_from_create)

    expected_db_parameter = {
        '_id':"1",
        'Reviewer': "JOE",
        "course_code":'SSW 695',
        'Term': "spring",
        'Year': "2000",
        'Rating': 3,
        'Difficulty': 1,
        'Interest': 2,
        'Usefulness': 3,
        'Organization': 4,
        'Workload': 5,
        'ReviewText': "This is text",
        'UpVotes': 0,
        'DownVotes': 0,
        'Comments': [],
        'Status': 'active',
        'CreateDate': "1680495280",
        'ModifiedDate': "1680495280",
    }

    course_reviews.insert_one.assert_called_once_with(expected_db_parameter)
    assert expected == actual

def test_get_reviews_by_course_code(mocker):
    
    mocker.patch(
        'backend.reviews.service.course_reviews.find',
        return_value = [ {
        '_id':"1", 'Reviewer': "Jack", "course_code":'SSW 565', 'Term': "Fall", 'Year': "2020",
        'Difficulty': "4", 'Interest': "4", 'Usefulness': "4", 'Organization': "4", 'Workload': "4",
        'ReviewText': "This is text", 'UpVotes': 0, 'DownVotes': 0, 'Status': 'active', 
        'CreateDate': "1680495280", 'ModifiedDate': "1680495280"
    } 
        ]
    )

    assert get_reviews_by_course_code('SSW 565') == [ {
        '_id':"1", 'Reviewer': "Jack", "course_code":'SSW 565', 'Term': "Fall", 'Year': "2020",
        'Difficulty': "4", 'Interest': "4", 'Usefulness': "4", 'Organization': "4", 'Workload': "4",
        'ReviewText': "This is text", 'UpVotes': 0, 'DownVotes': 0, 'Status': 'active', 
        'CreateDate': "1680495280", 'ModifiedDate': "1680495280"
    } 
        ]


    course_reviews.find.assert_called_once_with({"course_code": "SSW 565"})


# test case with empty or incorrect input
    mocker.patch(
        'backend.reviews.service.course_reviews.find',
        return_value = []
    )

    assert  get_reviews_by_course_code('') == []

    course_reviews.find.assert_called_once_with({'course_code': ''})



def test_get_recent_course_reviews(mocker):

    mocker.patch(
        'backend.reviews.service.course_reviews.find',
        return_value = [
        {'_id':"1", 'Reviewer': "Paul", "course_code":'SSW 565', 'Term': "Fall",
        'Year': "2020",'Difficulty': "4",'Interest': "4",'Usefulness': "4",
        'Organization': "4",'Workload': "4",'ReviewText': "This is text",'UpVotes': 0,
        'DownVotes': 0,"Status": "active","CreateDate": "1680495280",'ModifiedDate': "1680495280" },
        {'_id':"2",'Reviewer': "Jack","course_code":'SSW 555','Term': "Fall", 
        'Year': "2021",'Difficulty': "4", 'Interest': "5",'Usefulness': "3",
        'Organization': "4",'Workload': "3",'ReviewText': "This is text",'UpVotes': 0,
        'DownVotes': 0, "Status": "active","CreateDate": "1680495290",'ModifiedDate': "1680495290",
        } 
        ]
    )
    
    assert  get_recent_course_reviews() == [
        {'_id':"1", 'Reviewer': "Paul", "course_code":'SSW 565', 'Term': "Fall",
        'Year': "2020",'Difficulty': "4",'Interest': "4",'Usefulness': "4",
        'Organization': "4",'Workload': "4",'ReviewText': "This is text",'UpVotes': 0,
        'DownVotes': 0,"Status": "active","CreateDate": "1680495280",'ModifiedDate': "1680495280" },
        {'_id':"2",'Reviewer': "Jack","course_code":'SSW 555','Term': "Fall", 
        'Year': "2021",'Difficulty': "4", 'Interest': "5",'Usefulness': "3",
        'Organization': "4",'Workload': "3",'ReviewText': "This is text",'UpVotes': 0,
        'DownVotes': 0, "Status": "active","CreateDate": "1680495290",'ModifiedDate': "1680495290",
        }  
        ]

    course_reviews.find.assert_called_once_with(
        {"Status": "active"},
        sort=[("CreateDate", -1)],
        limit=25
    )
    
    

def test_get_all_courses(mocker):

    mocker.patch(
        'backend.reviews.service.courses_collection.find',
        return_value = [{"_id": "1", "major":"*Computer Science", "course_code":"CS501", "course_name":"Java Programming" },
                        {"_id": "2","major":"*Computer Science","course_code":"CS559", "course_name":"Machine Learning: Fund & Apps"
                       },{"_id": '3',"major":"*Computer Science","course_code":"CS505","course_name":"Prob & Stochastic Proc I"}
                       ]
                    )
    
    assert get_all_courses() == [{"_id": "1", "major":"*Computer Science", "course_code":"CS501", "course_name":"Java Programming"},
                        {"_id": "2","major":"*Computer Science","course_code":"CS559", "course_name":"Machine Learning: Fund & Apps"
                       },{"_id": '3',"major":"*Computer Science","course_code":"CS505","course_name":"Prob & Stochastic Proc I"}
                       ]
    
    courses_collection.find.assert_called_once_with({})


def test_comment(mocker):

    mocker.patch(
        'backend.reviews.service.comment_collection.insert_one',
        return_value=True
    )

    mocker.patch(
        'backend.reviews.service.time.time',
        return_value="1680495280"
    )

    mocker.patch(
        'backend.reviews.service.uuid.uuid4',
        return_value = '9429736c-070c-4565-a288-fa295aa9bd84' 
    )

    mocker.patch(
        'backend.reviews.service.course_reviews.update_one',
        return_value=True
    )
    
    mocker.patch(
        'backend.reviews.service.professor_reviews.update_one',
        return_value=True
    )

    mock_comment = {
        '_id': "9429736c-070c-4565-a288-fa295aa9bd84",
        'Review_id': 'e4be611c-710c-4d7d-b6f1-68291de7f861',
        'Username': 'John',
        'Comment': 'Great !',
        'Timestamp': "1680495280"
    }
    
    # case 2 : test professor commment 

    comment_type = 'professor'
    
    expected = {"Submit": "Submit Comment Success"}

    professor_comment_return = comment(mock_comment['Review_id'], mock_comment['Comment'], mock_comment['Username'], comment_type)

    comment_collection.insert_one(mock_comment)

    professor_reviews.update_one( 
        {'_id': mock_comment['_id']},
        {'$push': {'Comments': mock_comment}})
    

    assert professor_comment_return == expected

    # case 2 : test course commment 
    comment_type = 'course'
    expected = {"Submit": "Submit Comment Success"}

    course_comment_return = comment(mock_comment['Review_id'], mock_comment['Comment'], mock_comment['Username'], comment_type)

    comment_collection.insert_one(mock_comment)

    course_reviews.update_one( 
        {'_id': mock_comment['_id']},
        {'$push': {'Comments': mock_comment}})
    
    assert course_comment_return == expected

def test_vote(mocker):

    mocker.patch(
        'backend.reviews.service.vote_collection.find_one',
        return_value = None
    )

    mocker.patch(
        'backend.reviews.service.vote_collection.insert_one',
        return_value=True
    )

    mocker.patch(
        'backend.reviews.service.vote_collection.update_one',
        return_value = True
    )

    mocker.patch(
        'backend.reviews.service.course_reviews.update_one',
        return_value = True
    )
    
    mocker.patch(
       'backend.reviews.service.professor_reviews.update_one',
        return_value = True
    )
    mocker.patch(
        'backend.reviews.service.uuid.uuid4',
        return_value = '125451287445' 
    )
     
    # case 1: user upvotes a course review 
    course_upvote_query = {'$inc': {'UpVotes': 1}}
    mock_vote = {
            '_id': '125451287445',
            'Review_id': '9632158525l',
            'User': "Jane Doe",
            'Vote': 'upvote'
        }
  
    excepted = {"Submit": "Submit Vote Success"}
    
    assert vote(mock_vote['_id'], mock_vote['Vote'], mock_vote['User'],'course') == excepted

    vote_collection.insert_one(mock_vote)
    course_reviews.update_one(
        {'_id': mock_vote['_id']}, course_upvote_query)


    # case 2: user downvotes a professor review 
    prof_downvote_query = {'$inc': {'DownVotes': 1}}
    mock_vote = {
            '_id': '12545821lbh5',
            'Review_id': '963215564kl',
            'User': "John Doe",
            'Vote': 'downvote'
        }
  
    excepted = {"Submit": "Submit Vote Success"}
    
    assert vote(mock_vote['_id'], mock_vote['Vote'], mock_vote['User'],'professor') == excepted

    vote_collection.insert_one(mock_vote)
    course_reviews.update_one({'_id': mock_vote['_id']}, prof_downvote_query)


    user_updated_vote = "downvote"
    update_query = {'$inc': {'UpVotes': -1, 'DownVotes': 1}}
      
    mocker.patch(
        'backend.reviews.service.vote_collection.find_one',
        return_value = 
        {
        "_id": "ce7d7d26-bd8d-48c5",
        "Review_id":"41216808-4dea-4db8",
        "User":"johndoe",
        "Vote": "upvote"}
           
    )
    # case 3 : user edits course review vote
    assert vote("ce7d7d26-bd8d-48c5", user_updated_vote, 'johndoe', "course") == {'Submit': 'Submit Vote Success'}

    vote_collection.find_one({'Review_id': 'ce7d7d26-bd8d-48c5', 'User':"johndoe"})
    vote_collection.update_one({'_id': "ce7d7d26-bd8d-48c5"}, {'$set': {'Vote': user_updated_vote}})
    course_reviews.update_one({'_id': "ce7d7d26-bd8d-48c5"}, update_query)


    # case 4: user edits professor review vote

    assert vote("ce7d7d26-bd8d-48c5", user_updated_vote, 'johndoe', "professor") == {'Submit': 'Submit Vote Success'}

    vote_collection.find_one({'Review_id': 'ce7d7d26-bd8d-48c5', 'User':"johndoe"})
    vote_collection.update_one({'_id': "ce7d7d26-bd8d-48c5"}, {'$set': {'Vote': user_updated_vote}})
    professor_reviews.update_one({'_id': "ce7d7d26-bd8d-48c5"}, update_query)

    # case 5: user tries to upvote a professor review twice

    user_existing_vote = 'upvote'
    assert vote("ce7d7d26-bd8d-48c5", user_existing_vote, 'johndoe', "professor") == {"Submit": "User has already voted this way"}
    vote_collection.find_one({'Review_id': 'ce7d7d26-bd8d-48c5', 'User':"johndoe"})

    # case 6: user tries to upvote a course review twice
    user_existing_vote = 'upvote'
    assert vote("ce7d7d26-bd8d-48c5", user_existing_vote, 'johndoe', "course") == {"Submit": "User has already voted this way"}
    vote_collection.find_one({'Review_id': 'ce7d7d26-bd8d-48c5', 'User':"johndoe"})


def test_search_course_reviews(mocker):

    mocker.patch(
        'backend.reviews.service.course_reviews.find',
        return_value = ([{"Comments":[{"Comment":"11111","Review_id":"79a0bd5c-7094-4608","Timestamp":"1681770404","Username":"johndoe","_id":"86a4d967-198a-4e0f-8e60-3122c6ef0f53"}],
                        "CreateDate":"1681768975","Difficulty":1,"DownVotes":1,"Interest":4,"ModifiedDate":"1681768975","Organization":2,"Rating":3,
                        "ReviewText":"eh","Reviewer":"johndoe","Status":"active","Term":"Spring","UpVotes":0,"Usefulness":5,"Workload":3,"Year":"2023","_id":"79a0bd5c-7094-4608-832d-328477a78ff7",
                        "course_code":"TEST101"
                        },
                        {"Comments":[{"Comment":"Cool class","Review_id":"79a0bd5c-7094-5488","Timestamp":"1681770455","Username":"johndoe","_id":"86a4d967-777a-4e0f-8e60-3122c6ef0f53"}],
                        "CreateDate":"1681768990","Difficulty":1,"DownVotes":1,"Interest":4,"ModifiedDate":"1681768990","Organization":2,"Rating":3,
                        "ReviewText":"eh","Reviewer":"johndoe","Status":"active","Term":"Spring","UpVotes":0,"Usefulness":5,"Workload":3,"Year":"2023","_id":"79a0bd5c-7094-4608-832d-328477a78ff7",
                        "course_code":"TEST101"
                        }
                    ] )
    )

    query = 'TEST101'
    sort_by = "Year"


    assert search_course_reviews(query, sort_by) == [{"Comments":[{"Comment":"11111","Review_id":"79a0bd5c-7094-4608","Timestamp":"1681770404","Username":"johndoe","_id":"86a4d967-198a-4e0f-8e60-3122c6ef0f53"}],
                        "CreateDate":"1681768975","Difficulty":1,"DownVotes":1,"Interest":4,"ModifiedDate":"1681768975","Organization":2,"Rating":3,
                        "ReviewText":"eh","Reviewer":"johndoe","Status":"active","Term":"Spring","UpVotes":0,"Usefulness":5,"Workload":3,"Year":"2023","_id":"79a0bd5c-7094-4608-832d-328477a78ff7",
                        "course_code":"TEST101"
                        },
                        {"Comments":[{"Comment":"Cool class","Review_id":"79a0bd5c-7094-5488","Timestamp":"1681770455","Username":"johndoe","_id":"86a4d967-777a-4e0f-8e60-3122c6ef0f53"}],
                        "CreateDate":"1681768990","Difficulty":1,"DownVotes":1,"Interest":4,"ModifiedDate":"1681768990","Organization":2,"Rating":3,
                        "ReviewText":"eh","Reviewer":"johndoe","Status":"active","Term":"Spring","UpVotes":0,"Usefulness":5,"Workload":3,"Year":"2023","_id":"79a0bd5c-7094-4608-832d-328477a78ff7",
                        "course_code":"TEST101"
                        }
                    ]
                    


    course_reviews.find.assert_called_once_with({'course_code': {'$regex': query, '$options': 'i'}}, sort=[(sort_by, -1)])

def test_update_course_averages(mocker):

    mocker.patch(
        'backend.reviews.service.courses_collection.find',
        return_value = [{"_id": "643f28138e19cb836b910b94","major":"*Computer Science","course_code":"CS511","course_name":"Concurrent Programming","Difficulty": 0,"Interest": 0,"Organization":0,
                        "Rating":0,"Usefulness":0,"Workload":0}
        ]
        
     )

    mocker.patch(
        'backend.reviews.service.course_reviews.find',
        return_value= [
        {"Comments":[{"Comment":"nice","Review_id":"c763e88e-a1c7-4936-9816-04c029de566f","Timestamp":"1681862744","Username":"jane doe",
                    "_id":"fc17c10e-7aad-4218-a12c-840e907fc12b"}],"CreateDate":"1681862686","Difficulty":4,"DownVotes":0,"Interest":5,"ModifiedDate":"1681862686",
                    "Organization":4,"Rating":4,"ReviewText":"average test","Reviewer":"jane doe","Status":"active","Term":"Spring","UpVotes":1,"Usefulness":3,"Workload":2,"Year":"2019",
                    "_id":"c763e88e-a1c7-4936-9816-04c029de566f","course_code":"CS511"},
                    {"Comments":[{"Comment":"test comment","Review_id":"6e6f4250-ade2-447d-bed9-94c8a52e5fce","Timestamp":"1681865183","Username":"johnpaul",
                                  "_id":"1ca92c46-81b1-4f1d-b723-a175e3bb591c"}],"CreateDate":"1681862718","Difficulty":3,"DownVotes":0,"Interest":5.0,"ModifiedDate":"1681862718","Organization":5,
                                  "Rating":5,"ReviewText":"test","Reviewer":"johnpaul","Status":"active","Term":"Fall","UpVotes":1,"Usefulness":5,
                                 "Workload":4,"Year":"2018","_id":"6e6f4250-ade2-447d-bed9-94c8a52e5fce","course_code":"CS511"}
                            ]
                )
    
    mocker.patch(
        'backend.reviews.service.courses_collection.update_one',
        return_value = [{"_id": "643f28138e19cb836b910b94","major":"*Computer Science","course_code":"CS511","course_name":"Concurrent Programming","Difficulty": 3.5,"Interest": 5.0,"Organization":4.5,
                        "Rating":4.5,"Usefulness":4,"Workload":3.0}]
    )

    update_course_averages()
    
    updated_course = {"_id": "643f28138e19cb836b910b94","major":"*Computer Science","course_code":"CS511","course_name":"Concurrent Programming","Difficulty": 3.5,"Interest": 5.0,"Organization":4.5,
                        "Rating":4.5,"Usefulness":4.0,"Workload":3.0}
        

    courses_collection.update_one.assert_called_once_with({'_id': "643f28138e19cb836b910b94"}, {'$set': updated_course})


    











    

    

    

    






    



