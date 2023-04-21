import unittest
from api.wsgi import app


class TestProfessorReviewsViews(unittest.TestCase):

    def test_get_professor_reviews(self):
        with app.test_client() as c:
            response = c.get('http://localhost:6060/api/reviews/professorsPage/Aaron%20Klappholz')
            self.assertEqual(response.status_code, 200)

    def test_get_professors(self):
        with app.test_client() as c:
            response = c.get('http://localhost:6060/api/reviews/professorsPage')
            self.assertEqual(response.status_code, 200)
    
    def test_recent_professor_entries(self):
        with app.test_client() as c:
            response = c.get("http://localhost:6060/api/reviews/recent_professor_reviews")
            self.assertEquals(response.status_code, 200)

    def test_submit_prof_review(self):
         with app.test_client() as c:
            response = c.get("http://localhost:6060/api/reviews/submit_professor_review")
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main(exit=False, verbosity=2)