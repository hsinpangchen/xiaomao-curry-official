document.addEventListener('DOMContentLoaded', function() {
  function trackEvent(name, params) {
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', name, params || {});
  }

  var body = document.body;
  var pageType = body ? body.dataset.pageType || 'general' : 'general';
  var pagePath = body ? body.dataset.pagePath || window.location.pathname : window.location.pathname;
  var toggle = document.getElementById('site-nav-toggle');
  var nav = document.getElementById('site-nav');

  if (pageType === 'menu') {
    trackEvent('menu_view', {
      page_type: pageType,
      page_path: pagePath
    });
  }

  if (pageType === 'limited_edition') {
    trackEvent('limited_edition_view', {
      page_type: pageType,
      page_path: pagePath
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackEvent('phone_click', {
        page_type: pageType,
        page_path: pagePath,
        phone_number: link.getAttribute('href').replace('tel:', '')
      });
    });
  });

  document.querySelectorAll('[data-track-event]').forEach(function(link) {
    link.addEventListener('click', function() {
      var params = {
        page_type: pageType,
        page_path: pagePath
      };

      if (link.dataset.trackDestination) {
        params.destination_type = link.dataset.trackDestination;
      }

      if (link.dataset.trackRole) {
        params.role_slug = link.dataset.trackRole;
      }

      if (link.dataset.trackLabel) {
        params.link_label = link.dataset.trackLabel;
      }

      trackEvent(link.dataset.trackEvent, params);
    });
  });

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});
