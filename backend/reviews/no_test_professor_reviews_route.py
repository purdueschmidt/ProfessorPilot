import unittest
from backend.appfactory import create_app
app = create_app()
app.testing = True


@pytest.mark.skip
class TestProfessorReviewsViews(unittest.TestCase):

    def test_get_professor_reviews(self):
        with app.test_client() as c:
            response = c.get('http://localhost:6060/reviews/professorsPage/Aaron%20Klappholz')
            self.assertEqual(response.status_code, 200)

    def test_get_professors(self):
        with app.test_client() as c:
            response = c.get('http://localhost:6060/reviews/professorsPage')
            self.assertEqual(response.status_code, 200)
    
    def test_recent_professor_entries(self):
        with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/recent_professor_reviews")
            self.assertEquals(response.status_code, 200)

    def test_submit_prof_review(self):
         with app.test_client() as c:
            response = c.get("http://localhost:6060/reviews/submit_professor_review")
            self.assertEqual(response.status_code, 200)

