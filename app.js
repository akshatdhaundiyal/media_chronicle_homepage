/**
 * Media Chronicle — Interactive Homepage JavaScript
 * Features:
 *  - Pure Dart SingleLayerPerceptron SGD Simulator with live Canvas Loss Chart
 *  - YOLO Face Recognition & Age Variant Timeline Inspector
 *  - 2D Latent Vector Embeddings Canvas Map with Clusters & Trajectory Spline
 *  - Ollama VLM Fast-Load Bypass & Offline Benchmark Simulator
 *  - Copy to Clipboard & Interactive Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTabs();
  initQuickstartTabs();
  initCopyButtons();
  initHotspots();
  initSgdSimulator();
  initFaceAgeEngine();
  initEmbeddingsCanvas();
  initOfflineSimulator();
});

function initHotspots() {
  const hotspotYolo = document.querySelector('.hotspot-yolo');
  const hotspotMap = document.querySelector('.hotspot-map');
  const hotspotSgd = document.querySelector('.hotspot-sgd');

  function activateTab(tabId) {
    const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabBtn) tabBtn.click();
    const labSec = document.getElementById('interactive-lab');
    if (labSec) {
      labSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (hotspotYolo) hotspotYolo.addEventListener('click', () => activateTab('tab-faces'));
  if (hotspotMap) hotspotMap.addEventListener('click', () => activateTab('tab-embeddings'));
  if (hotspotSgd) hotspotSgd.addEventListener('click', () => activateTab('tab-neural'));
}

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   2. LAB TABS SYSTEM
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.lab-tab-btn');
  const tabPanels = document.querySelectorAll('.lab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');

        // Trigger redraw if canvas panel becomes visible
        if (targetId === 'tab-embeddings') {
          setTimeout(drawEmbeddingsMap, 50);
        }
      }
    });
  });
}

function initQuickstartTabs() {
  const qsTabs = document.querySelectorAll('.qs-tab');
  const qsContents = document.querySelectorAll('.qs-content');

  qsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-qs');

      qsTabs.forEach(t => t.classList.remove('active'));
      qsContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. CLIPBOARD COPY UTILITIES
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const targetSelector = button.getAttribute('data-copy-target');
      const targetElem = document.querySelector(targetSelector);
      if (!targetElem) return;

      try {
        await navigator.clipboard.writeText(targetElem.innerText.trim());
        const originalHtml = button.innerHTML;
        button.innerHTML = '<span class="copy-icon">✓</span> Copied!';
        button.style.borderColor = 'var(--neon-green)';
        button.style.color = 'var(--neon-green)';

        setTimeout(() => {
          button.innerHTML = originalHtml;
          button.style.borderColor = '';
          button.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
      }
    });
  });
}

/* ==========================================================================
   4. PURE DART SGD PERCEPTRON SIMULATOR & LOSS CANVAS
   ========================================================================== */
