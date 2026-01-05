// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = this.querySelector('input[placeholder="Your Name"]');
        const emailInput = this.querySelector('input[placeholder="Your Email"]');
        const companyInput = this.querySelector('input[placeholder="Company Name"]');
        const serviceSelect = this.querySelector('select');
        const messageInput = this.querySelector('textarea');
        
        // Validate form
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            return;
        }
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            alert('Please enter a valid email');
            return;
        }
        if (!messageInput.value.trim()) {
            alert('Please enter a message');
            return;
        }
        
        // Show success message
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            alert(`Thank you ${nameInput.value}! We've received your message and will get back to you soon.`);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, portfolio items, team members, and testimonials
document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card, .stats-card, .process-step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                navLinks.forEach(l => l.style.color = 'var(--text-dark)');
                link.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Smooth scroll on page load if there's a hash
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Counter animation for stats
const statsCards = document.querySelectorAll('.stats-number');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    
    statsCards.forEach(card => {
        const target = parseInt(card.textContent);
        const isPercentage = card.textContent.includes('%');
        const isPlus = card.textContent.includes('+');
        const text = card.textContent.replace(/[0-9]/g, '').trim();
        
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                let display = Math.floor(current);
                card.textContent = display + text;
                setTimeout(updateCounter, 20);
            } else {
                card.textContent = target + text;
            }
        };
        
        updateCounter();
    });
    
    hasAnimated = true;
};

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add ripple effect on button clicks
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();
        
        this.appendChild(ripple);
    });
});

// Prevent form submission on enter key
document.addEventListener('keypress', function(e) {
    if (e.target.matches('input[type="text"], input[type="email"], textarea, select')) {
        if (e.key === 'Enter' && !e.target.matches('textarea')) {
            e.preventDefault();
        }
    }
});


// --- Fetch & render dynamic content from API ---
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return res.json();
}

function renderServices(items) {
    const container = document.querySelector('.services-grid');
    if (!container) return;
    container.innerHTML = items.map(s => `
        <div class="service-card">
            <div class="service-icon-box">${s.icon || '🔹'}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <a href="#" class="service-link">Learn More →</a>
        </div>
    `).join('');
}

function renderPortfolio(items) {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;
    container.innerHTML = items.map(p => `
        <div class="portfolio-item">
            <div class="portfolio-image" style="background: ${p.imageGradient || 'linear-gradient(135deg,#0f172a,#0066cc)'}"></div>
            <div class="portfolio-info">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <span class="portfolio-tag">${p.tag}</span>
            </div>
        </div>
    `).join('');
}

function renderTeam(items) {
    const container = document.querySelector('.team-grid');
    if (!container) return;
    container.innerHTML = items.map(m => `
        <div class="team-member">
            <div class="member-avatar">${m.avatar || '👤'}</div>
            <h3>${m.name}</h3>
            <p class="member-role">${m.role}</p>
            <p class="member-bio">${m.bio}</p>
        </div>
    `).join('');
}

function renderTestimonials(items) {
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;
    container.innerHTML = items.map(t => `
        <div class="testimonial-card">
            <div class="stars">${'★'.repeat(t.stars || 5)}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author"><p class="author-name">${t.author}</p><p class="author-title">${t.title}</p></div>
        </div>
    `).join('');
}

function renderStats(items) {
    const container = document.querySelector('.stats-grid');
    if (!container) return;
    container.innerHTML = items.map(s => `
        <div class="stats-card">
            <div class="stats-number">${s.value}</div>
            <div class="stats-label">${s.label}</div>
        </div>
    `).join('');
}

async function loadAll() {
    try {
        const [services, portfolio, team, testimonials, stats] = await Promise.all([
            fetchJSON('/api/services'),
            fetchJSON('/api/portfolio'),
            fetchJSON('/api/team'),
            fetchJSON('/api/testimonials'),
            fetchJSON('/api/stats')
        ]);

        renderServices(services);
        renderPortfolio(portfolio);
        renderTeam(team);
        renderTestimonials(testimonials);
        renderStats(stats);

        // re-observe newly-added elements
        document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card, .stats-card, .process-step, .faq-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });
    } catch (err) {
        console.error('Failed to load content', err);
    }
}

loadAll();

// FAQ Accordion (delegated)
document.addEventListener('click', (e) => {
    if (e.target.matches('.faq-header') || e.target.closest('.faq-header')) {
        const header = e.target.closest('.faq-header');
        const item = header.parentElement;
        document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
        item.classList.toggle('active');
    }
});

// Contact form POST to API
document.addEventListener('submit', async (e) => {
    if (!e.target.matches('.contact-form')) return;
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Your Email"]').value.trim();
    const company = form.querySelector('input[placeholder="Company Name"]').value.trim();
    const service = form.querySelector('select')?.value || '';
    const message = form.querySelector('textarea')?.value.trim();

    if (!name || !email || !message) {
        alert('Please fill required fields');
        return;
    }

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, service, message })
        });
        const body = await res.json();
        if (!res.ok) throw body;
        const btn = form.querySelector('.submit-button');
        const orig = btn.textContent;
        btn.textContent = 'Sent ✓';
        setTimeout(() => { btn.textContent = orig; form.reset(); alert('Message sent — we will contact you soon.'); }, 900);
    } catch (err) {
        console.error(err);
        alert('Failed to send message. Try again later.');
    }
});

// Prevent accidental enter submit
document.addEventListener('keypress', function(e) {
    if (e.target.matches('input[type="text"], input[type="email"], select') && e.key === 'Enter') e.preventDefault();
});
