
export interface GenerateRequest {
  prompt: string, 
  negative_prompt: string, 
  num_images: number, 
  width: number, 
  height: number,
  guidance_scale: number,
  seed: number,
  num_inference_steps: number
}

export interface GeneratedResponse {
  "images": string[],
  "prompt": string,
  "time": number,
  "status": number,
}