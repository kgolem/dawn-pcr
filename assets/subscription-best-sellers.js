/**
 * Pacific Coast Roasters — Subscription Best Sellers
 * Connects blend cards, plan cards, add-on toggle, and order summary
 * to the hidden form inputs so the subscription builder actually works.
 */
(function () {
  const variantInput = document.getElementById('bss-variant-id');
  const planInput = document.getElementById('bss-selling-plan');
  const summaryBlend = document.getElementById('bss-summary-blend');
  const summaryPlan = document.getElementById('bss-summary-plan');
  const summaryPrice = document.getElementById('bss-summary-price');
  const form = document.querySelector('.pcr-bss__form');

  if (!form) return;

  /* ── Helpers ── */
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  function getSelectedBlend() {
    return document.querySelector('.pcr-bss__blend-input:checked');
  }

  function getSelectedPlan() {
    return document.querySelector('.pcr-bss__plan-input:checked');
  }

  function updateSummary() {
    const blend = getSelectedBlend();
    const plan = getSelectedPlan();

    if (blend && summaryBlend) {
      const card = blend.closest('.pcr-bss__blend-card');
      const name = card ? card.querySelector('.pcr-bss__blend-name') : null;
      summaryBlend.textContent = name ? name.textContent : blend.closest('label').querySelector('.pcr-bss__blend-name').textContent;
    }

    if (plan && summaryPlan) {
      summaryPlan.textContent = plan.dataset.planName || '';
    }

    if (blend && summaryPrice) {
      var priceCents = parseInt(blend.dataset.variantPrice, 10) || 0;
      var discountPct = 0;
      if (plan) {
        discountPct = parseInt(plan.dataset.discountPct, 10) || 0;
      }
      if (discountPct > 0) {
        priceCents = Math.round(priceCents * (1 - discountPct / 100));
      }
      summaryPrice.textContent = formatMoney(priceCents);
    }

    // Update per-plan price displays
    var priceCentsBase = 0;
    if (blend) {
      priceCentsBase = parseInt(blend.dataset.variantPrice, 10) || 0;
    }
    document.querySelectorAll('.pcr-bss__plan-input').forEach(function (input) {
      var display = input.closest('.pcr-bss__plan-card').querySelector('[data-price-display]');
      if (display) {
        var disc = parseInt(input.dataset.discountPct, 10) || 0;
        var adjusted = disc > 0 ? Math.round(priceCentsBase * (1 - disc / 100)) : priceCentsBase;
        display.textContent = formatMoney(adjusted);
      }
    });
  }

  /* ── Step 1: Blend selection ── */
  document.querySelectorAll('.pcr-bss__blend-input').forEach(function (radio) {
    radio.addEventListener('change', function () {
      // Update hidden variant input
      if (variantInput) {
        variantInput.value = this.dataset.variantId;
      }
      // Toggle selected class
      document.querySelectorAll('.pcr-bss__blend-card').forEach(function (card) {
        card.classList.remove('is-selected');
      });
      this.closest('.pcr-bss__blend-card').classList.add('is-selected');

      updateSummary();
    });
  });

  /* ── Step 2: Plan selection ── */
  document.querySelectorAll('.pcr-bss__plan-input').forEach(function (radio) {
    radio.addEventListener('change', function () {
      // Update hidden selling plan input
      if (planInput) {
        planInput.value = this.dataset.sellingPlanId;
      }
      // Toggle selected class
      document.querySelectorAll('.pcr-bss__plan-card').forEach(function (card) {
        card.classList.remove('is-selected');
      });
      this.closest('.pcr-bss__plan-card').classList.add('is-selected');

      updateSummary();
    });
  });

  /* ── Step 3: Add-on toggle ── */
  var addonToggle = document.getElementById('bss-addon-toggle');
  if (addonToggle) {
    addonToggle.addEventListener('change', function () {
      // Visual feedback handled by CSS :checked; summary update if needed later
      updateSummary();
    });

    // Intercept form submit to add the add-on as a second line item
    form.addEventListener('submit', function (e) {
      if (!addonToggle.checked) return;

      e.preventDefault();

      var addonVariantId = addonToggle.dataset.addonVariantId;
      var addonSellingPlanId = addonToggle.dataset.addonSellingPlanId;

      if (!addonVariantId) return;

      var items = [
        {
          id: parseInt(variantInput.value, 10),
          quantity: 1,
          selling_plan: parseInt(planInput.value, 10) || undefined
        },
        {
          id: parseInt(addonVariantId, 10),
          quantity: 1,
          selling_plan: parseInt(addonSellingPlanId, 10) || undefined
        }
      ];

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Add to cart failed');
          window.location.href = '/cart';
        })
        .catch(function (err) {
          console.error('PCR subscription add-on error:', err);
          // Fall back to normal form submit without add-on
          form.submit();
        });
    });
  }

  // Initialize summary on load
  updateSummary();
})();
