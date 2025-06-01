import os
from PIL import Image

base_dir = '/Users/pratham/Programming/Hackathon/data/asl_alphabet_train'
output_images_dir = '/Users/pratham/Programming/Hackathon/data/flat_images/images'
output_labels_dir = '/Users/pratham/Programming/Hackathon/data/flat_images/labels'

os.makedirs(output_images_dir, exist_ok=True)
os.makedirs(output_labels_dir, exist_ok=True)

class_map = {chr(65+i): i for i in range(26)}

for folder in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder)
    if os.path.isdir(folder_path) and folder in class_map:
        class_id = class_map[folder]
        for filename in os.listdir(folder_path):
            if filename.lower().endswith('.jpg'):
                src = os.path.join(folder_path, filename)
                dst = os.path.join(output_images_dir, f"{folder}_{filename}")
                os.rename(src, dst)
                with Image.open(dst) as img:
                    w, h = img.size
                label_file = os.path.join(output_labels_dir, f"{folder}_{filename.replace('.jpg', '.txt')}")
                with open(label_file, 'w') as f:
                    f.write(f"{class_id} 0.5 0.5 1.0 1.0\n")

print("✅ Dataset labeled with full-image bounding boxes. Ready for YOLO training!")
