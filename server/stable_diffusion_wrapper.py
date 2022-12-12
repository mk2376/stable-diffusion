from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
import torch

repo_id = "stabilityai/stable-diffusion-2-1-base"

class StableDiffusionWrapper:
    def __init__(self) -> None:
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print("--> Selected device:", self.device)

        pipe = None

        if self.device == "cpu":
            pipe = DiffusionPipeline.from_pretrained(repo_id)
        else:
            pipe = DiffusionPipeline.from_pretrained(
                repo_id,
                revision="fp16",
                torch_dtype=torch.float16
            )
            
        print("--> Done fetching pretrained")

        pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
        self.pipe = pipe.to(self.device)

        print("--> StableDiffusionWrapper initialized")

            
    def generate_images(self, prompt: str, negative_prompt: str, num_images: int, width: int, height: int, guidance_scale: float, seed: int, num_inference_steps: int): # guidance_scale = 7.5, seed = 0
        promptArray = [prompt] * num_images
        negative_promptArray = [negative_prompt] * num_images

        torch.manual_seed(seed)
        generator = torch.Generator(self.device).manual_seed(seed)

        images = self.pipe(prompt=promptArray, negative_prompt=negative_promptArray, guidance_scale=guidance_scale, width=width, height=height, num_inference_steps=num_inference_steps, generator=generator).images
        return images
