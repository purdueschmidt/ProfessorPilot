import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

client_url = os.getenv('CLIENT')

client = MongoClient(client_url)
db = client['ProfessorPilot']
courses_collection = db['Courses']

def get_all_courses():
    cursor = courses_collection.find({})
    all_courses = [{**course, '_id': str(course['_id'])} for course in cursor]

    if all_courses is None:
        print("null")
    else:
        print("not null")

    print('All courses:', all_courses)
    return all_courses

# def get_course_reviews():
#     cursor = courses_collection.find({})
#     all_courses = [{**course, '_id': str(course['_id'])} for course in cursor]

#     if all_courses is None:
#         print("null")
#     else:
#         print("not null")

#     print('All courses:', all_courses)
#     return all_courses


if __name__ == "__main__":
    get_all_courses()
