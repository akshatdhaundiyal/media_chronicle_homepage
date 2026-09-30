/**
 * Media Chronicle — Lifetime Savings & ROI Calculator
 * Computes cumulative cloud subscription costs vs. Media Chronicle's $79 lifetime license.
 */

export function initCalculator() {
  const yearsSlider = document.getElementById('calc-years-slider');
  const yearsDisplay = document.getElementById('calc-years-val');
  const storagePills = document.querySelectorAll('.calc-storage-pill');
  
  const cloudCostElem = document.getElementById('calc-cloud-total');
  const chronicleCostElem = document.getElementById('calc-chronicle-total');
  const savingsElem = document.getElementById('calc-savings-total');
  const breakevenElem = document.getElementById('calc-breakeven');
  const comparisonDetailElem = document.getElementById('calc-comparison-detail');

  if (!yearsSlider || !cloudCostElem || !savingsElem) return;

  // Storage tiers: Annual cost of typical cloud plans (Google One / Apple iCloud+)
  const tiers = {
    '200gb': { name: '200 GB Family Library', annual: 36, tierLabel: '200 GB' },
    '2tb': { name: '2 TB High-Res Archive', annual: 120, tierLabel: '2 TB' },
    '6tb': { name: '6 TB Multi-Drive Collection', annual: 240, tierLabel: '6 TB' },
    '12tb': { name: '12 TB Lifetime Legacy Vault', annual: 360, tierLabel: '12 TB' }
  };

  let activeTier = '2tb';
  const CHRONICLE_PRICE = 79;

  function calculate() {
    const years = parseInt(yearsSlider.value, 10);
    const tierData = tiers[activeTier] || tiers['2tb'];
    
    const annualCloud = tierData.annual;
    const totalCloud = annualCloud * years;
    const totalSavings = Math.max(0, totalCloud - CHRONICLE_PRICE);
    
    // Break-even in months: (79 / annual) * 12
    const breakEvenMonths = Math.max(1, Math.round((CHRONICLE_PRICE / annualCloud) * 12));

    // Update UI elements
    if (yearsDisplay) {
      yearsDisplay.textContent = `${years} ${years === 1 ? 'Year' : 'Years'}`;
    }

    cloudCostElem.textContent = `$${totalCloud.toLocaleString()}`;
    chronicleCostElem.textContent = `$${CHRONICLE_PRICE}`;
    savingsElem.textContent = `$${totalSavings.toLocaleString()}`;

    if (breakevenElem) {
      breakevenElem.textContent = `${breakEvenMonths} Months`;
    }

    if (comparisonDetailElem) {
      comparisonDetailElem.innerHTML = `
        Based on <strong>${tierData.name}</strong> at ~$${annualCloud}/yr in cloud fees. 
        After <strong>${years} ${years === 1 ? 'year' : 'years'}</strong>, you keep 
        <strong class="highlight-cyan">$${totalSavings.toLocaleString()} in your pocket</strong> 
        with zero corporate cloud lock-in.
      `;
    }
  }

  // Slider event
  yearsSlider.addEventListener('input', calculate);

  // Storage pills events
  storagePills.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeTier = pill.dataset.tier || '2tb';
      calculate();
    });
  });

  // Initial calculation
  calculate();
}
