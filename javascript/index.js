/* ============================================
   LYNN BOLDERMAN — PORTFOLIO JAVASCRIPT
   Scroll reveal, taal toggle, mobiel nav
   ============================================ */

// ====== SCROLL REVEAL (Intersection Observer) ======
const animeerElementen = document.querySelectorAll('.anim-verberg');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('anim-zichtbaar');
            observer.unobserve(entry.target); // animeer maar 1 keer
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animeerElementen.forEach((el) => observer.observe(el));


// ====== TAAL TOGGLE (NL / EN) ======
const taalKnoppen = document.querySelectorAll('.taal-optie');
let huidigeTaal = 'nl';

taalKnoppen.forEach((knop) => {
    knop.addEventListener('click', () => {
        const nieuweTaal = knop.dataset.lang;
        if (nieuweTaal === huidigeTaal) return;

        huidigeTaal = nieuweTaal;

        // wissel actieve klasse
        taalKnoppen.forEach((k) => {
            k.classList.remove('actief');
            k.setAttribute('aria-pressed', 'false');
        });
        knop.classList.add('actief');
        knop.setAttribute('aria-pressed', 'true');

        // wissel teksten
        document.querySelectorAll('[data-nl][data-en]').forEach((el) => {
            const tekst = el.getAttribute(`data-${nieuweTaal}`);
            if (tekst) {
                el.textContent = tekst;
            }
        });

        // wissel html lang attribuut
        document.documentElement.lang = nieuweTaal;
    });
});


// ====== KEYBOARD SUPPORT VOOR THEMA TOGGLE ======
const themaToggle = document.getElementById('thema-toggle');
if (themaToggle) {
    themaToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('thema-checkbox').click();
        }
    });
}
