from pdf2image import convert_from_path
from PIL import Image
import sys
import os

def convert_doc_to_image(doc_path, output_folder):
    try:
        # Convert DOC to PDF (if needed) and then to images
        images = convert_from_path(doc_path)
        for i, image in enumerate(images):
            image.save(os.path.join(output_folder, f'page_{i + 1}.png'), 'PNG')
        return True
    except Exception as e:
        print(f"Error converting {doc_path}: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_doc_to_image.py <doc_path> <output_folder>")
        sys.exit(1)

    doc_path = sys.argv[1]
    output_folder = sys.argv[2]

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    if convert_doc_to_image(doc_path, output_folder):
        print("Conversion successful!")
    else:
        print("Conversion failed.")