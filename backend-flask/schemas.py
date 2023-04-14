from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    # Add email
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True) # dont run to return passowrd

class UserLoginSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True) # dont run to return passowrd
