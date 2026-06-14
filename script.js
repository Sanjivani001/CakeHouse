const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-fade-up, .animate-zoom-in').forEach((el) => {
  observer.observe(el);
});

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-navigation');
navToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('cakeHouseTheme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = storedTheme || (prefersDark ? 'dark' : 'light');

function updateTheme(selectedTheme) {
  if (selectedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light';
    themeToggle.setAttribute('aria-label', 'Activate light mode');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙 Dark';
    themeToggle.setAttribute('aria-label', 'Activate dark mode');
  }
  localStorage.setItem('cakeHouseTheme', selectedTheme);
}

updateTheme(theme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  updateTheme(current === 'dark' ? 'light' : 'dark');
});

const productButtons = document.querySelectorAll('.button');
productButtons.forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translateY(-2px) perspective(600px) rotateX(${y / 15}deg) rotateY(${x / 15}deg)`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
});

const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
const controls = document.querySelectorAll('.control-button');
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((card, idx) => {
    card.classList.toggle('active', idx === index);
  });
}

controls.forEach((button) => {
  button.addEventListener('click', () => {
    testimonialIndex = button.dataset.direction === 'next'
      ? (testimonialIndex + 1) % testimonials.length
      : (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
  });
});

let testimonialTimer = setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 7000);

const testimonialArea = document.querySelector('.testimonial-slider');
testimonialArea?.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
testimonialArea?.addEventListener('mouseleave', () => {
  testimonialTimer = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }, 7000);
});

showTestimonial(testimonialIndex);
