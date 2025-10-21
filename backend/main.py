from flask import Flask , render_template , url_for ,request,jsonify
from flask_restx import Api,Resource,fields
from config import DevConfig
from models import Recipe,User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash , check_password_hash 
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required
app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app,db)
JWTManager(app)
api = Api(app,doc = '/docs')

# model
recipe_model = api.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)

signup_model = api.model(
    "SignUp",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model = api.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World!"}


@api.route('/login')
class LoginResource(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by( username = username ).first()
        if user is None:
            api.abort(401,f"User with username {username} does not exist")
        
        if not check_password_hash(user.password,password):
            api.abort(400,f"Incorrect password")
        
        access_token = create_access_token(identity = user.username)
        refresh_token = create_refresh_token(identity = user.username)
        return jsonify({
            "accessToken":access_token,
            "refresh_token":refresh_token
        })
        
            
    
    
@api.route('/signup')
class SignUpResource(Resource):
    @api.expect(signup_model)
    @api.marshal_with(signup_model)
    def post(self):
        """ Register new User """
        data  = request.get_json()
        
        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()
        
        if db_user is None:
            new_user = User(
                    username = data.get('username'),
                    email = data.get('email'),
                    password = generate_password_hash(data.get('password'))
                        )
            new_user.save()
            return new_user,201
        
        api.abort(401, f"User with username {username} already exists!")

        
@api.marshal_list_with(signup_model)
def get(self):
    """ Get all users """
    users = User.query.all()
    return users

@api.route("/signup_crud/<int:user_id>")
class SignUpCRUDOperationsResource(Resource):
    @api.marshal_list_with(signup_model)
    def get(self,user_id):
        """ Get user by id """
        user = User.query.get_or_404(user_id)
        return user,201
    
    def delete(self,user_id):
        " Delete user by id "
        user  = User.query.get_or_404(user_id)
        user.delete()
        return {"message":f"user {user.username} with id :{user.id} deleted successfully "},200
    
    @api.marshal_with(signup_model)
    @api.expect(signup_model)
    def put(self,user_id):
        user = User.query.get_or_404(user_id)
        new_password = request.get_json().get('password')
        user.update(new_password)
        return user,200

        
        
        

@api.route('/recipes')
class RecipesResource(Resource):
    @api.marshal_list_with(recipe_model)
    def get(self) :    
        """ Get all recipes """
        recipes = Recipe.query.all()
        return recipes
    
    @api.marshal_with(recipe_model)
    @api.expect(recipe_model)  # to be able to make the request from swagger
    @jwt_required()
    def post(self):
        """ Create new recipe """
        data = request.get_json()
        
        new_recipe = Recipe(
            title = data.get('title'),
            description = data.get('description') 
        )
        
        new_recipe.save()
        
        return new_recipe,201

@api.route('/recipe/<int:id>')
class RecipeResource(Resource):
    
    @api.marshal_with(recipe_model)
    def get(self,id):
        """ Get recipe by id """
        recipe = Recipe.query.get_or_404(id)
        return recipe
        
    @jwt_required()
    @api.marshal_with(recipe_model)
    def put(self,id):
        """ Update a recipe by id """
        data = request.get_json()
        recipe = Recipe.query.get_or_404(id)
            
        title = data.get('title')
        description = data.get('description')
            
        recipe.update(title,description)
            
        return recipe,201
        
    @api.marshal_with(recipe_model)
    @jwt_required()
    def delete(self,id):
        """ Delete recipe by id """
        recipe = Recipe.query.get_or_404(id)
        
        recipe.delete()
        return recipe,201
        
    
@app.shell_context_processor
def make_shell_context():
    return {
        "db":db,
        "Recipe":Recipe
    }
    
if __name__ == "__main__":
    app.run(debug=True)
    

