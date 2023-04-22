import re


def tokenize(text):
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