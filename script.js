// Бургер-меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('nav--open');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav--open');
        }
    });
}

// Фильтры портфолио
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio__item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            button.classList.add('filter-btn--active');
            
            const filter = button.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Обработка формы (ИСПРАВЛЕНО для совместимости)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {};
        
        // Совместимая замена Object.fromEntries()
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        console.log('Данные формы:', data);
        
        alert('Спасибо! Ваша заявка принята. Мы перезвоним вам в течение 15 минут.');
        contactForm.reset();
    });
}

// Маска для телефона
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        
        if (value.length > 0 && !value.startsWith('7')) {
            value = '7' + value;
        }
        
        let formatted = '';
        if (value.length > 0) formatted = '+7';
        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
        if (value.length > 4) formatted += ') ' + value.slice(4, 7);
        if (value.length > 7) formatted += '-' + value.slice(7, 9);
        if (value.length > 9) formatted += '-' + value.slice(9, 11);
        
        e.target.value = formatted;
    });
}

// Анимация появления при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.feature, .service-card, .portfolio__item, .process__step');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});