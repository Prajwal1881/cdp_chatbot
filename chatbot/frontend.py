import streamlit as st
import requests
from time import sleep

API_URL = "http://localhost:8000/query/"

st.set_page_config(page_title="CDP Assistant", page_icon="🤖")
st.title("CDP Support Chatbot")
st.markdown("""
Ask how-to questions about:
- Segment
- mParticle  
- Lytics
- Zeotap

Examples:
- How to create a segment in Lytics?
- Compare user tracking in Segment vs mParticle
""")

query = st.text_input("Your question:", placeholder="Type your question here...")

if st.button("Get Answer") or query:
    if query:
        with st.spinner("🔍 Searching documentation..."):
            try:
                response = requests.post(API_URL, json={"query": query}, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    
                    if data["cdp"] == "Comparison":
                        st.subheader("Platform Comparison")
                        st.markdown(data["response"], unsafe_allow_html=True)
                    else:
                        st.subheader(f"{data['cdp']} Guide")
                        st.markdown(f"```\n{data['response']}\n```")
                    
                    st.success("✅ Answer generated from official documentation")
                    
                else:
                    st.error("⚠️ Failed to retrieve answer. Please try again.")
            except requests.exceptions.Timeout:
                st.error("⌛ Request timed out. Please try a simpler query.")
            except Exception as e:
                st.error(f"❌ Error: {str(e)}")
    else:
        st.warning("Please enter a question")