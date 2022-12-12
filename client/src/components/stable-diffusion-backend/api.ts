import type { GenerateRequest } from "./interface"

export async function self(serverURL: string) {
  return await fetch(serverURL+"/self").then((response) => {
    return response.status === 200
  }).catch(() => {
    return false
  })
}

export async function generate(serverURL: string, request: GenerateRequest) {
  const queryStartTime = new Date()

  const requestInit: RequestInit = {
    method: "POST",
    body: JSON.stringify(request)
  }

  const response = await fetch(serverURL+"/generate", requestInit).then((response) => {
    return response
  }).catch((err) => {
    throw Error(err);
  })

  const responseJson = await response.json()
  const queryEndTime = new Date()
  const queryTime = queryEndTime.getSeconds() - queryStartTime.getSeconds()

  const generated = {
    "images": responseJson["generated_images"],
    "time": queryTime,
    "status": response.status,
  }

  return generated
}
