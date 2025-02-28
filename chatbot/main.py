from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer, CrossEncoder
from utils import TextProcessor
import os

CDP_DOCS = {
    "Segment": "https://segment.com/docs/",
    "mParticle": "https://docs.mparticle.com/",
    "Lytics": "https://docs.lytics.com/",
    "Zeotap": "https://docs.zeotap.com/"
}

app = FastAPI()
processor = TextProcessor()
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load FAISS index and model
MODEL = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("embeddings/cdp_faiss.index")
with open("embeddings/doc_map.txt", "r") as f:
    doc_map = f.read().split("\n")

class QueryRequest(BaseModel):
    query: str

def is_comparison(query):
    comparison_terms = ["compare", "vs", "versus", "difference", "which is better"]
    return any(term in query.lower() for term in comparison_terms)

@app.post("/query/")
def search(request: QueryRequest):
    if not processor.is_relevant_question(request.query):
        return {"cdp": "System", "response": "I specialize in how-to questions about CDPs. Please ask about Segment, mParticle, Lytics, or Zeotap."}
    
    if is_comparison(request.query):
        return handle_comparison(request.query)
    
    query_vector = MODEL.encode([request.query])
    _, I = index.search(np.array(query_vector, dtype=np.float32), 5)  # Get top 5
    
    results = []
    for idx in I[0]:
        if idx >= len(doc_map): continue
        cdp = doc_map[idx]
        try:
            with open(f"data/{cdp}.txt", "r", encoding="utf-8") as f:
                text = f.read(1000)
                results.append({"cdp": cdp, "text": text})
        except:
            continue
    
    if not results:
        return {"cdp": "System", "response": "No relevant documentation found."}
    
    # Rerank results
    pairs = [(request.query, res["text"]) for res in results]
    scores = reranker.predict(pairs)
    best_idx = np.argmax(scores)
    
    return {"cdp": results[best_idx]["cdp"], "response": results[best_idx]["text"]}

def handle_comparison(query):
    cdps = ["Segment", "mParticle", "Lytics", "Zeotap"]
    comparison_data = []
    
    for cdp in cdps:
        query_vector = MODEL.encode([f"{query} {cdp}"])
        _, I = index.search(query_vector, 2)
        texts = [doc_map[i] for i in I[0] if i < len(doc_map)]
        combined = " ".join(texts)
        comparison_data.append({"cdp": cdp, "text": combined[:500]})
    
    response = "## Platform Comparison\n\n" + "\n\n".join(
        f"### {item['cdp']}\n{item['text']}\n" for item in comparison_data
    )
    return {"cdp": "Comparison", "response": response}

# Add startup validation
@app.on_event("startup")
def validate_files():
    required_files = [
        "embeddings/cdp_faiss.index",
        "embeddings/doc_map.txt",
        *[f"data/{cdp}.txt" for cdp in CDP_DOCS.keys()]
    ]
    for fpath in required_files:
        if not os.path.exists(fpath):
            raise FileNotFoundError(f"Required file missing: {fpath}. Run scrapper.py and retriever.py first.")