import unittest
from main import creat_app
from config import TestConfig
from exts import db
from models import Recipe,User

class APITestCase(unittest.TestCase):
    
    # Set up the test app and database
    def setUp(self):
        self.app = creat_app(TestConfig)
        with self.app.app_context():
            self.client = self.app.test_client()
            db.create_all()
            
    
    # Tear down the database after each test
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            db.engine.dispose()
        
        
    # Helper to create a recipe
    def create_recipe(self, title="Pizza margherita", description="Classic Italian pizza with mozzarella and basil"):
        """Helper function to create a recipe in the DB"""
        recipe = Recipe(title=title, description=description)
        with self.app.app_context():
            recipe.save()
        return recipe    
    
    # Helper to get access token
    def get_access_token(self):
        """Helper to register and login to Get access token """
        
        signup_response = self.client.post(
            "/auth/signup",
            
            json={
                "username":"testuser",
                "email":"test@example.com",
                "password":"123456"
            }
        )
        login_response = self.client.post(
            '/auth/login',
            json={
                "username":"testuser",
                "password":"123456"
            }
        )
        data = login_response.get_json()
        access_token = data["accessToken"]
        return access_token
    
    # Create recipe test
    def test_create_recipe(self):
        """ Test creating a new recipe """
        access_token = self.get_access_token()
        self.create_recipe()
        dish_json = {"title":"Pizza margherita", "description":"Classic Italian pizza with mozzarella and basil"}
        response = self.client.post(
                '/recipe/recipes',
                json=dish_json,
                headers = {
                    "Authorization":f"Bearer {access_token}"
                })
        
        self.assertEqual(response.status_code,201)
        self.assertEqual(response.get_json(),{
            "id":2,
            **dish_json
            
        })
    
    # Get all recipes test
    def test_get_recipes(self):
        """ Test getting all recipes """
        self.create_recipe()
        respose = self.client.get('/recipe/recipes')
        print(respose.data)
    
    # Get recipe by id test
    def test_get_recipe_by_id(self):
        """ Test getting a recipe by ID """
        self.create_recipe()
        response = self.client.get('/recipe/recipe/1')
        print(response.get_json())
    
    # Update recipe test
    def test_update_recipe(self):
        """ Test updating a recipe """
        access_token = self.get_access_token()
        self.create_recipe()
        updated_data = {
            "title":"Updated Pizza",
            "description":"Updated description"
        }
        response = self.client.put(
            '/recipe/recipe/1',
            json=updated_data,
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.get_json(),{"id":1,**updated_data})
        
    # Delete recipe test
    def test_delete_recipe(self):
        """ Test deleting a recipe """
        access_token = self.get_access_token()
        self.create_recipe()
        response = self.client.delete(
            '/recipe/recipe/1',
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.get_json(),{"id":1,"title":"Pizza margherita", "description":"Classic Italian pizza with mozzarella and basil"})
        
    
if __name__ == "__main__":
    unittest.main()