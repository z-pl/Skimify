import openai
import os
from Utils.GPTHelper import split_into_chunks, tokenize
from dotenv import load_dotenv


class SkimifyTool():
    """
    A tool for converting dot points into more descriptive text using OpenAI GPT-3.5 Turbo.

    Attributes:
        None
    """

    def __init__(self) -> None:
        """
        Initialize the SkimifyTool instance by loading the OpenAPI API key.
        """
        load_dotenv()
        openai.api_key = os.getenv("open_ai_api_key")

    def dotpointToText(self, dotpoint: str) -> str:
        """Expand the input dot point into a more descriptive text using OpenAI GPT-3.5.

        Args:
            dotpoint (str): A dot point that needs to be expanded into a more descriptive text.

        Returns:
            str: A string containing the expanded and more descriptive version of the input dot point.
                If the tokenized input length exceeds 1500 tokens, the function returns None.

        Example:
            Input:
                "Key point 1"

            Output:
                "This is an expanded and more descriptive version of key point 1."
        """
        if len(tokenize(dotpoint)) > 1000:
            return "Input was too long, please only interact with this application though skimify.ai"

        dotpoint_conversion = ""

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": f'Expand upon this dotpoint, give information about the topic from your own understanding but do not assume any extra details. But try to keep this relatively brief as well, three-four sentences: "{dotpoint}"'
                }
            ], temperature = 0
        )

        dotpoint_conversion += completion.choices[0].message.content
        return dotpoint_conversion


    def textToDotpoint(self, text) -> list:
        """Summarize the input text into a list of key dot points using OpenAI GPT-3.5 Turbo.

        Args:
            text (str): The input text that needs to be summarized into key dot points.

        Returns:
            list: A list of strings containing the key dot points extracted from the input text.

        Example:
            Input:
                "This is a long text containing several key points."

            Output:
                [
                    "@dp Key point 1",
                    "@dp Key point 2",
                    "@dp Key point 3",
                ]
        """
        if len(tokenize(text)) >= 1000:
            return "@dpText input was too long. Please reduce input size and try again"

        chunks = split_into_chunks(text, 3000)

        dotpoints = ""

        firstIterationFlag = True

        if firstIterationFlag:
            firstIterationFlag = False

            completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": f'Please summarise only the key points of this text into dotpoints. You must use "@dp" to indicate to the start of all dotpoints in your response. Ensure dotpoints are short: "{chunks[0]}" \
                        \n Do not repeat yourself'
                },
            ], temperature= 0
        )

            data = completion.choices[0].message.content
            dotpoints += data

            if len(chunks)==1:
                return dotpoints


        for i in range(1, len(chunks)):

            completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": f'Please summarise the key points of this lecture into dotpoints. You must use "@dp" to indicate to the start of all dotpoints in your response: "{chunks[i]}" \n Please use \
                        this as context for dotpoints which you have already mentioned: "{chunks[i-1]}" \n Do not repeat yourself'
                }
            ], temperature = 0
        )

            data = completion.choices[0].message.content
            dotpoints += (data)


        completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f'For a lecture summary, please reduce the amount of dotpoints to three-seven dotpoints by only keeping the major and important dotpoints". The text is: "{dotpoints}" \n Please label all the dotpoints in your output with "@dp"   '
            }
        ], temperature = 0
    )

        dotpoints = completion.choices[0].message.content

        return dotpoints
