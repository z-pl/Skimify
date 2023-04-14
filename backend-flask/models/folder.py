from db import db



class FolderModel(db.Model):
    __tablename__ = "folders"

    folder_id = db.Column(db.String(32), primary_key=True, unique=True)
    folder_name = db.Column(db.String(345), unique=True, nullable=False)
    user_id = db.Column(db.String(345), db.ForeignKey('users.id'))


