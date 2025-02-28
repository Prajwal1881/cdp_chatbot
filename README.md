# CDP Support Chatbot

A documentation-powered chatbot that answers "how-to" questions about Customer Data Platforms (CDPs):  
**Segment | mParticle | Lytics | Zeotap**. Uses semantic search and NLP to extract guidance from official documentation.


## Features

- 🔍 **Documentation Scraper** - Auto-crawls CDP documentation websites
- 🤖 **Semantic Search** - FAISS vector search + cross-encoder reranking
- ⚖️ **Smart Comparisons** - Context-aware platform comparisons
- 🛠️ **How-to Focus** - Specialized in task-oriented questions
- 🚀 **Streamlit Frontend** - User-friendly interface with examples
- 🔄 **Live Updates** - Rescrape docs to stay current with platform changes

## Installation

1. Clone repo:
```bash
git clone https://github.com/yourusername/cdp-chatbot.git
cd cdp-chatbot
Install dependencies:

bash
Copy
pip install -r requirements.txt
Dependencies
text
Copy
streamlit==1.28.0
fastapi==0.104.0
sentence-transformers==2.2.2
faiss-cpu==1.7.4
langchain==0.0.346
beautifulsoup4==4.12.2
uvicorn==0.23.2
transformers==4.34.0
Configuration
Environment Setup:

bash
Copy
mkdir -p data embeddings
Scrape Documentation:

bash
Copy
python scrapper.py
Generate Embeddings:

bash
Copy
python retriever.py
Usage
Start Backend:

bash
Copy
uvicorn main:app --reload --port 8000
Launch Chat Interface:

bash
Copy
streamlit run frontend.py
Ask questions in the web interface:

text
Copy
- How to set up identity resolution in mParticle?
- Compare user segmentation in Segment vs Lytics
- Steps to create a data pipeline in Zeotap

## Project Structure

cdp-chatbot/
├── data/               # Raw documentation texts
├── embeddings/         # FAISS index + document mappings
│
├── frontend.py         # Streamlit UI
├── main.py             # FastAPI backend + NLP logic
├── retriever.py        # Embedding generation
├── scrapper.py         # Documentation crawler
└── utils.py            # Text processing utilities

Key Components

1. Enhanced Scraper:
-  Crawls multiple documentation pages
-  Preserves content hierarchy (h1-h4 tags)
-  Limits to 50 pages/CDP to prevent over-scraping

2. Hybrid Search:
-  Initial FAISS vector search (speed)
-  Cross-encoder reranking (accuracy)
-  Chunk overlap for context preservation

3. Comparison Engine:
-  Detects comparison intent
-  Platform-specific context injection
-  Side-by-side feature display
