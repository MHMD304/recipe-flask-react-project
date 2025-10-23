from flask_restx import Api,Resource,Namespace,fields
from models import User
from flask import request,jsonify
from werkzeug.security import generate_password_hash , check_password_hash 
from flask_jwt_extended import (
                        create_access_token,
                        create_refresh_token,
                        jwt_required,
                        get_jwt_identity
                        )
auth_namespace = Namespace('auth',description = "A namespace for our Auhtentication")

signup_model = auth_namespace.model(
    "SignUp",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model = auth_namespace.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

@auth_namespace.route('/signup')
class SignUpResource(Resource):
    @auth_namespace.expect(signup_model)
    @auth_namespace.marshal_with(signup_model)
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
        
        auth_namespace.abort(401, f"User with username {username} already exists!")

@auth_namespace.route('/login')
class LoginResource(Resource):
    @auth_namespace.expect(login_model)
    def post(self):
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by( username = username ).first()
        if user is None:
            auth_namespace.abort(401,f"User with username {username} does not exist")
        
        if not check_password_hash(user.password,password):
            auth_namespace.abort(400,f"Incorrect password")
        
        access_token = create_access_token(identity = user.username)
        refresh_token = create_refresh_token(identity = user.username)
        return jsonify({
            "accessToken":access_token,
            "refresh_token":refresh_token
        })
        
@auth_namespace.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        user  = get_jwt_identity()
        new_access_token = create_access_token(identity=user)
        return{
            "access_token":new_access_token
        },200
