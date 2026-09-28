/**
 * Ollama VLM Fast-Load Bypass & Benchmark Simulator Module
 */

import { appendTermLine } from './sgd-simulator.js';

export function initOfflineSimulator() {
  const toggle = document.getElementById('ollama-toggle');
  const statusText = document.getElementById('ollama-status-text');
  const btnSimulate = document.getElementById('btn-simulate-import');
  const termOutput = document.getElementById('offline-terminal-output');
  const benchDuration = document.getElementById('bench-duration');
  const benchStrategy = document.getElementById('bench-strategy');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isOnline = toggle.checked;
    if (isOnline) {
      if (statusText) {
        statusText.textContent = 'ONLINE (Daemon at localhost:11434)';
        statusText.className = 'status-online';
      }
      appendTermLine(termOutput, '[STATUS CHANGE] Local Ollama VLM daemon is ONLINE (models: llava:13b).', 'success');
      if (benchDuration) {
        benchDuration.textContent = '~8.4 seconds';
        benchDuration.className = 'highlight-cyan';
      }
      if (benchStrategy) {
        benchStrategy.textContent = 'Sequential Ollama Multimodal Vision Queue';
      }
    } else {
      if (statusText) {
        statusText.textContent = 'OFFLINE (Simulated)';
        statusText.className = 'status-offline';
      }
      appendTermLine(termOutput, '[STATUS CHANGE] Local Ollama VLM daemon is OFFLINE. Fast-load bypass armed.', 'warn');
      if (benchDuration) {
        benchDuration.textContent = '~1.2 seconds';
        benchDuration.className = 'highlight-green';
      }
      if (benchStrategy) {
        benchStrategy.textContent = 'On-Device Edge Heuristic Fallback';
      }
    }
  });

  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      btnSimulate.disabled = true;
      btnSimulate.style.opacity = '0.6';
      const isOnline = toggle.checked;

      appendTermLine(termOutput, '----------------------------------------', 'dim');
      appendTermLine(termOutput, `[IMPORT] Batch of 24 raw JPEG/PNG images selected from local disk.`, 'info');
      appendTermLine(termOutput, `[DEDUPE] Running SHA-256 cryptographic hash checks against PostgreSQL...`, 'info');
      appendTermLine(termOutput, `[DEDUPE] 24 unique items verified, 0 duplicates.`, 'success');

      if (isOnline) {
        appendTermLine(termOutput, `[VLM] Dispatched 24 images to Ollama vision worker...`, 'info');
        let processed = 0;
        const interval = setInterval(() => {
          processed += 4;
          appendTermLine(termOutput, `[VLM] Inferred tags for batch slice ${processed}/24: ("mountain", "portrait", "golden_hour")`, 'info');
          if (processed >= 24) {
            clearInterval(interval);
            appendTermLine(termOutput, `[COMPLETED] 24 images imported in 8.42s with multimodal descriptions.`, 'success');
            btnSimulate.disabled = false;
            btnSimulate.style.opacity = '1';
          }
        }, 350);
      } else {
        setTimeout(() => {
          appendTermLine(termOutput, `[PROBE] Connection to http://localhost:11434 refused in 38ms.`, 'warn');
          appendTermLine(termOutput, `[BYPASS] Fast-load bypass active: skipping 90s network wait!`, 'highlight');
          appendTermLine(termOutput, `[FALLBACK] Generated on-device heuristic visual tags & YOLO face boxes.`, 'info');
          appendTermLine(termOutput, `[COMPLETED] 24 images imported in 1.18s (zero lag).`, 'success');
          btnSimulate.disabled = false;
          btnSimulate.style.opacity = '1';
        }, 600);
      }
    });
  }
}
