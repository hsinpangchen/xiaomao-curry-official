document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('site-nav-toggle');
  var nav = document.getElementById('site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});
