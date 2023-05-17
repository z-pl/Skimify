import re
import tiktoken


def tokenize(text):
    encoding = tiktoken.get_encoding("cl100k_base")
    encoding = tiktoken.encoding_for_model("gpt-4")
    
    tokenversion = [encoding.decode_single_token_bytes(token) for token in encoding.encode(text)]
    for i, item in enumerate(tokenversion):
        tokenversion[i] = str(item).rstrip("'")

    tokenized = [i.replace("b'", "") for i in tokenversion]

    return tokenized

def tokenize2(text):
    return re.findall(r'\b\w+\b|\S', text)

def split_into_chunks(text, max_tokens):
    tokens = tokenize(text)
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