import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
from pathlib import Path

CDP_DOCS = {
    "Segment": "https://segment.com/docs/",
    "mParticle": "https://docs.mparticle.com/",
    "Lytics": "https://docs.lytics.com/",
    "Zeotap": "https://docs.zeotap.com/"
}

SAVE_DIR = "data"
os.makedirs(SAVE_DIR, exist_ok=True)

def sanitize_filename(name):
    return re.sub(r'[<>:"/\\|?*]', '', name.replace(" ", "_"))

def scrape_docs(cdp_name, base_url):
    try:
        visited = set()
        to_visit = [base_url]
        all_content = []
        
        while to_visit and len(visited) < 50:  # Limit pages
            url = to_visit.pop(0)
            if url in visited:
                continue
                
            try:
                response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
                if response.status_code != 200:
                    continue
                    
                soup = BeautifulSoup(response.text, "html.parser")
                
                # Remove unnecessary elements
                for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
                    element.decompose()
                
                # Extract main content
                main_content = soup.find("main") or soup.find("article") or soup.body
                text = '\n'.join([p.get_text(strip=True) for p in main_content.find_all(['p', 'li', 'h1', 'h2', 'h3', 'h4'])])
                all_content.append(f"URL: {url}\n{text}")
                
                # Find new links
                for link in soup.find_all("a", href=True):
                    href = urljoin(url, link["href"])
                    if href.startswith(base_url) and href not in visited and not re.search(r"\.(pdf|zip|png|jpg)", href):
                        to_visit.append(href)
                
                visited.add(url)
                print(f"Scraped {url}")
                
            except Exception as e:
                print(f"Error scraping {url}: {e}")

        # Save with sanitized filename
        filename = sanitize_filename(cdp_name) + ".txt"
        with open(Path(SAVE_DIR) / filename, "w", encoding="utf-8") as f:
            f.write("\n\n".join(all_content))
            
        print(f"[+] {cdp_name} documentation saved ({len(all_content)} pages)")
        
    except Exception as e:
        print(f"Major error processing {cdp_name}: {e}")

if __name__ == "__main__":
    for cdp, url in CDP_DOCS.items():
        scrape_docs(cdp, url)