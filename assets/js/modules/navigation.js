/**
 * Navigation, Tab Switching, Clipboard, Modal & Interactive Accordion Module
 */

export function initNavigation() {
  initNavbar();
  initTabs();
  initQuickstartTabs();
  initCopyButtons();
  initFaqAccordion();
  initLicenseModal();
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    // Reveal nav CTA buttons only after scrolling past the opening pure-art screen
    if (window.scrollY > 250) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active', isOpen);
    });

    navLinks.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      }
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
        button.style.borderColor = 'var(--neo-mint)';
        button.style.color = 'var(--neo-mint)';

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

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

function initLicenseModal() {
  const modal = document.getElementById('license-modal') || document.getElementById('vip-modal');
  const openButtons = document.querySelectorAll('.trigger-license-modal, .trigger-vip-modal');
  const closeButtons = document.querySelectorAll('#modal-close, #modal-close-btn, .modal-close');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active', 'open');
    document.body.style.overflow = 'hidden';
    const emailInput = document.getElementById('license-email');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 150);
    }
  };

  const closeModal = () => {
    modal.classList.remove('active', 'open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (modal.classList.contains('active') || modal.classList.contains('open'))) {
      closeModal();
    }
  });
}
