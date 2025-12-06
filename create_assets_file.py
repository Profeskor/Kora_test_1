
import os

with open("/app/logo_base64.txt", "r") as f:
    base64_str = f.read().strip()

content = f'export const KORA_LOGO = "{base64_str}";\n'

with open("/app/frontend/src/constants/assets.ts", "w") as f:
    f.write(content)
