from flask import Flask, jsonify
from flask_smorest import Api
from db import db
from resources.user import blp as UserBlueprint
from resources.summary import blp as SummaryBlueprint
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from datetime import timedelta
from cache import cache
from flask_cors import CORS
import os
from dotenv import load_dotenv
POSTGRES_USER = os.getenv('POSTGRES_USER') or ""
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD') or ""
POSTGRES_DB = os.getenv('POSTGRES_DB') or ""
POSTGRES_HOST = os.getenv('POSTGRES_HOST') or ""
POSTGRES_PORT = os.getenv('POSTGRES_PORT')  or ""

def create_app(db_url=None):

    ACCESS_EXPIRES = timedelta(hours=1)

    app = Flask(__name__)

    load_dotenv()
    # db_url = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'
    CORS(app)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Skimify API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DB_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True

    db.init_app(app)
    migrate = Migrate(app, db)
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET") # MUST CHANGE LATER TESTING PURPOSES
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        token_in_redis = cache.get(jti)

        return token_in_redis is not None

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"message": "Token has expired", "error": "token_expired"}
            ),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {"description": "Request does not contain an access token", "error": "authorization_expired"}
            ),
            401,
        )

    # Register Blueprints here
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(SummaryBlueprint)


    return app


# if __name__ == '__main__':
#     create_app = create_app()
#     create_app.run()
# else:
#     gunicorn_app = create_app()

#ewjwkrlkwejlkjrlwjrelkjrlkjljjljljljljljljljljljlkjlk
#ewjwkrlkwejlkjrlwjrelkjrlkjljjljljljljljljljljljlkjlk@gmail.com
