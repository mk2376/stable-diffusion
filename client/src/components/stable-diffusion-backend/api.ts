import type { GeneratedResponse, GenerateRequest } from "./interface"
import { generateLoadingStore, generateLogoIconStore } from "./store"

const generateLogoIconPrompt = "Clean, sharp, vectorized mon, japanese emblem. Company logo, icon, trending, modern and minimalist.";

export async function self(serverURL: string) {
  return await fetch(serverURL+"/self").then((response) => {
    return response.status === 200
  }).catch(() => {
    return false
  })
}

export async function generate(serverURL: string, request: GenerateRequest) {
  const queryStartTime = new Date()
  generateLoadingStore.set(true);

  const finalRequest:GenerateRequest = {...request};

  if (generateLogoIconStore.get()) {
    finalRequest.prompt += ". " + generateLogoIconPrompt;
  }

  const requestInit: RequestInit = {
    method: "POST",
    body: JSON.stringify(finalRequest)
  }

  const response = await fetch(serverURL+"/generate", requestInit).then((response) => {
    return response
  }).catch((err) => {
    throw Error(err);
  })

  const responseJson = await response.json()
  const queryEndTime = new Date()
  const queryTime = queryEndTime.getSeconds() - queryStartTime.getSeconds()

  const generated: GeneratedResponse = {
    "images": responseJson["generated_images"],
    "prompt": responseJson["prompt"],
    "time": queryTime,
    "status": response.status,
  }

  generateLoadingStore.set(false);

  return generated
}
