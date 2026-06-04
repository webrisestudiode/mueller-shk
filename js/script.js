document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    if (cookieBanner && acceptCookiesBtn) {
        // Show banner if not accepted yet
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }


    // --- Multi-step Form Logic ---
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const progressLine = document.querySelector('.progress-line');
    let currentStep = 0;

    // Service selection logic
    const serviceOptions = document.querySelectorAll('.service-option');
    const serviceInput = document.getElementById('selected-service');

    if (serviceOptions.length > 0) {
        serviceOptions.forEach(option => {
            option.addEventListener('click', () => {
                serviceOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                if (serviceInput) {
                    serviceInput.value = option.dataset.service;
                }
            });
        });
    }

    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

        stepIndicators.forEach((indicator, index) => {
            if (index < currentStep) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
                indicator.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (index === currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
                indicator.innerHTML = index + 1;
            } else {
                indicator.classList.remove('active', 'completed');
                indicator.innerHTML = index + 1;
            }
        });

        if (progressLine) {
            const progress = (currentStep / (stepIndicators.length - 1)) * 100;
            progressLine.style.width = `${progress}%`;
        }
    }

    if (nextBtns.length > 0) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Basic validation for step 1
                if (currentStep === 0 && serviceInput && !serviceInput.value) {
                    alert('Bitte wählen Sie eine Leistung aus.');
                    return;
                }
                
                currentStep++;
                updateFormSteps();
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateFormSteps();
            });
        });
    }

    // Formular absenden (Simulation)
    const projektForm = document.getElementById('projekt-anfrage-form');
    if (projektForm) {
        projektForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = projektForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wird gesendet...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                projektForm.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fa-solid fa-circle-check text-success" style="font-size: 4rem; margin-bottom: 20px;"></i>
                        <h3>Vielen Dank für Ihre Anfrage!</h3>
                        <p>Wir haben Ihre Daten erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    const bewerbungsForm = document.getElementById('bewerbungs-form');
    if (bewerbungsForm) {
        bewerbungsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bewerbungsForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wird gesendet...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                bewerbungsForm.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fa-solid fa-circle-check text-success" style="font-size: 4rem; margin-bottom: 20px;"></i>
                        <h3>Vielen Dank für Ihre Bewerbung!</h3>
                        <p>Wir freuen uns auf Sie und melden uns in Kürze.</p>
                    </div>
                `;
            }, 1500);
        });
    }

});

// ========================

// ========================
// Demo Personalisierung
// ========================
(function () {
  // Params aus URL lesen → sessionStorage speichern
  var p = new URLSearchParams(window.location.search);
  ['firma','name','stadt','telefon'].forEach(function(k) {
    if (p.get(k)) sessionStorage.setItem('ws_'+k, p.get(k));
  });

  var firma   = sessionStorage.getItem('ws_firma');
  var name    = sessionStorage.getItem('ws_name');
  var stadt   = sessionStorage.getItem('ws_stadt');
  var telefon = sessionStorage.getItem('ws_telefon');

  // Telefon-Fallback per Stadt (wenn kein Lead-Telefon vorhanden)
  if (!telefon) {
    var CITY_PHONES = {
      'Stuttgart-Mitte':'0711 48 27 93','Stuttgart-Nord':'0711 38 16 74',
      'Stuttgart-Süd':'0711 62 93 41','Stuttgart-Ost':'0711 57 84 20',
      'Stuttgart-West':'0711 29 54 86','Bad Cannstatt':'0711 56 83 12',
      'Vaihingen':'0711 74 29 61','Zuffenhausen':'0711 83 47 25',
      'Feuerbach':'0711 94 61 38','Degerloch':'0711 46 82 57',
      'Möhringen':'0711 73 19 84','Stammheim':'0711 85 34 67',
      'Mühlhausen':'0711 91 46 23','Böblingen':'07031 6 48 27',
      'Sindelfingen':'07031 8 37 45','Esslingen':'0711 39 72 56',
      'Ostfildern':'0711 48 65 31','Leinfelden-Echterdingen':'0711 97 28 43',
      'Ludwigsburg':'07141 8 36 29','Kornwestheim':'07141 5 74 83',
      'Bietigheim-Bissingen':'07142 4 82 67','Waiblingen':'07151 6 93 48',
      'Fellbach':'0711 58 37 94','Schorndorf':'07181 4 72 85',
      'Winnenden':'07195 9 38 62','Göppingen':'07161 7 48 23',
      'Kirchheim unter Teck':'07021 8 53 46','Nürtingen':'07022 6 47 91',
      'Leonberg':'07152 5 83 27','Ditzingen':'07156 4 69 38',
      'Gerlingen':'07156 9 24 71','Korntal-Münchingen':'07150 3 84 56',
      'Remshalden':'07151 8 37 24','Plochingen':'07153 6 48 92',
      'Wendlingen':'07024 5 73 81'
    };
    telefon = (stadt && CITY_PHONES[stadt]) || '0711 48 27 93';
    sessionStorage.setItem('ws_telefon', telefon);
  }

  function replaceInText(node, oldStr, newStr) {
    if (!oldStr || oldStr === newStr) return;
    if (node.nodeType === 3) {
      if (node.textContent.indexOf(oldStr) !== -1)
        node.textContent = node.textContent.split(oldStr).join(newStr);
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      for (var i = 0; i < node.childNodes.length; i++)
        replaceInText(node.childNodes[i], oldStr, newStr);
    }
  }

  function replaceTelLinks(newTel) {
    var clean = newTel.replace(/\s/g, '');
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
      a.setAttribute('href', 'tel:' + clean);
      if (/^[0-9\s\-\/\+\(\)]+$/.test(a.textContent.trim()))
        a.textContent = newTel;
    });
  }

  function run() {
    if (firma) {
      var demoNames = ['Müller SHK Stuttgart', 'Müller SHK', 'MüllerSHK'];
      demoNames.forEach(function(n) { replaceInText(document.body, n, firma); });
      document.title = demoNames.reduce(function(t,n){ return t.split(n).join(firma); }, document.title);
    }
    if (stadt) {
      var demoCities = ['Stuttgart'];
      demoCities.forEach(function(c) { replaceInText(document.body, c, stadt); });
      document.title = demoCities.reduce(function(t,c){ return t.split(c).join(stadt); }, document.title);
    }
    // Logo direkt ersetzen – Text ist auf mehrere Nodes aufgeteilt
    if (firma) {
      var logoEl = document.querySelector('a.logo, a.navbar__logo, a.navbar-brand');
      if (logoEl) {
        var iconEl = logoEl.querySelector('i, .logo-icon, .navbar__logo-icon');
        var iconHTML = iconEl ? iconEl.outerHTML : '';
        logoEl.innerHTML = iconHTML + (iconHTML ? ' ' : '') + firma;
      }
    }
    if (telefon) {
      var demoPhones = ['0711 123456', '0711123456'];
      demoPhones.forEach(function(ph) { replaceInText(document.body, ph, telefon); });
      replaceTelLinks(telefon);
    }
    if (name) {
      var banner = document.getElementById('personalized-banner');
      var nameEl = document.getElementById('banner-name');
      if (banner && nameEl) {
        nameEl.textContent = name;
        banner.style.display = 'block';
        // Zu <html> verschieben – body overflow-x:hidden bricht sonst position:fixed
        if (banner.parentNode !== document.documentElement) {
          document.documentElement.appendChild(banner);
        }
        document.body.style.paddingTop = '50px';
      }
    }
  }

  // Script steht am Ende von <body> – DOM ist bereit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
