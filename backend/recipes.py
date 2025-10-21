from flask_restx import Resource,Namespace,fields
from models import Recipe
from flask import request
from flask_jwt_extended import jwt_required

recipe_namespace = Namespace('recipe',description='A namespace for Recipes')

recipe_model = recipe_namespace.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)            
        
@recipe_namespace.route('/recipes')
class RecipesResource(Resource):
    @recipe_namespace.marshal_list_with(recipe_model)
    def get(self) :    
        """ Get all recipes """
        recipes = Recipe.query.all()
        return recipes
    
    @recipe_namespace.marshal_with(recipe_model)
    @recipe_namespace.expect(recipe_model)  # to be able to make the request from swagger
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

@recipe_namespace.route('/recipe/<int:id>')
class RecipeResource(Resource):
    
    @recipe_namespace.marshal_with(recipe_model)
    def get(self,id):
        """ Get recipe by id """
        recipe = Recipe.query.get_or_404(id)
        return recipe
        
    @jwt_required()
    @recipe_namespace.marshal_with(recipe_model)
    def put(self,id):
        """ Update a recipe by id """
        data = request.get_json()
        recipe = Recipe.query.get_or_404(id)
            
        title = data.get('title')
        description = data.get('description')
            
        recipe.update(title,description)
            
        return recipe,201
        
    @recipe_namespace.marshal_with(recipe_model)
    @jwt_required()
    def delete(self,id):
        """ Delete recipe by id """
        recipe = Recipe.query.get_or_404(id)
        
        recipe.delete()
        return recipe,201
        
    