/**
 * Media Chronicle — Modular JavaScript Entry Point
 * Coordinates ES modules for navigation, ML simulators, and canvas engines.
 */

import { initNavigation } from './modules/navigation.js';
import { initSgdSimulator } from './modules/sgd-simulator.js';
import { initFaceAgeEngine } from './modules/face-timeline.js';
import { initEmbeddingsCanvas } from './modules/embeddings-map.js';
import { initOfflineSimulator } from './modules/offline-simulator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Navigation & Interactions
  initNavigation();

  // 2. Pure Dart SGD Simulator & Loss Canvas
  initSgdSimulator();

  // 3. YOLO Face & Age Variant Biometrics
  initFaceAgeEngine();

  // 4. 2D Vector Embeddings Latent Map
  initEmbeddingsCanvas();

  // 5. Ollama VLM Fast-Load Offline Bypass Simulator
  initOfflineSimulator();
});
