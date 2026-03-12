// Pacific Coast Roasters — Product card variant switcher
// Updates displayed price and hidden variant ID when a size is selected.

document.addEventListener('change', function (e) {
  const input = e.target;
  if (!input.matches('.pcr-product-card__variant-input')) return;

  const card = input.closest('.pcr-product-card');
  if (!card) return;

  const priceEl = card.querySelector('[id^="price-"]');
  const idInput = card.querySelector('[id^="variant-id-"]');
  const labels  = card.querySelectorAll('.pcr-product-card__variant-label');

  // Update selected state
  labels.forEach(l => l.classList.remove('is-selected'));
  input.closest('.pcr-product-card__variant-label').classList.add('is-selected');

  // Update price display
  if (priceEl && input.dataset.price) {
    priceEl.textContent = input.dataset.price;
  }

  // Update hidden form variant ID
  if (idInput) {
    idInput.value = input.value;
  }

  // Update ATC disabled state
  const atcBtn = card.querySelector('.pcr-card__atc');
  if (atcBtn) {
    const available = input.dataset.available === 'true';
    atcBtn.disabled = !available;
    atcBtn.textContent = available ? 'Add to Cart' : 'Sold out';
  }
});
