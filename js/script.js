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