function initSgdSimulator() {
  const btnStart = document.getElementById('btn-start-training');
  const btnReset = document.getElementById('btn-reset-training');
  const termOutput = document.getElementById('sgd-terminal-output');
  const terminalBadge = document.getElementById('terminal-badge');
  const lrSlider = document.getElementById('sgd-lr');
  const lrDisplay = document.getElementById('sgd-lr-val');
  const epochSlider = document.getElementById('sgd-epochs');
  const epochDisplay = document.getElementById('sgd-epochs-val');

  const metricLoss = document.getElementById('metric-loss');
  const metricAcc = document.getElementById('metric-acc');
  const metricGrad = document.getElementById('metric-grad');

  const canvas = document.getElementById('lossChartCanvas');
  let lossHistory = [1.482];

  if (lrSlider && lrDisplay) {
    lrSlider.addEventListener('input', (e) => {
      lrDisplay.textContent = parseFloat(e.target.value).toFixed(3);
    });
  }

  if (epochSlider && epochDisplay) {
    epochSlider.addEventListener('input', (e) => {
      epochDisplay.textContent = `${e.target.value} epochs`;
    });
  }

  let isTraining = false;
  let animationId = null;

  drawLossChart(canvas, lossHistory);

  if (btnStart) {
    btnStart.addEventListener('click', () => {
      if (isTraining) return;
      isTraining = true;
      btnStart.disabled = true;
      btnStart.style.opacity = '0.6';
      terminalBadge.textContent = 'SGD TRAINING...';
      terminalBadge.classList.add('running');

      const lr = parseFloat(lrSlider.value);
      const totalEpochs = parseInt(epochSlider.value, 10);
      let currentEpoch = 1;
      let currentLoss = 1.4820;
      let currentAcc = 34.2;
      let currentGrad = 1.180;
      lossHistory = [currentLoss];

      appendTermLine(termOutput, `[SGD] Starting on-device retraining: ${totalEpochs} epochs, lr=${lr.toFixed(3)}, batch=16, classes=4`, 'info');

      function trainStep() {
        if (currentEpoch > totalEpochs) {
          isTraining = false;
          btnStart.disabled = false;
          btnStart.style.opacity = '1';
          terminalBadge.textContent = 'CONVERGED';
          terminalBadge.classList.remove('running');
          appendTermLine(termOutput, `[DONE] Model weights updated. Top-1 Accuracy: ${currentAcc.toFixed(1)}%, Final Loss: ${currentLoss.toFixed(4)}`, 'success');
          appendTermLine(termOutput, `[POSTGRES] Synced new face decision hyperplane to PostgreSQL local socket.`, 'info');
          return;
        }

        // Exponential decay towards minimum loss
        const decayFactor = 1 - (lr * 4.5);
        currentLoss = Math.max(0.038, currentLoss * decayFactor + (Math.random() * 0.015 - 0.007));
        currentAcc = Math.min(99.4, currentAcc + (100 - currentAcc) * (lr * 4.8) + (Math.random() * 1.5 - 0.7));
        currentGrad = Math.max(0.045, currentGrad * 0.92 + (Math.random() * 0.02 - 0.01));

        lossHistory.push(currentLoss);

        metricLoss.textContent = currentLoss.toFixed(4);
        metricAcc.textContent = `${currentAcc.toFixed(1)}%`;
        metricGrad.textContent = currentGrad.toFixed(3);

        const timeStr = new Date().toTimeString().split(' ')[0];
        const stepNum = currentEpoch * 16;
        appendTermLine(
          termOutput,
          `[${timeStr}] Epoch [${currentEpoch}/${totalEpochs}] Step [${stepNum}] | Loss: ${currentLoss.toFixed(4)} | Acc: ${(currentAcc/100).toFixed(3)} | GradNorm: ${currentGrad.toFixed(2)}`,
          currentEpoch % 5 === 0 ? 'highlight' : ''
        );

        drawLossChart(canvas, lossHistory);
        currentEpoch++;

        animationId = setTimeout(trainStep, 75);
      }

      trainStep();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      clearTimeout(animationId);
      isTraining = false;
      btnStart.disabled = false;
      btnStart.style.opacity = '1';
      terminalBadge.textContent = 'RESET';
      terminalBadge.classList.remove('running');

      metricLoss.textContent = '1.4820';
      metricAcc.textContent = '34.2%';
      metricGrad.textContent = '1.180';
      lossHistory = [1.482];

      termOutput.innerHTML = '';
      appendTermLine(termOutput, '[SYSTEM] SingleLayerPerceptron weights reset to Gaussian random distribution.', 'info');
      appendTermLine(termOutput, '[SYSTEM] Unidentified face labeling queue is ready.', 'dim');

      drawLossChart(canvas, lossHistory);
    });
  }
}

