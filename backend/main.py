from flask import Flask , render_template , url_for ,request
from flask_restx import Api,Resource,fields
from config import DevConfig
from models import Recipe
from exts import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app,db)

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

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World!"}


@api.route('/recipes')
class RecipesResource(Resource):
    @api.marshal_list_with(recipe_model)
    def get(self) :    
        """ Get all recipes """
        recipes = Recipe.query.all()
        return recipes
    
    @api.marshal_with(recipe_model)  
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
    

