/**
 * Dodo Payments Integration Module
 * Handles configuration, payment link generation, pre-filled customer details, and checkout transitions.
 * 
 * Documentation: https://docs.dodopayments.com/
 */

export const DODO_CONFIG = {
  /**
   * Environment Mode:
   * - 'test': For sandbox testing before going live (https://test.checkout.dodopayments.com/buy/{productId})
   * - 'live': For production payments (https://checkout.dodopayments.com/buy/{productId})
   */
  mode: 'test',

  /**
   * Your Dodo Payments Product ID
   * Found in Dodo Payments Dashboard -> Products -> Select Product -> Copy Product ID
   * Example: 'pdt_01HW3X9ABCD1234'
   */
  productId: 'pdt_media_chronicle_lifetime_79',

  /**
   * Optional Direct Payment Link Override:
   * If you prefer to use a custom static payment link created directly in your Dodo dashboard,
   * paste the full URL here (e.g., 'https://checkout.dodopayments.com/buy/pdt_xxx').
   * If left empty, the URL is automatically constructed using productId and mode.
   */
  paymentLinkOverride: '',

  /**
   * Product Metadata for Display
   */
  productName: 'Media Chronicle — Lifetime License',
  priceUsd: 79,
  currency: 'USD',

  /**
   * Return URL after successful payment completion
   */
  get returnUrl() {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const baseDir = pathname.substring(0, pathname.lastIndexOf('/') + 1) || '/';
    return `${origin}${baseDir}success.html`;
  }
};

/**
 * Builds the official Dodo Payments checkout URL with pre-filled customer email and return URL.
 * 
 * Format:
 * https://[test.]checkout.dodopayments.com/buy/{productId}?customer_email={email}&quantity=1&redirect_url={returnUrl}
 * 
 * @param {string} email - Customer email address
 * @returns {string} Fully qualified Dodo Payments checkout URL
 */
export function getCheckoutUrl(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const returnUrl = DODO_CONFIG.returnUrl;

  let baseUrl = '';

  if (DODO_CONFIG.paymentLinkOverride && DODO_CONFIG.paymentLinkOverride.trim().length > 0) {
    baseUrl = DODO_CONFIG.paymentLinkOverride.trim();
  } else {
    const isLive = DODO_CONFIG.mode === 'live';
    const domain = isLive ? 'https://checkout.dodopayments.com' : 'https://test.checkout.dodopayments.com';
    baseUrl = `${domain}/buy/${encodeURIComponent(DODO_CONFIG.productId)}`;
  }

  const url = new URL(baseUrl);
  if (cleanEmail) {
    url.searchParams.set('customer_email', cleanEmail);
  }
  url.searchParams.set('quantity', '1');
  if (returnUrl) {
    url.searchParams.set('redirect_url', returnUrl);
  }

  return url.toString();
}

/**
 * Initializes the Dodo Payments Checkout Form handler on the page.
 */
export function initDodoPayments() {
  const checkoutForm = document.getElementById('license-checkout-form');
  const emailInput = document.getElementById('license-email');
  const submitBtn = document.getElementById('license-submit-btn');

  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput ? emailInput.value.trim() : '';
    if (!email || !isValidEmail(email)) {
      alert('Please enter a valid email address for license key delivery.');
      if (emailInput) emailInput.focus();
      return;
    }

    // Update button to loading / redirecting state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <svg class="spin-animation" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Connecting to Dodo Payments...
        </span>
      `;
    }

    const checkoutUrl = getCheckoutUrl(email);

    // Save purchase email in sessionStorage so the success page can personalize the greeting
    try {
      sessionStorage.setItem('mc_checkout_email', email);
    } catch (_) {}

    // Small delay to let user see feedback before redirection
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 450);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
