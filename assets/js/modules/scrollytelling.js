/**
 * Media Chronicle — Outpost-Grade Scrollytelling Engine
 * Inspired by Outpost 01 (https://outpost.dayemadnan.com/)
 * 
 * Features:
 * - Scroll-scrubbed video engine with ScrollTrigger
 * - High-res fallback canvas simulation
 * - Outpost alternating frosted editorial panel transitions
 * - Ambient warm analog tape & acoustic audio engine (Web Audio API procedural synthesis)
 */

export function initScrollytelling() {
  const track = document.getElementById('scrolly-scroll-track');
  const stage = document.getElementById('scrolly-pinned-stage');
  const video = document.getElementById('scrolly-video');
  const canvas = document.getElementById('scrolly-fallback-canvas');
  const scrubBar = document.getElementById('scrolly-scrub-bar');
  const cards = document.querySelectorAll('.narrative-card');
  const musicBtn = document.getElementById('ow-music-btn');
  const soundHint = document.getElementById('ow-soundhint');
  const bottomFeather = document.getElementById('scrolly-bottom-feather');

  if (!track || !stage) return;

  let hasVideo = false;
  let videoDuration = 8;
  let targetVideoTime = 0;
  let isSeeking = false;

  // Non-blocking seek throttler to prevent CDN request cancellation storms
  function seekVideoFrame() {
    if (!video || !hasVideo) return;
    const dur = (video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : videoDuration;
    const clampedTarget = Math.max(0, Math.min(dur, targetVideoTime));

    if (!video.seeking && Math.abs(video.currentTime - clampedTarget) > 0.02) {
      isSeeking = true;
      try {
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(clampedTarget);
        } else {
          video.currentTime = clampedTarget;
        }
      } catch (err) {
        video.currentTime = clampedTarget;
      }
    }
  }

  // 1. Video Scrub Binding
  if (video) {
    video.muted = true;
    video.defaultMuted = true;

    const onVideoReady = () => {
      hasVideo = true;
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        videoDuration = video.duration;
      }
      if (canvas) canvas.style.display = 'none';
      video.style.display = 'block';
      seekVideoFrame();
    };

    if (video.readyState >= 1) {
      onVideoReady();
    }
    video.addEventListener('loadedmetadata', onVideoReady);
    video.addEventListener('loadeddata', onVideoReady);
    video.addEventListener('canplay', onVideoReady);
    video.addEventListener('canplaythrough', onVideoReady);

    // As soon as Cloudflare finishes returning the previous byte range, seek to next target
    video.addEventListener('seeked', () => {
      isSeeking = false;
      seekVideoFrame();
    });

    video.addEventListener('error', () => {
      hasVideo = false;
      if (canvas) canvas.style.display = 'block';
      if (video) video.style.display = 'none';
      setupCanvasFallback();
    });

    // Warm up the hardware decoder on first user gesture/touch/scroll
    const unlockDecoder = () => {
      if (video.paused) {
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            video.pause();
            seekVideoFrame();
          }).catch(() => {});
        }
      }
    };
    window.addEventListener('touchstart', unlockDecoder, { once: true, passive: true });
    window.addEventListener('scroll', unlockDecoder, { once: true, passive: true });
    window.addEventListener('click', unlockDecoder, { once: true, passive: true });
    window.addEventListener('wheel', unlockDecoder, { once: true, passive: true });

    // Smooth rAF render loop
    let rafScrubId = null;
    function scrubRenderLoop() {
      seekVideoFrame();
      rafScrubId = requestAnimationFrame(scrubRenderLoop);
    }
    requestAnimationFrame(scrubRenderLoop);
  }

  // 2. High-Definition Fallback Canvas Simulation
  let canvasCtx = null;
  const img1 = new Image();
  const img2 = new Image();
  const img3 = new Image();
  let loadedCount = 0;

  function setupCanvasFallback() {
    if (!canvas) return;
    canvasCtx = canvas.getContext('2d');

    img1.src = 'assets/images/hero_showcase.jpg';
    img2.src = 'assets/images/story_memories.jpg';
    img3.src = 'assets/images/face_age_progression.jpg';

    const onImg = () => {
      loadedCount++;
      renderFrame(0);
    };
    img1.onload = onImg;
    img2.onload = onImg;
    img3.onload = onImg;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      if (canvasCtx) {
        canvasCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      }
      renderFrame(currentProgress);
    }
    resize();
    window.addEventListener('resize', resize);
  }

  let currentProgress = 0;

  function renderFrame(p) {
    currentProgress = p;
    if (!canvas || !canvasCtx) return;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    if (w === 0 || h === 0) return;

    canvasCtx.clearRect(0, 0, w, h);

    // Warm Kodachrome analog background gradient
    const bgGrad = canvasCtx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#191512');
    bgGrad.addColorStop(0.5, '#0E0F12');
    bgGrad.addColorStop(1, '#1E1813');
    canvasCtx.fillStyle = bgGrad;
    canvasCtx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Atmospheric golden-hour sunbeam glow
    const sunbeamX = cx + (p - 0.5) * 120;
    const sunbeamY = cy - 40;
    const glowRadius = 260 + p * 180;
    const sunbeam = canvasCtx.createRadialGradient(sunbeamX, sunbeamY, 30, sunbeamX, sunbeamY, glowRadius);
    sunbeam.addColorStop(0, `rgba(224, 142, 69, ${0.28 + (1 - Math.abs(p - 0.5) * 2) * 0.22})`);
    sunbeam.addColorStop(0.5, `rgba(16, 185, 129, ${p > 0.35 ? 0.16 : 0.04})`);
    sunbeam.addColorStop(1, 'transparent');
    canvasCtx.fillStyle = sunbeam;
    canvasCtx.beginPath();
    canvasCtx.arc(sunbeamX, sunbeamY, glowRadius, 0, Math.PI * 2);
    canvasCtx.fill();

    // Brushed Aluminum Drive Vault (Act 1 -> Act 3 camera dolly pull-back simulation)
    // Scale shrinks gently from 1.25 (macro) to 0.75 (wide archival view)
    const driveScale = 1.2 - p * 0.45;
    const driveW = Math.min(280, w * 0.4) * driveScale;
    const driveH = Math.min(180, h * 0.28) * driveScale;
    const driveX = cx - driveW / 2;
    const driveY = cy - driveH / 2 + (p * 40);

    // Soft feathered drop shadow
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    canvasCtx.beginPath();
    canvasCtx.roundRect(driveX - 8, driveY + 22, driveW + 16, driveH + 12, 20);
    canvasCtx.fill();

    // Solid Aluminum Enclosure
    const driveGrad = canvasCtx.createLinearGradient(driveX, driveY, driveX + driveW, driveY + driveH);
    driveGrad.addColorStop(0, '#32343C');
    driveGrad.addColorStop(0.5, '#22242B');
    driveGrad.addColorStop(1, '#16171B');
    canvasCtx.fillStyle = driveGrad;
    canvasCtx.beginPath();
    canvasCtx.roundRect(driveX, driveY, driveW, driveH, 16);
    canvasCtx.fill();
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    canvasCtx.lineWidth = 1;
    canvasCtx.stroke();

    // Status LED
    const ledX = driveX + driveW - 24 * driveScale;
    const ledY = driveY + 24 * driveScale;
    canvasCtx.fillStyle = p > 0.2 ? '#10B981' : '#6B7280';
    canvasCtx.beginPath();
    canvasCtx.arc(ledX, ledY, 3.5 * driveScale, 0, Math.PI * 2);
    canvasCtx.fill();

    // Drive Engraving
    canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    canvasCtx.font = `600 ${Math.max(9, 10 * driveScale)}px JetBrains Mono, monospace`;
    canvasCtx.fillText('MEDIA CHRONICLE // AIR-GAPPED VAULT', driveX + 22 * driveScale, driveY + 28 * driveScale);

    // Blooming 35mm Kodachrome Memory Slides
    if (loadedCount >= 1 && p > 0.25) {
      // Slide 1 (Left)
      const a1 = Math.min(1, (p - 0.25) * 3);
      canvasCtx.save();
      canvasCtx.globalAlpha = a1;
      const s1W = 160 * driveScale;
      const s1H = 110 * driveScale;
      const s1X = cx - driveW * 0.85 - (p * 60);
      const s1Y = cy - s1H / 2 - (p * 40);

      canvasCtx.fillStyle = '#FFFFFF';
      canvasCtx.beginPath();
      canvasCtx.roundRect(s1X - 6, s1Y - 6, s1W + 12, s1H + 26, 8);
      canvasCtx.fill();
      if (p > 0.65) {
        canvasCtx.strokeStyle = '#E08E45';
        canvasCtx.lineWidth = 2;
        canvasCtx.stroke();
      }
      canvasCtx.drawImage(img1, s1X, s1Y, s1W, s1H);
      canvasCtx.fillStyle = '#111111';
      canvasCtx.font = '600 9px JetBrains Mono, monospace';
      canvasCtx.fillText(p > 0.65 ? 'CAMPFIRE WITH DAD • MATCH' : 'SUMMER 2014 • LAKE CABIN', s1X + 2, s1Y + s1H + 15);
      canvasCtx.restore();

      // Slide 2 (Right)
      if (loadedCount >= 2 && p > 0.5) {
        const a2 = Math.min(1, (p - 0.5) * 3);
        canvasCtx.save();
        canvasCtx.globalAlpha = a2;
        const s2W = 160 * driveScale;
        const s2H = 110 * driveScale;
        const s2X = cx + driveW * 0.55 + (p * 50);
        const s2Y = cy - s2H / 2 + (p * 30);

        canvasCtx.fillStyle = '#FFFFFF';
        canvasCtx.beginPath();
        canvasCtx.roundRect(s2X - 6, s2Y - 6, s2W + 12, s2H + 26, 8);
        canvasCtx.fill();
        canvasCtx.drawImage(img2, s2X, s2Y, s2W, s2H);
        canvasCtx.fillStyle = '#111111';
        canvasCtx.font = '600 9px JetBrains Mono, monospace';
        canvasCtx.fillText('MAYA\'S FIRST BIRTHDAY • 2016', s2X + 2, s2Y + s2H + 15);
        canvasCtx.restore();
      }
    }
  }

  // Fallback canvas is ONLY activated if video is missing or fails
  if (!video) {
    setupCanvasFallback();
  }

  // 3. Search Pill Typing & Auto-Scroll Controller
  const typingTarget = document.getElementById('search-pill-typing');
  const enterBtn = document.getElementById('search-pill-enter');
  const matchBadge = document.getElementById('search-pill-badge');
  const exploreHint = document.getElementById('scroll-explore-hint');
  const searchPillInput = document.querySelector('.search-pill-input');
  const searchPhrase = 'Dad by the campfire';
  let isTyping = false;
  let hasCompletedTyping = false;
  let typingTimeout = null;

  function runTypingAnimation() {
    if (isTyping || hasCompletedTyping) return;
    isTyping = true;
    if (typingTarget) typingTarget.textContent = '';
    if (enterBtn) enterBtn.classList.remove('pressed');
    if (matchBadge) matchBadge.classList.remove('visible');
    if (exploreHint) exploreHint.classList.remove('visible');

    let charIdx = 0;
    function typeNextChar() {
      if (charIdx < searchPhrase.length) {
        if (typingTarget) typingTarget.textContent += searchPhrase[charIdx];
        charIdx++;
        typingTimeout = setTimeout(typeNextChar, 50);
      } else {
        // Step 1: Finished typing -> highlight / select the Enter option
        typingTimeout = setTimeout(() => {
          if (enterBtn) enterBtn.classList.add('pressed');

          // Step 2: After a delay, light up the Match badge to show match found
          typingTimeout = setTimeout(() => {
            if (matchBadge) matchBadge.classList.add('visible');
            isTyping = false;
            hasCompletedTyping = true;

            // Step 3: After Match is lighted, show the scroll to explore figure
            typingTimeout = setTimeout(() => {
              if (exploreHint) exploreHint.classList.add('visible');
            }, 350);
          }, 450);
        }, 280);
      }
    }
    typeNextChar();
  }

  function resetTypingAnimation() {
    if (typingTimeout) clearTimeout(typingTimeout);
    isTyping = false;
    hasCompletedTyping = false;
    if (typingTarget) typingTarget.textContent = '';
    if (enterBtn) enterBtn.classList.remove('pressed');
    if (matchBadge) matchBadge.classList.remove('visible');
    if (exploreHint) exploreHint.classList.remove('visible');
  }

  // Smooth cinematic auto-scroll till the end of the video itself (Act 3 Campfire Photo)
  let autoScrollTween = null;
  function triggerAutoScrollToMatch() {
    // If typing was still in progress or hasn't completed, finalize it immediately
    if (typingTimeout) clearTimeout(typingTimeout);
    isTyping = false;
    hasCompletedTyping = true;
    if (typingTarget) typingTarget.textContent = searchPhrase;
    if (enterBtn) enterBtn.classList.add('pressed');
    if (matchBadge) matchBadge.classList.add('visible');
    if (exploreHint) exploreHint.classList.add('visible');

    // Calculate target scroll offset: 86% through the scrollytelling track
    const trackTop = track.offsetTop;
    const trackScrollable = track.offsetHeight - window.innerHeight;
    const targetScrollY = trackTop + trackScrollable * 0.86;

    if (autoScrollTween) autoScrollTween.kill();

    if (typeof gsap !== 'undefined') {
      const scrollObj = { y: window.scrollY };
      autoScrollTween = gsap.to(scrollObj, {
        y: targetScrollY,
        duration: 3.0,
        ease: 'power2.inOut',
        onUpdate: () => window.scrollTo(0, scrollObj.y)
      });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  }

  // Bind clicking on enter (or search pill) to auto-scroll
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerAutoScrollToMatch();
    });
    enterBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerAutoScrollToMatch();
      }
    });
  }

  if (searchPillInput) {
    searchPillInput.addEventListener('click', () => {
      triggerAutoScrollToMatch();
    });
  }

  // 4. Outpost Alternating Card Transitions (Search First -> Boom Up Flow)
  function updateStoryBeat(p) {
    let activeIndex = -1;
    if (p < 0.18) {
      activeIndex = 0; // Act 1: Initial Search Hook ("Dad by the campfire" -> Match)
    } else if (p < 0.58) {
      activeIndex = 1; // Act 2: Camera booms up & floating photo constellation
    } else if (p < 0.97) {
      activeIndex = 2; // Act 3: Campfire Polaroid in sharp optical rack-focus ("The drawer full of memories")
    } else {
      activeIndex = -1; // Smooth release into light gallery calculator
    }

    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // In Act 1, trigger the typing search pill animation immediately
    if (activeIndex === 0) {
      runTypingAnimation();
    }

    // Soft dissolve feather into white calculator as scroll nears completion
    if (bottomFeather) {
      if (p > 0.86) {
        const featherAlpha = Math.min(1, (p - 0.86) / 0.10);
        bottomFeather.style.opacity = featherAlpha.toFixed(2);
      } else {
        bottomFeather.style.opacity = '0';
      }
    }

    if (scrubBar) {
      scrubBar.style.width = `${(p * 100).toFixed(1)}%`;
    }

    // Retire sound hint after user starts scrolling
    if (p > 0.06 && soundHint) {
      soundHint.classList.remove('visible');
    }
  }

  // Calculate video scrub progress:
  // 0% to 15% scroll: hold at frame 0 (desk & SSD) while search types & Match badge pops
  // 15% to 96% scroll: camera booms up and dollies through the full 8s video flight
  // 96%+ scroll: video holds at final sharp campfire frame as stage releases into calculator
  function calculateVideoTime(p, duration) {
    if (p <= 0.15) {
      return 0;
    } else if (p >= 0.96) {
      return duration;
    } else {
      const vidProgress = (p - 0.15) / (0.96 - 0.15);
      return vidProgress * duration;
    }
  }

  // 5. GSAP ScrollTrigger Integration
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        const p = self.progress;
        const dur = (video && video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : videoDuration;
        targetVideoTime = calculateVideoTime(p, dur);
        seekVideoFrame();

        if (!hasVideo) {
          renderFrame(p);
        }
        updateStoryBeat(p);
      }
    });
  } else {
    // Native scroll fallback
    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));

      const dur = (video && video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : videoDuration;
      targetVideoTime = calculateVideoTime(p, dur);
      seekVideoFrame();

      if (!hasVideo) {
        renderFrame(p);
      }
      updateStoryBeat(p);
    });
  }

  // Trigger initial search typing on page load after a gentle 350ms breather
  setTimeout(() => {
    if (window.scrollY < 200) {
      runTypingAnimation();
    }
  }, 350);

  // 5. Outpost Ambient Warm Analog Audio Engine (Web Audio API)
  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let noiseNode = null;
  let chordOscillators = [];

  function initAudioEngine() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Warm Analog Vinyl / Tape Texture (Pink Noise through warm bandpass)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.04;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1400; // Warm soft tape hiss
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    noiseNode.start();

    // Gentle Warm Nostalgic Chords (F# / A / C# / E soothing frequencies)
    const freqs = [174.61, 220.00, 261.63, 329.63];
    chordOscillators = freqs.map((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, audioCtx.currentTime);

      // Subtle LFO vibrato
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 0.2 + i * 0.05;
      lfoGain.gain.value = 0.8;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.value = 0.035;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return osc;
    });
  }

  function toggleAudio() {
    if (!audioCtx) {
      initAudioEngine();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;
    if (musicBtn) {
      musicBtn.setAttribute('data-playing', isPlaying ? 'true' : 'false');
      musicBtn.classList.remove('is-nudging');
    }
    if (soundHint) {
      soundHint.classList.remove('visible');
    }

    if (isPlaying) {
      masterGain.gain.setTargetAtTime(0.4, audioCtx.currentTime, 1.2);
    } else {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.6);
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleAudio);
  }

  // Show subtle sound hint briefly on first load
  setTimeout(() => {
    if (!isPlaying && soundHint) {
      soundHint.classList.add('visible');
      if (musicBtn) musicBtn.classList.add('is-nudging');
    }
  }, 1400);

  setTimeout(() => {
    if (soundHint) soundHint.classList.remove('visible');
  }, 7000);
}
