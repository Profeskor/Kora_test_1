
import base64
import os

image_path = "/app/kora_assets/src/assets/8e3476fc29c802a2e8b95a923c5f6ee91e5f295d.png"

if os.path.exists(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        print(f"data:image/png;base64,{encoded_string}")
else:
    print("Image not found")
