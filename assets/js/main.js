/**
 * Media Chronicle — Modular JavaScript Entry Point
 * Coordinates ES modules for navigation, ROI calculator, ML simulators, and canvas engines.
 */

import { initNavigation } from './modules/navigation.js';
import { initCalculator } from './modules/calculator.js';
import { initSgdSimulator } from './modules/sgd-simulator.js';
import { initFaceAgeEngine } from './modules/face-timeline.js';
import { initEmbeddingsCanvas } from './modules/embeddings-map.js';
import { initOfflineSimulator } from './modules/offline-simulator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Navigation, Modal & Accordion Interactions
  initNavigation();

  // 2. Interactive Lifetime Savings & ROI Calculator
  initCalculator();

  // 3. Drive Scanner & In-Place Ingestion Simulator
  initOfflineSimulator();

  // 4. YOLO Face & Multi-Age Biometric Engine
  initFaceAgeEngine();

  // 5. 2D Vector Embeddings Latent Map
  initEmbeddingsCanvas();

  // 6. Pure Dart SGD Simulator & Loss Convergence Canvas
  initSgdSimulator();
});