function appendTermLine(container, text, typeClass = '') {
  if (!container) return;
  const line = document.createElement('div');
  line.className = `term-line ${typeClass}`;
  line.textContent = text;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

function drawLossChart(canvas, data) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Background Gridlines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let y = 15; y < h; y += 25) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();

  if (data.length < 2) return;

  // Draw loss curve line
  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
  ctx.shadowBlur = 8;
  ctx.beginPath();

  const maxLoss = 1.6;
  const minLoss = 0.0;
  const stepX = w / (data.length - 1 || 1);

  data.forEach((val, i) => {
    const x = i * stepX;
    const norm = (val - minLoss) / (maxLoss - minLoss);
    const y = h - (norm * (h - 14) + 7);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
  ctx.shadowBlur = 0; // reset
}

/* ==========================================================================
   5. YOLO FACE RECOGNITION & AGE VARIANT ENGINE
   ========================================================================== */
function initFaceAgeEngine() {
  const agePills = document.querySelectorAll('.age-pill');
  const faceBoxes = document.querySelectorAll('.face-bbox');

  const faceIdVal = document.getElementById('face-id-val');
  const faceConfVal = document.getElementById('face-conf-val');
  const faceDistVal = document.getElementById('face-dist-val');
  const faceVariantVal = document.getElementById('face-variant-val');
  const faceConflictVal = document.getElementById('face-conflict-val');

  const ageData = {
    '7': {
      id: 'Maya Sharma',
      conf: '96.2%',
      dist: '0.0 (Anchor Base)',
      variant: 'Childhood Base',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '16': {
      id: 'Maya Sharma',
      conf: '91.8%',
      dist: '14.2 (Cosine Match)',
      variant: 'Adolescence',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '24': {
      id: 'Maya Sharma',
      conf: '94.7%',
      dist: '22.8 (Cosine Match)',
      variant: 'Young Adult',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '35': {
      id: 'Maya Sharma',
      conf: '89.4%',
      dist: '27.4 (>25.0 Cosine Dist)',
      variant: 'Mature Adult (Variant)',
      conflict: '⚡ Age Variant Confirmed',
      isConflict: true
    }
  };

  function selectStage(stageKey) {
    const info = ageData[stageKey];
    if (!info) return;

    // Update active pill
    agePills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-age') === stageKey);
    });

    // Update active bbox
    faceBoxes.forEach(box => {
      box.classList.toggle('active', box.getAttribute('data-stage') === stageKey);
    });

    // Update readout values
    faceIdVal.textContent = info.id;
    faceConfVal.textContent = info.conf;
    faceDistVal.textContent = info.dist;
    faceVariantVal.textContent = info.variant;
    faceConflictVal.textContent = info.conflict;

    if (info.isConflict) {
      faceConflictVal.style.background = 'rgba(244, 63, 94, 0.18)';
      faceConflictVal.style.color = '#FDA4AF';
      faceConflictVal.style.borderColor = 'rgba(244, 63, 94, 0.4)';
    } else {
      faceConflictVal.style.background = 'rgba(16, 185, 129, 0.15)';
      faceConflictVal.style.color = '#34D399';
      faceConflictVal.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }
  }

  agePills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectStage(pill.getAttribute('data-age'));
    });
  });

  faceBoxes.forEach(box => {
    box.addEventListener('click', () => {
      selectStage(box.getAttribute('data-stage'));
    });
  });
}

/* ==========================================================================
   6. 2D VECTOR EMBEDDINGS CLUSTER CANVAS MAP
   ========================================================================== */
let embeddingsPoints = [];

function initEmbeddingsCanvas() {
  const canvas = document.getElementById('embeddingsMapCanvas');
  const btnRecompute = document.getElementById('btn-recompute-tsne');
  const embTitle = document.getElementById('emb-title');
  const embCoords = document.getElementById('emb-coords');
  const embNotes = document.getElementById('emb-notes');

  generateEmbeddingsDataset();
  drawEmbeddingsMap();

  if (btnRecompute) {
    btnRecompute.addEventListener('click', () => {
      btnRecompute.innerHTML = '<span>⚡ Projecting t-SNE...</span>';
      setTimeout(() => {
        generateEmbeddingsDataset(true);
        drawEmbeddingsMap();
        btnRecompute.innerHTML = '<span>Re-project Vectors (t-SNE/PCA)</span>';
      }, 350);
    });
  }

  if (canvas) {
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      let closest = null;
      let minDist = 24; // detection radius

      embeddingsPoints.forEach(pt => {
        const d = Math.hypot(pt.x - mouseX, pt.y - mouseY);
        if (d < minDist) {
          minDist = d;
          closest = pt;
        }
      });

      drawEmbeddingsMap(closest);

      if (closest) {
        embTitle.textContent = `${closest.name} (${closest.cluster.toUpperCase()})`;
        embCoords.textContent = `Latent Coordinates: (D1: ${(closest.x/canvas.width).toFixed(3)}, D2: ${(closest.y/canvas.height).toFixed(3)})`;
        embNotes.textContent = closest.notes || 'Vector distance within normalized cosine threshold.';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      drawEmbeddingsMap(null);
    });
  }
}

