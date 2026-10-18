/**
 * Yellow Taxi - Scroll Reveal + WhatsApp (language via page URL / html[lang])
 */
(function () {
    'use strict';

    var html = document.documentElement;

    function getLang() {
        return html.lang === 'ar' ? 'ar' : 'en';
    }

    /* Welcome Popup - show on load (if present) */
    function initWelcomePopup() {
        var popup = document.getElementById('welcomePopup');
        var closeBtn = document.getElementById('welcomePopupClose');
        var whatsappBtn = document.getElementById('welcomeWhatsAppBtn');
        if (!popup || !closeBtn) return;

        popup.classList.add('welcome-popup-visible');

        closeBtn.addEventListener('click', function () {
            popup.classList.remove('welcome-popup-visible');
        });

        popup.addEventListener('click', function (e) {
            if (e.target === popup) popup.classList.remove('welcome-popup-visible');
        });

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function (e) {
                e.preventDefault();
                openWhatsApp(getLang());
            });
        }
    }

    /* WhatsApp with pre-filled message */
    function openWhatsApp(lang) {
        var msg = lang === 'ar'
            ? 'مرحباً، أود حجز خدمة نقل مع التاكسي الأصفر.'
            : 'Hi, I would like to book a taxi service with Yellow Taxi.';
        var url = 'https://wa.me/97337159404?text=' + encodeURIComponent(msg);
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function initWhatsAppLinks() {
        document.querySelectorAll('.whatsapp-link').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var lang = getLang();
                var msg = (lang === 'ar' ? a.getAttribute('data-ar-msg') : a.getAttribute('data-en-msg')) || 'Hi, I would like to book a taxi service.';
                var url = 'https://wa.me/97337159404?text=' + encodeURIComponent(msg);
                window.open(url, '_blank', 'noopener,noreferrer');
            });
        });
    }

    /* Scroll Reveal */
    function initScrollReveal() {
        var items = document.querySelectorAll('.scroll-reveal');
        if (!items.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* FAQ Accordion */
    function initFaqAccordion() {
        document.querySelectorAll('.faq-question-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var item = btn.closest('.faq-item');
                var isOpen = item.classList.contains('faq-open');
                document.querySelectorAll('.faq-item').forEach(function (i) {
                    i.classList.remove('faq-open');
                    i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    item.classList.add('faq-open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initScrollReveal();
            initWelcomePopup();
            initWhatsAppLinks();
            initFaqAccordion();
        });
    } else {
        initScrollReveal();
        initWelcomePopup();
        initWhatsAppLinks();
        initFaqAccordion();
    }
})();
