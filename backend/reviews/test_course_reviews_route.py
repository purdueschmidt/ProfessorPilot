import unittest
from backend.app import app

app.testing = True


class TestCourseReviewsViews(unittest.TestCase):

    def test_home(self):

        with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/recent_course_reviews")
            self.assertEquals(response.status_code, 200)

    def test_get_course_reviews(self):
        with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/coursesPage/CS501")
            self.assertEquals(response.status_code, 200)

    def test_get_courses(self):
        with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/coursesPage")
            self.assertEquals(response.status_code, 200)
    
    def test_submit_course_review(self):

         with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/submit_course_review")
            self.assertEquals(response.status_code, 200)
    

    