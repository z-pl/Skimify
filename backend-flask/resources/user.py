from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel
from schemas import UserSchema, UserLoginSchema, TextInputSchema
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from db import db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from cache import cache
from datetime import timedelta
from flask import jsonify
from Utils.Skimify import SkimifyTool

blp = Blueprint("Users", "users", description="Operations on users")

@blp.route("/register")
class UserRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        new_user = UserModel(
            username = user_data["username"],
            password = pbkdf2_sha256.hash(user_data["password"]),
            email = user_data["email"]
        )

        try:
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError:
            abort(400, message="Duplicate username or email")
        except SQLAlchemyError as e:
            abort(400, message=str(e))

        return {"message": "User Created Succesfully"}, 201

@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(UserLoginSchema)
    def post(self, user_data):
        user = UserModel.query.filter(
            UserModel.email == user_data["email"]
        ).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(identity=user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        abort(401, message="Invalid Crendials")

@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}



@blp.route("/logout")
class UserLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        cache.set(jti, "", ex=timedelta(hours=1))

        return {"message": "User logged out"}

@blp.route("/users")
class Users(MethodView):
    @blp.response(200, UserSchema(many=True))
    def get(self):
        return UserModel.query.all()

    @jwt_required()
    def post(self):
        return {"message": "User authhhh"}
