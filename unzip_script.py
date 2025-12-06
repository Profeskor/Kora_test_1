
import zipfile
import os

zip_path = "/app/Kora Integrated App.zip"
extract_path = "/app/kora_assets"

if not os.path.exists(zip_path):
    print(f"File not found: {zip_path}")
else:
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    print(f"Extracted to {extract_path}")
