from flask import Flask
from flask_restx import Api
from config import DevConfig
from models import Recipe,User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from recipes import recipe_namespace
from auth import auth_namespace
from flask_cors import CORS

def creat_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    
    CORS(app)
    
    db.init_app(app)

    migrate = Migrate(app,db)
    JWTManager(app)
    api = Api(app,doc = '/docs')
    
    api.add_namespace(recipe_namespace)
    api.add_namespace(auth_namespace)
    
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db":db,
            "Recipe":Recipe,
            "user":User
        }
    
    return app
    

