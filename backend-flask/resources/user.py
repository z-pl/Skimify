from flask.views import MethodView
from flask_smorest import Blueprint, abort
from models import UserModel
from schemas import UserSchema

blp = Blueprint("Users", "users", description="Operations on users")

# @blp.route("/login")
# class UserLogin(MethodView):
#     @blp.arguments(UserSchema)
#     def post(self, user_data):
#         return {"message": "create user"}

# @blp.route("/register")
# class UserRegister(MethodView):
#     pass

# @blp.route("/logout")
# class UserLogout(MethodView):
#     pass

@blp.route("/users")
class Users(MethodView):
    def get(self):
        return {"message": "hello"}, 200
