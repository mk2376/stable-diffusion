import argparse
import base64
import os
from pathlib import Path
from io import BytesIO
import time

from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
from stable_diffusion_wrapper import StableDiffusionWrapper

DEFAULT_IMG_OUTPUT_DIR = 'generations'
MAX_FILE_NAME_LEN = 255 # Unix max filename length

app = Flask(__name__)
CORS(app)
print("--> Starting the image generation server. This will take some minutes.")

stable_diff_model = None

parser = argparse.ArgumentParser(description = "Stable Diffusion server")
parser.add_argument("--port", type=int, default=8000, help = "backend port")
parser.add_argument("--save_to_disk", type = bool, default = False, help = "Save generated images to disk")
parser.add_argument("--img_format", type = str.lower, default = "jpeg", help = "Generated images format", choices=['jpeg', 'png'])
parser.add_argument("--output_dir", type = str, default = DEFAULT_IMG_OUTPUT_DIR, help = "Directory for generated images")
args = parser.parse_args()

@app.route("/generate", methods=["POST"])
@cross_origin()
def generate():
    json_data = request.get_json(force=True)
    
    prompt = str(json_data["prompt"])
    negative_prompt = str(json_data["negative_prompt"])
    num_images = int(json_data["num_images"])
    width = int(json_data["width"])
    height = int(json_data["height"])
    guidance_scale = float(json_data["guidance_scale"])
    seed = int(json_data["seed"])
    num_inference_steps = int(json_data["num_inference_steps"])

    print(f'--> Started generation of "{prompt}"')

    generated_imgs = stable_diff_model.generate_images(prompt, negative_prompt, num_images, width, height, guidance_scale, seed, num_inference_steps)

    generated_images_encoded = []
    
    if args.save_to_disk:
        dir_name = os.path.join(args.output_dir,f"{time.strftime('%Y-%m-%d_%H-%M-%S')}_{prompt}")[:MAX_FILE_NAME_LEN]
        Path(dir_name).mkdir(parents=True, exist_ok=True)
    
    for idx, img in enumerate(generated_imgs):
        if args.save_to_disk: 
          img.save(os.path.join(dir_name, f'{idx}.{args.img_format}'), format=args.img_format)

        # encode the image to base64
        buffered = BytesIO()
        img.save(buffered, format=args.img_format)
        img_encoded = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # prepend the encoding header
        img_encoded_with_format = "data:image/" + args.img_format + ";base64," + img_encoded

        generated_images_encoded.append(img_encoded_with_format)

    print(f'Created {num_images} images from text prompt "{prompt}"')
    
    response = {
        'generated_images': generated_images_encoded,
        'prompt': prompt+" "+negative_prompt,
    }

    return jsonify(response)


@app.route("/self", methods=["GET"])
@cross_origin()
def self():
    return jsonify(success=True)


with app.app_context():
    stable_diff_model = StableDiffusionWrapper()
    print("--> Image generation server is up and running!")

if __name__ == "__main__":
    host = "0.0.0.0"
    port = args.port

    app.run(host, port, debug=False) 
    #serve(app)