function generateEmbeddingsDataset(jitter = false) {
  embeddingsPoints = [
    // Maya Sharma Chronological Cluster
    { x: 120, y: 160, name: 'Maya Sharma (Age 7)', cluster: 'maya', color: '#00F0FF', notes: 'Childhood anchor point (128-D vector).' },
    { x: 175, y: 195, name: 'Maya Sharma (Age 16)', cluster: 'maya', color: '#00F0FF', notes: 'Adolescent progression node (d=14.2).' },
    { x: 235, y: 220, name: 'Maya Sharma (Age 24)', cluster: 'maya', color: '#00F0FF', notes: 'Young adult profile match (d=22.8).' },
    { x: 300, y: 245, name: 'Maya Sharma (Age 35)', cluster: 'maya', color: '#00F0FF', notes: 'Mature adult age-variant node (d=27.4, linked).' },

    // Ben Carter Family Cluster
    { x: 420, y: 110, name: 'Ben Carter (Portrait)', cluster: 'ben', color: '#F43F5E', notes: 'Enrolled face cluster centroid.' },
    { x: 440, y: 135, name: 'Ben Carter (Outdoor)', cluster: 'ben', color: '#F43F5E', notes: 'High confidence cosine similarity 0.95.' },
    { x: 405, y: 145, name: 'Ben Carter (Smile)', cluster: 'ben', color: '#F43F5E', notes: 'Confidence score: 0.94.' },
    { x: 455, y: 105, name: 'Ben Carter (Low Light)', cluster: 'ben', color: '#F43F5E', notes: 'Confidence score: 0.91.' },

    // David Lee Co-worker Cluster
    { x: 480, y: 310, name: 'David Lee (Studio)', cluster: 'david', color: '#8B5CF6', notes: 'Office team album centroid.' },
    { x: 510, y: 290, name: 'David Lee (Conference)', cluster: 'david', color: '#8B5CF6', notes: 'Top-1 Softmax probability 97.4%.' },
    { x: 470, y: 340, name: 'David Lee (Casual)', cluster: 'david', color: '#8B5CF6', notes: 'Embedding similarity 0.92.' },

    // Unidentified Face Candidates
    { x: 210, y: 340, name: 'Candidate Face #104', cluster: 'unidentified', color: '#64748B', notes: 'Pending manual label assignment in UnidentifiedQueue.' },
    { x: 280, y: 120, name: 'Candidate Face #105', cluster: 'unidentified', color: '#64748B', notes: 'Low confidence (0.42) - awaiting retraining.' },
    { x: 370, y: 320, name: 'Candidate Face #106', cluster: 'unidentified', color: '#64748B', notes: 'Cluster gap: Candidate for new identity.' }
  ];

  if (jitter) {
    embeddingsPoints.forEach(pt => {
      pt.x += (Math.random() - 0.5) * 40;
      pt.y += (Math.random() - 0.5) * 40;
      pt.x = Math.max(40, Math.min(560, pt.x));
      pt.y = Math.max(40, Math.min(380, pt.y));
    });
  }
}

function drawEmbeddingsMap(hoveredPt = null) {
  const canvas = document.getElementById('embeddingsMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Draw Subtle Radar Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;

  for (let x = 0; x < w; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Draw Center Axis
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
  ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Draw Maya Chronological Spline Arc
  const mayaPoints = embeddingsPoints.filter(p => p.cluster === 'maya');
  if (mayaPoints.length >= 2) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.setLineDash([4, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    mayaPoints.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.restore();
  }

  // Draw Cluster Convex Hulls / Halos
  ['ben', 'david'].forEach(cName => {
    const pts = embeddingsPoints.filter(p => p.cluster === cName);
    if (pts.length > 0) {
      const avgX = pts.reduce((a, b) => a + b.x, 0) / pts.length;
      const avgY = pts.reduce((a, b) => a + b.y, 0) / pts.length;
      const color = cName === 'ben' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(139, 92, 246, 0.08)';
      const stroke = cName === 'ben' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(139, 92, 246, 0.25)';

      ctx.save();
      ctx.fillStyle = color;
      ctx.strokeStyle = stroke;
      ctx.beginPath();
      ctx.arc(avgX, avgY, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  });

  // Draw Nodes
  embeddingsPoints.forEach(pt => {
    const isHovered = hoveredPt === pt;
    ctx.save();

    if (isHovered) {
      ctx.shadowColor = pt.color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
      ctx.fill();

      // Outer radar ring
      ctx.strokeStyle = pt.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.shadowColor = pt.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });
}

/* ==========================================================================
   7. OLLAMA VLM FAST-LOAD BYPASS & BENCHMARK SIMULATOR
   ========================================================================== */
function initOfflineSimulator() {
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
      statusText.textContent = 'ONLINE (Daemon at localhost:11434)';
      statusText.className = 'status-online';
      appendTermLine(termOutput, '[STATUS CHANGE] Local Ollama VLM daemon is ONLINE (models: llava:13b).', 'success');
      benchDuration.textContent = '~8.4 seconds';
      benchDuration.className = 'highlight-cyan';
      benchStrategy.textContent = 'Sequential Ollama Multimodal Vision Queue';
    } else {
      statusText.textContent = 'OFFLINE (Simulated)';
      statusText.className = 'status-offline';
      appendTermLine(termOutput, '[STATUS CHANGE] Local Ollama VLM daemon is OFFLINE. Fast-load bypass armed.', 'warn');
      benchDuration.textContent = '~1.2 seconds';
      benchDuration.className = 'highlight-green';
      benchStrategy.textContent = 'On-Device Edge Heuristic Fallback';
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
