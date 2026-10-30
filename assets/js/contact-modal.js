document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('contact-modal');
  if (!modal) return;
  var dialog = modal.querySelector('.contact-dialog');
  var form = document.getElementById('contact-form');
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    if (dialog) dialog.classList.remove('is-sent');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(function () {
      var nameInput = document.getElementById('contact-name');
      if (nameInput) nameInput.focus();
    }, 50);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  document.querySelectorAll('[data-open-contact]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  var closeBtn = modal.querySelector('[data-close-contact]');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var d = new FormData(form);
      var subject = 'New enquiry from ' + d.get('name');
      var body =
        'Name: ' + d.get('name') + '\n' +
        'Company: ' + (d.get('company') || '-') + '\n' +
        'Email: ' + d.get('email') + '\n' +
        'Phone: ' + (d.get('phone') || '-') + '\n\n' +
        'Needs:\n' + d.get('needs');

      window.location.href = 'mailto:contact@kyrtle.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      if (dialog) dialog.classList.add('is-sent');
      form.reset();
    });
  }

  // Interactive subtle spotlight effect for tech cards & principles
  var spotlightCards = document.querySelectorAll('.card, .pill, .contact-panel');
  spotlightCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
});
