/**
 * Media Chronicle — Hero Interactive Particle & Drive Animation
 * Choreographed with GSAP Timeline.
 * 
 * Flow:
 * 1. Raw photo slides in from external drive (Left)
 * 2. Dissolves into flowing data particles that funnel into the Vault/Hard Drive icon
 * 3. Drive LED flashes: "INDEXED 100% OFFLINE • ZERO CLOUD UPLOADS"
 * 4. Natural language query types out in a minimalist search bar
 * 5. Particles stream out from the drive and magnetically reconstruct the photo in 32ms!
 */

export function initHeroAnimation() {
  const stage = document.getElementById('hero-animation-stage');
  if (!stage || typeof gsap === 'undefined') return;

  const rawCard = document.getElementById('anim-raw-card');
  const resolvedCard = document.getElementById('anim-resolved-card');
  const hddIcon = document.getElementById('anim-hdd-vault');
  const queryBar = document.getElementById('anim-query-bar');
  const queryText = document.getElementById('anim-query-text');
  const statusBadge = document.getElementById('anim-status-badge');
  const canvas = document.getElementById('anim-particle-canvas');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Resize canvas to match display size
  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle System
  const particles = [];
  const particleCount = 65;

  class Particle {
    constructor() {
      this.reset(0, 0, 0, 0);
      this.active = false;
    }

    reset(startX, startY, targetX, targetY, delay = 0) {
      this.startX = startX + (Math.random() - 0.5) * 60;
      this.startY = startY + (Math.random() - 0.5) * 60;
      this.x = this.startX;
      this.y = this.startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.controlX = (this.startX + targetX) / 2 + (Math.random() - 0.5) * 120;
      this.controlY = Math.min(this.startY, targetY) - 40 - Math.random() * 60;
      this.progress = 0;
      this.speed = 0.015 + Math.random() * 0.02;
      this.size = 2 + Math.random() * 2.5;
      this.alpha = 0;
      this.delay = delay;
      this.active = true;
      this.color = Math.random() > 0.3 ? '#111111' : '#10B981'; // Obsidian or Emerald
    }

    update() {
      if (!this.active) return;
      if (this.delay > 0) {
        this.delay -= 1;
        return;
      }

      this.progress += this.speed;
      if (this.progress < 0.2) {
        this.alpha = this.progress * 5;
      } else if (this.progress > 0.8) {
        this.alpha = (1 - this.progress) * 5;
      } else {
        this.alpha = 0.9;
      }

      // Quadratic bezier curve interpolation
      const t = Math.min(Math.max(this.progress, 0), 1);
      const invT = 1 - t;
      this.x = invT * invT * this.startX + 2 * invT * t * this.controlX + t * t * this.targetX;
      this.y = invT * invT * this.startY + 2 * invT * t * this.controlY + t * t * this.targetY;

      if (this.progress >= 1) {
        this.active = false;
      }
    }

    draw(ctx) {
      if (!this.active || this.delay > 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function renderParticles() {
    const rect = stage.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    let hasActive = false;
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
      if (p.active) hasActive = true;
    });

    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  function triggerParticleWave(fromEl, toEl) {
    if (!fromEl || !toEl) return;
    const stageRect = stage.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const startX = fromRect.left + fromRect.width / 2 - stageRect.left;
    const startY = fromRect.top + fromRect.height / 2 - stageRect.top;
    const targetX = toRect.left + toRect.width / 2 - stageRect.left;
    const targetY = toRect.top + toRect.height / 2 - stageRect.top;

    particles.forEach((p, idx) => {
      p.reset(startX, startY, targetX, targetY, idx * 1.5);
    });
  }

  // Master GSAP Timeline
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2.5,
    defaults: { ease: 'power2.out' }
  });

  const queryStringToType = "campfire by lake with dad 2014";

  // Initial State Reset
  tl.set([rawCard, resolvedCard], { opacity: 0, scale: 0.95, y: 15 });
  tl.set(rawCard, { x: -40, opacity: 0 });
  tl.set(resolvedCard, { x: 30, opacity: 0 });
  tl.set(queryBar, { opacity: 0, y: -10 });
  tl.set(statusBadge, { textContent: 'READY // DRIVE D:\\ CONNECTED' });

  // Act 1: Raw Photo Slides In From External Drive
  tl.addLabel('act1-ingest')
    .to(rawCard, {
      duration: 0.9,
      opacity: 1,
      x: 0,
      scale: 1,
      y: 0,
      ease: 'back.out(1.2)'
    })
    .call(() => {
      if (statusBadge) statusBadge.textContent = 'SCANNING D:\\PHOTOS\\CAMPING\\...';
    }, null, '+=0.2');

  // Act 2: Dissolves into particles funneling into hard drive
  tl.addLabel('act2-dissolve', '+=0.6')
    .call(() => {
      triggerParticleWave(rawCard, hddIcon);
      if (statusBadge) statusBadge.textContent = 'INDEXING EMBEDDINGS (100% OFFLINE)...';
    })
    .to(rawCard, {
      duration: 0.7,
      opacity: 0,
      scale: 0.92,
      ease: 'power2.in'
    }, 'act2-dissolve')
    .to(hddIcon, {
      duration: 0.3,
      scale: 1.08,
      boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)',
      borderColor: '#10B981',
      yoyo: true,
      repeat: 1
    }, 'act2-dissolve+=0.5')
    .call(() => {
      if (statusBadge) statusBadge.textContent = 'INDEX COMPLETE • ZERO CLOUD BYTES';
    }, null, '+=0.2');

  // Act 3: Natural Language Query Typing
  tl.addLabel('act3-query', '+=0.4')
    .to(queryBar, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      scale: 1
    })
    .call(() => {
      if (queryText) queryText.textContent = '';
    });

  // Type characters sequentially
  for (let i = 0; i <= queryStringToType.length; i++) {
    tl.to({}, {
      duration: 0.045,
      onComplete: () => {
        if (queryText) {
          queryText.textContent = queryStringToType.substring(0, i);
        }
      }
    });
  }

  // Act 4: Execute Query & Reconstitute Photo
  tl.addLabel('act4-retrieve', '+=0.4')
    .call(() => {
      triggerParticleWave(hddIcon, resolvedCard);
      if (statusBadge) statusBadge.textContent = 'QUERY HIT: 32MS (LOCAL SQLITE)';
    })
    .to(hddIcon, {
      duration: 0.25,
      scale: 1.05,
      borderColor: '#111111',
      yoyo: true,
      repeat: 1
    }, 'act4-retrieve')
    .to(resolvedCard, {
      duration: 0.8,
      opacity: 1,
      x: 0,
      scale: 1,
      y: 0,
      ease: 'back.out(1.15)'
    }, 'act4-retrieve+=0.3')
    .call(() => {
      if (statusBadge) statusBadge.textContent = 'PHOTO RESOLVED // 0 BYTES TRANSMITTED';
    }, null, '+=0.3');

  // Hold view for appreciation
  tl.to({}, { duration: 3.2 });

  // Fade out resolved elements to seamlessly loop
  tl.to([resolvedCard, queryBar], {
    duration: 0.6,
    opacity: 0,
    y: 10,
    ease: 'power2.in'
  });

  // Interactive controls: hover to pause/play
  stage.addEventListener('mouseenter', () => tl.pause());
  stage.addEventListener('mouseleave', () => tl.play());
}
