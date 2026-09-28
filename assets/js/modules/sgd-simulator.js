/**
 * Pure Dart SingleLayerPerceptron SGD Simulator Module
 * Simulates on-device backpropagation, loss reduction, and canvas curve plotting
 */

export function initSgdSimulator() {
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
      if (terminalBadge) {
        terminalBadge.textContent = 'SGD TRAINING...';
        terminalBadge.classList.add('running');
      }

      const lr = parseFloat(lrSlider ? lrSlider.value : '0.01');
      const totalEpochs = parseInt(epochSlider ? epochSlider.value : '30', 10);
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
          if (terminalBadge) {
            terminalBadge.textContent = 'CONVERGED';
            terminalBadge.classList.remove('running');
          }
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

        if (metricLoss) metricLoss.textContent = currentLoss.toFixed(4);
        if (metricAcc) metricAcc.textContent = `${currentAcc.toFixed(1)}%`;
        if (metricGrad) metricGrad.textContent = currentGrad.toFixed(3);

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
      if (btnStart) {
        btnStart.disabled = false;
        btnStart.style.opacity = '1';
      }
      if (terminalBadge) {
        terminalBadge.textContent = 'RESET';
        terminalBadge.classList.remove('running');
      }

      if (metricLoss) metricLoss.textContent = '1.4820';
      if (metricAcc) metricAcc.textContent = '34.2%';
      if (metricGrad) metricGrad.textContent = '1.180';
      lossHistory = [1.482];

      if (termOutput) {
        termOutput.innerHTML = '';
        appendTermLine(termOutput, '[SYSTEM] SingleLayerPerceptron weights reset to Gaussian random distribution.', 'info');
        appendTermLine(termOutput, '[SYSTEM] Unidentified face labeling queue is ready.', 'dim');
      }

      drawLossChart(canvas, lossHistory);
    });
  }
}

export function appendTermLine(container, text, typeClass = '') {
  if (!container) return;
  const line = document.createElement('div');
  line.className = `term-line ${typeClass}`;
  line.textContent = text;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

export function drawLossChart(canvas, data) {
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
  ctx.shadowBlur = 0;
}
