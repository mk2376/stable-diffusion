import { persistentMap } from '@nanostores/persistent';
import { atom, map } from 'nanostores';
import { faker } from '@faker-js/faker';
import type { GenerateRequest, GeneratedResponse } from './interface';

// serverReachable

export const serverReachableStore = atom(false);

// Request

const generateRequestInit: GenerateRequest = {
  prompt: randomPrompt(),
  negative_prompt: "",
  num_images: 1,
  width: 512, 
  height: 512,
  guidance_scale: 7.5,
  seed: randomSeed(),
  num_inference_steps: 20,
}

export const generatedRequestStore = persistentMap<GenerateRequest>('generate_request', generateRequestInit, {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false,
})

export function generatedRequestStoreReset() {
  generateRequestInit.prompt = randomPrompt();
  generateRequestInit.seed = randomSeed();
  generatedRequestStore.set(generateRequestInit);
}

// Response

const generatedResponseInit: GeneratedResponse = {
  "images": [],
  "prompt": "",
  "time": 0,
  "status": 0,
}

export const generatedResponseStore = map<GeneratedResponse>(generatedResponseInit);

export function generatedResponseStoreReset() {
  generatedResponseStore.set(generatedResponseInit)
}

// Loading

export const generateLoadingStore = atom(false);

// Loading

export const generateLogoIconStore = atom(true);

// Helpers

function randomPrompt() {
  return faker.lorem.words(10); // words()
}

function randomSeed() {
  return Math.floor(Math.random() * 999999999)
}