class Message:
    def __init__(self, text):
        self.text = text
        self.metadata = vars(Metadata())

class Metadata:
    def __init__(self):
        self.api = "api_flask_python_hello-world"
        self.branch = "basic-role-based-access-control"

# TABLE_NAME = "CourseReviews"

# class CourseReview:
    
#     def __init__(self):
#         self.type = "Course"
#         self.date = datetime.now().isoformat()
#         self.id = str(ksuid())
#         self.table = boto3.resource('dynamodb').Table(TABLE_NAME)
        

#     def create_review(self, reviewer, coursename, criteria: list[int], code, text, term, year):
#         """
#         Create a new course review.
#         """
#         try:
#             self.table.put_item(
#                 Item={
#                     "PK": f"TYPE#Course",
#                     "SK": f"{coursename}#{reviewer}",
#                     "GSI1PK": reviewer,
#                     "course_code": code,
#                     "Difficulty": criteria[0],
#                     "Interest": criteria[1],
#                     "Usefulness": criteria[2],
#                     "Organization": criteria[3],
#                     "Workload": criteria[4],
#                     "Rating": criteria[5],
#                     "ReviewText": text,
#                     "Term": term,
#                     "Year": year,
#                     "CreateDate": self.date,
#                     "ReviewId": self.id
#                 },
#                 ConditionExpression="attribute_not_exists(SK)"
#             )

#             print("Course review created successfully.")

#         except ClientError as ce:
#             if ce.response['Error']['Code'] == 'ConditionalCheckFailedException':
#                 print("Review already exists. Please update existing review.")
#         except Exception as e:
#             print("Could not create course review.")
#             print(e)
#     def delete_review(self, reviewer, coursename):
          
#         """
#         Deletes a course review from the Reviews table.
#         """
#         try:
#             self.table.delete_item(
#                 Key={"PK": "TYPE#{}".format(self.type),  "SK": "{}#{}".format(coursename, reviewer)},
#                 )
#             print("course review deleted successfully")
    
#         except Exception as e:
#             print("course review could not be deleted.")
#             print(e)


#     def update_review(self, reviewer, coursename, criteria:list[int], code, text, term, year):
#         """
#         Updates course review in the Reviews table
#         """
#         try:
#             self.table.update_item(
#                 Key = {"PK": "TYPE#{}".format(self.type),  "SK": "{}#{}".format(coursename, reviewer)},
#                 UpdateExpression = "SET #cod = :o, #txt = :x, #trm = :r, #yr = :y, #dif =:f, #in =:i, #us = :u, #org = :g, #wkl =:w, #rt =:t, #mod =:d" ,
#                 ExpressionAttributeNames =  {
#                     "#cod": "course_code",                         
#                     "#txt": "ReviewText",                           
#                     "#trm": "Term",
#                     "#yr": "Year",
#                     "#dif": "Difficulty",
#                     "#in": "Interest",
#                     "#us": "Usefulness",
#                     "#org":"Organization",
#                     "#wkl":"Workload",
#                     "#rt": "Rating",
#                     "#mod":"ModifiedDate"
#                 },
#                 ExpressionAttributeValues = {
#                     ':o': code,
#                     ':x': text, 
#                     ':r': term, 
#                     ':y': year,
#                     ':f': criteria[0],
#                     ':i': criteria[1],
#                     ':u': criteria[2],
#                     ':g': criteria[3],
#                     ':w': criteria[4],
#                     ':t': criteria[5],
#                     ':d': self.date
#                     },
#                     ReturnValues="UPDATED_NEW"
#                         )

#             print("course review was updated sucessfully")
            
#         except Exception as e:
#             print("course review could not be updated. Errror: {}".format(e))
    
#     def get_course_reviews(self, coursename):
#         """Gets reviews of a specific course 
#         """
#         try:
#             response=self.table.query(KeyConditionExpression = Key('PK').eq("TYPE#{}".format(self.type))
#                                     & Key("SK").begins_with(coursename)
#             )
#             print(response['Items'])

#         except Exception as e:
#               print("could not query {} reviews.".format(self.type))
#               print(e)
            
#     def get_all_reviews(self):
#         """Gets all course reviews 
#         """
#         try:         
#             response = self.table.query(KeyConditionExpression = Key('PK').eq("TYPE#{}".format(self.type))
#                     )         
#             print(response['Items'])

#         except Exception as e:
#               print("could not query {} reviews.".format(self.type))
#               print(e)