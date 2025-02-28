from langchain.text_splitter import RecursiveCharacterTextSplitter
from transformers import pipeline

class TextProcessor:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=75,
            separators=["\n## ", "\n### ", "\n\n", "\n", ". ", "? "]
        )
        self.classifier = pipeline(
            "text-classification",
            model="facebook/bart-large-mnli",
            top_k=1
        )

    def chunk_text(self, text):
        return self.text_splitter.split_text(text)

    def is_relevant_question(self, query):
        labels = ["how-to question about CDP platforms", "irrelevant"]
        result = self.classifier(query, candidate_labels=labels)
        return result[0]['label'] == "how-to question about CDP platforms"