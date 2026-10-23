/**
 * Media Chronicle — Modular JavaScript Entry Point
 * Coordinates ES modules for navigation, hero animation, ROI calculator, and offline gallery search.
 */

import { initNavigation } from './modules/navigation.js';
import { initScrollytelling } from './modules/scrollytelling.js';
import { initCalculator } from './modules/calculator.js';
import { initDodoPayments } from './modules/dodo-payments.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Navigation, Mobile Menu, Modals & FAQ Accordions
  initNavigation();

  // 2. Cinematic Scroll-Scrubbed Video / Canvas Showcase
  initScrollytelling();

  // 3. Interactive Lifetime Savings & ROI Calculator
  initCalculator();

  // 4. Dodo Payments Checkout Integration (Modal Email Capture & Secure Redirect)
  initDodoPayments();
});

