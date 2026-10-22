document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('contact-modal');
  var dialog = modal.querySelector('.contact-dialog');
  var form = document.getElementById('contact-form');
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    dialog.classList.remove('is-sent');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(function () { document.getElementById('contact-name').focus(); }, 50);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-contact]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });
  modal.querySelector('[data-close-contact]').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
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
    dialog.classList.add('is-sent');
    form.reset();
  });
});
