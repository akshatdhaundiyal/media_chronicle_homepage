/**
 * 2D Vector Embeddings Latent Map Canvas Module
 * Projects face embedding vectors to 2D with cluster halos, trajectory splines, and hover tooltips
 */

let embeddingsPoints = [];

export function initEmbeddingsCanvas() {
  const canvas = document.getElementById('embeddingsMapCanvas');
  const btnRecompute = document.getElementById('btn-recompute-tsne');
  const embTitle = document.getElementById('emb-title');
  const embCoords = document.getElementById('emb-coords');
  const embNotes = document.getElementById('emb-notes');

  generateEmbeddingsDataset();
  drawEmbeddingsMap();

  window.addEventListener('lab-tab-changed', (e) => {
    if (e.detail && e.detail.tabId === 'tab-embeddings') {
      setTimeout(drawEmbeddingsMap, 50);
    }
  });

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

      if (closest && embTitle && embCoords && embNotes) {
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

export function drawEmbeddingsMap(hoveredPt = null) {
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
