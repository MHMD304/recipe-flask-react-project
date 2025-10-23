from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY  = config('SECRET_KEY',default = 'mysecretkey')
    SQLALCHEMY_TRACK_MODIFICATION = config('SQLALCHEMY_TRACK_MODIFICATION',cast = bool,default = False)
    
    
class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(BASE_DIR,'dev.db')
    DEBUG = True
    # help us to see the generated sql commands everytime we carry out a database transaction 
    SQLALCHEMY_ECHO = True
 
    
class ProdConfig(Config):
    pass


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    TESTING = True
    SQLALCHEMY_ENGINE_OPTIONS = {
    "connect_args": {"check_same_thread": False}
    }   