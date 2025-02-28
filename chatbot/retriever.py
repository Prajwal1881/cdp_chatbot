import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from utils import TextProcessor

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
DATA_DIR = "data"
INDEX_DIR = "embeddings"
INDEX_FILE = os.path.join(INDEX_DIR, "cdp_faiss.index")
MODEL = SentenceTransformer(EMBEDDING_MODEL)
processor = TextProcessor()

os.makedirs(INDEX_DIR, exist_ok=True)

def load_data():
    """Loads and chunks documentation."""
    docs = {}
    for file in os.listdir(DATA_DIR):
        if file.endswith(".txt"):
            with open(os.path.join(DATA_DIR, file), "r", encoding="utf-8") as f:
                content = f.read()
                chunks = processor.chunk_text(content)
                docs[file.replace(".txt", "")] = chunks
    return docs

def create_faiss_index():
    """Creates FAISS index with proper chunking."""
    docs = load_data()
    text_chunks = []
    doc_map = []

    for cdp, chunks in docs.items():
        if chunks:
            text_chunks.extend(chunks)
            doc_map.extend([cdp] * len(chunks))

    if not text_chunks:
        raise ValueError("No valid text chunks found")

    embeddings = MODEL.encode(text_chunks)
    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(np.array(embeddings, dtype=np.float32))

    faiss.write_index(index, INDEX_FILE)
    
    with open(os.path.join(INDEX_DIR, "doc_map.txt"), "w") as f:
        f.write("\n".join(doc_map))

    print("[+] FAISS index created with improved chunking")

if __name__ == "__main__":
    create_faiss_index()