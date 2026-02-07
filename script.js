document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.right = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.textAlign = 'center';
            nav.style.padding = '20px 0';
        }

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.padding = '15px 5%';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.padding = '20px 5%';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Translations
    const translations = {
        'pl': {
            'nav.home': 'Start',
            'nav.services': 'Oferta',
            'nav.gallery': 'Galeria',
            'nav.contact': 'Kontakt',
            'hero.title': 'POCZUJ MOC <br><span class="highlight">LEGENDY</span>',
            'hero.subtitle': 'Dodge Charger 3.6L - Idealny na Twój ślub, event lub niezapomnianą przejażdżkę.',
            'hero.cta': 'Rezerwuj Termin',
            'services.title': 'Nasza Oferta',
            'services.wedding.title': 'Śluby',
            'services.wedding.desc': 'Ekskluzywny transport Państwa Młodych. Zróbcie wejście w wielkim stylu.',
            'services.event.title': 'Imprezy',
            'services.event.desc': 'Studniówki, wieczory kawalerskie/panieńskie, eventy firmowe.',
            'services.ride.title': 'Przejażdżki',
            'services.ride.desc': 'Poczuj adrenalinę na miejscu pasażera. Godzinna jazda pełna emocji.',
            'gallery.title': 'Galeria',
            'contact.title': 'Zarezerwuj Teraz',
            'contact.location': 'Kraków i okolice',
            'contact.placeholder.name': 'Imię i Nazwisko',
            'contact.placeholder.email': 'Email',
            'contact.placeholder.phone': 'Telefon',
            'contact.placeholder.message': 'Wiadomość / Data',
            'contact.submit': 'Wyślij Wiadomość',
            'contact.show_phone': '(pokaż)'
        },
        'en': {
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.gallery': 'Gallery',
            'nav.contact': 'Contact',
            'hero.title': 'FEEL THE <br><span class="highlight">LEGEND</span>',
            'hero.subtitle': 'Dodge Charger 3.6L - Perfect for your wedding, event, or an unforgettable ride.',
            'hero.cta': 'Book Now',
            'services.title': 'Our Services',
            'services.wedding.title': 'Weddings',
            'services.wedding.desc': 'Exclusive transport for the Bride and Groom. Make a grand entrance.',
            'services.event.title': 'Events',
            'services.event.desc': 'Proms, bachelor/bachelorette parties, corporate events.',
            'services.ride.title': 'Joyrides',
            'services.ride.desc': 'Feel the adrenaline from the passenger seat. An hour of pure emotion.',
            'gallery.title': 'Gallery',
            'contact.title': 'Book Now',
            'contact.location': 'Kraków & surrounding areas',
            'contact.placeholder.name': 'Name and Surname',
            'contact.placeholder.email': 'Email',
            'contact.placeholder.phone': 'Phone',
            'contact.placeholder.message': 'Message / Date',
            'contact.submit': 'Send Message',
            'contact.show_phone': '(show)'
        }
    };

    window.changeLang = function (lang) {
        // Update texts
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.lang-btn[onclick="changeLang('${lang}')"]`).classList.add('active');

        // Save preference (optional, not requested but good UX)
        localStorage.setItem('lang', lang);
    };

    // Load saved language or default to PL
    const savedLang = localStorage.getItem('lang') || 'pl';
    changeLang(savedLang);
});

function revealPhone() {
    const phoneDisplay = document.getElementById('phone-display');
    const phone = '737 ' + '453 ' + '440';
    phoneDisplay.innerHTML = `<a href="tel:${phone}" style="color: var(--text-light); text-decoration: none;">${phone}</a>`;
}

function revealEmail() {
    const emailDisplay = document.getElementById('email-display');
    const email = 'pawel.czech' + '.dev.set@gmail.com';
    emailDisplay.innerHTML = `<a href="mailto:${email}" class="contact-link">${email}</a>`;
}

// Update translations object (extended)
const extraTranslations = {
    'pl': { 'contact.show_phone': '(pokaż)' },
    'en': { 'contact.show_phone': '(show)' }
};

// Merge for existing script usage (Quick fix without re-declaring const)
// Since 'translations' is scope-bound in DOMContentLoaded, we need to handle this carefully.
// Ideally, we move revealPhone inside or expose translations.
// However, simpler is to just define the function globally and have it hardcoded or smart enough.
// Let's rely on the DOMContentLoaded block for the initial translations object if we can edit it directly there.

