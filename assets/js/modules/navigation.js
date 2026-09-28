/**
 * Navigation, Tab Switching, Clipboard & Hotspot Module
 */

export function initNavigation() {
  initNavbar();
  initTabs();
  initQuickstartTabs();
  initCopyButtons();
  initHotspots();
}

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

        // Custom event for tab activation (e.g. embeddings canvas resize/redraw)
        window.dispatchEvent(new CustomEvent('lab-tab-changed', { detail: { tabId: targetId } }));
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
