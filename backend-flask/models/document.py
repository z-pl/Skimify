from db import db



class DocumentModel(db.Model):
    __tablename__ = "documents"

    doc_id = db.Column(db.String(32), primary_key=True, unique=True)
    doc_name = db.Column(db.String(32), primary_key=True, unique=True)
    doc_type = db.Column(db.String(32), primary_key=True,unique=False)
    folder_id = db.Column(db.String(345), db.ForeignKey('folders.folder_id'))



