// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--dark-surface)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '20px';
        navLinks.style.borderTop = '1px solid var(--dark-border)';
    }
}

// Demo Switching
function switchDemo(type) {
    // Update tabs
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.demo-tab').classList.add('active');
    
    // Update content
    document.querySelectorAll('.demo-view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`${type}-demo`).classList.add('active');
}

// FAQ Toggle
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle clicked FAQ
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// Contact Form Submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Since this is a static site, we'll show a success message
    // In production, you'd send this to a backend or service like Formspree
    console.log('Contact form submission:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div>
                <div style="font-weight: 600;">Message Sent!</div>
                <div style="font-size: 14px; opacity: 0.9;">We'll get back to you soon.</div>
            </div>
        </div>
    `;
    document.body.appendChild(successMessage);
    
    // Reset form
    form.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    return false;
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .team-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Active Navigation Link
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.style.color = 'var(--primary)';
                    }
                });
            }
        });
    });
    
    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    .feature-card:nth-child(5) { animation-delay: 0.5s; }
    .feature-card:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%cClassCloud 🚀', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check us out on GitHub!', 'font-size: 14px; color: #9ca3af;');
console.log('%chttps://github.com/ClassCloud-LearnAnywhere/ClassCloud', 'font-size: 12px; color: #6366f1; text-decoration: underline;');
