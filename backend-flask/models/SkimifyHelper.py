import os
import openai
import re


class GPTTool():

    def __init__(self, text, file):

        self.text, self.file = None, None

        openai.api_key = ""

        if text != None or text != "":
            self.text = text
        
        if file != None:
            self.file = file
        
        return None


    def skimify(self):
        if self.text != None:
            return self.textHelper()
        elif self.file != None:
            return self.fileHelper()

        
    def fileHelper(self):
        transcript = openai.Audio.transcribe("whisper-1", self.file)
        self.text = transcript.text

        return self.textHelper()

    def textHelper(self):
        self.chunks = self.split_into_chunks(self.text, 3000)
        return self.summaryHelper()
        
    

    def summaryHelper(self):

        self.output = ""




        #for i, chunk in enumerate(self.chunks):

                   
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f'Give a detailed summary of the following lecture transcript. Use your known knowledge to help where applicable, this should be at least 10000 words. When a topic is introduced, you need to write a step by step guide about it, e.g.. if z algorithm is introduced, give code samples as well) {self.text} '}
            ]
        )
                
            # else:

            #     completion = openai.ChatCompletion.create(
            #         model="gpt-3.5-turbo",
            #         messages=[
            #             {"role": "user", "content": f'Summarize {self.chunks[i]} with {self.chunks[i-1]} as context'}
            #         ]
            #     )

        self.output += completion.choices[0].message.content


        return self.output

    

    
        


    def tokenize(self,text):
        return re.findall(r'\b\w+\b|\S', text)

    def split_into_chunks(self, text, max_tokens):
        tokens = self.tokenize(text)
        chunks = []
        current_chunk = []

        for token in tokens:
            current_chunk.append(token)
            if sum(len(t) for t in current_chunk) >= max_tokens - len(current_chunk):
                chunks.append("".join(current_chunk))
                current_chunk = []

        if current_chunk:
            chunks.append("".join(current_chunk))

        return chunks



with open('backend-flask/models/data.txt', 'r') as file:
    data = file.read().replace('\n', '')

test = GPTTool(data, None)
print(test.skimify())



        
        


        
        
