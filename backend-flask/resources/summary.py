from flask.views import MethodView
from flask_smorest import Blueprint, abort
from schemas import UserSchema, UserLoginSchema, TextInputSchema
from flask import jsonify
from Utils.Skimify import SkimifyTool

blp = Blueprint("Summary", "summary", description="Summary Operations")


@blp.route("/skimify/text/summary")
class SkimifyTextSummary(MethodView):
        @blp.arguments(TextInputSchema)
        def post(self, user_data):
            """
            Generate a summarized version of the input text as a list of key points.

            The input JSON should contain a "text" field, which represents the content
            that needs to be summarized. The function returns a list with 'n' elements,
            where each element represents a summarized key point in the form of a dot point.
            
            Args:
                user_data (dict): A dictionary containing the input data. Should include a
                                "text" field with the text to be summarized.

            Returns:
                list: A list containing 'n' summarized key points from the input text.
            
            """
        
            Skimify = SkimifyTool()
            data = Skimify.textToDotpoint(user_data["text"])


            data = data.split("@dp")

            if data[0]=="":
                  del data[0]

            data = [i.replace('\n','') for i in data]
            data = [i.replace(' - ','') for i in data]


            return jsonify({"dotpoints": data})

@blp.route("/skimify/text/dotpoint")
class SkimifyDPExpander(MethodView):
        @blp.arguments(TextInputSchema)
        def post(self, user_data):
            """
            Expand the input dot point into a more descriptive text of varying length.

            The input JSON should contain a "text" field, which represents the dot point
            that needs to be expanded. The function returns a string containing the expanded
            and more descriptive version of the input dot point.

            Args:
                user_data (dict): A dictionary containing the input data. Should include a
                                "text" field with the dot point to be expanded.

            Returns:
                str: A string containing the expanded and more descriptive version of the input dot point.
            """
            Skimify = SkimifyTool()

            data = Skimify.dotpointToText(user_data["text"])

            return jsonify({"summary": data} )
