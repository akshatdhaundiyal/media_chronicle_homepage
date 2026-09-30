/**
 * Media Chronicle — Modular JavaScript Entry Point
 * Coordinates ES modules for navigation, ROI calculator, drive scanner, and instant offline gallery search.
 */

import { initNavigation } from './modules/navigation.js';
import { initCalculator } from './modules/calculator.js';
import { initOfflineSimulator } from './modules/offline-simulator.js';
import { initGalleryDemo } from './modules/gallery-demo.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Navigation, Modal & Accordion Interactions
  initNavigation();

  // 2. Interactive Lifetime Savings & ROI Calculator
  initCalculator();

  // 3. Drive Scanner & In-Place Ingestion Simulator
  initOfflineSimulator();

  // 4. Instant Search & Offline Gallery Demo
  initGalleryDemo();
});
