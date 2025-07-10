import requests
from bs4 import BeautifulSoup
import os

# Function to search Google Images and extract thumbnail URLs
def search_images(query):
    url = f"https://www.google.com/search?tbm=isch&q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    image_tags = soup.find_all("img")
    thumbnails = [img["src"] for img in image_tags if img.get("src")]
    return thumbnails

# Function to download and save full-size image
def save_image(url, folder):
    response = requests.get(url)
    filename = os.path.join(folder, url.split("/")[-1])
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Image saved as {filename}")

# Example usage
query = "cats"
thumbnails = search_images(query)

# Display thumbnails in your GUI and allow the user to click on one
selected_thumbnail = thumbnails[0]  # Assuming the user selects the first thumbnail

# Simulate "save" action
save_folder = "images"
os.makedirs(save_folder, exist_ok=True)
save_image(selected_thumbnail, save_folder)
