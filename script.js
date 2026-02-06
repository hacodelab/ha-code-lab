// ===========================
// ENHANCED VISUAL EFFECTS
// ===========================

// Cursor Particle Trail
class ParticleTrail {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createParticle();
        });

        this.animate();
    }

    createParticle() {
        const colors = ['#00f5ff', '#a855f7', '#ec4899', '#ff3d71', '#ffd93d'];
        const particle = document.createElement('div');
        particle.className = 'particle-trail';
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            left: ${this.mouse.x}px;
            top: ${this.mouse.y}px;
            opacity: 1;
            box-shadow: 0 0 10px currentColor;
        `;

        document.body.appendChild(particle);
        this.particles.push({ element: particle, life: 1 });

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    animate() {
        this.particles.forEach((p, index) => {
            p.life -= 0.02;
            if (p.life <= 0) {
                this.particles.splice(index, 1);
                if (p.element.parentNode) {
                    p.element.parentNode.removeChild(p.element);
                }
            } else {
                p.element.style.opacity = p.life;
                p.element.style.transform = `scale(${p.life})`;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle trail
const particleTrail = new ParticleTrail();

// Animated Counter for Stats (Enhanced)
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
            // Add celebration effect
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Ripple Effect on Button Click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Magnetic Effect for Course Cards
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${deltaY * -5}deg)
            rotateY(${deltaX * 5}deg)
            translateY(-10px)
            scale(1.02)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Glow Effect on Scroll for Section Titles
const observeGlow = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'title-glow 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    observeGlow.observe(title);
});

// Add title glow animation
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes title-glow {
        0%, 100% {
            filter: drop-shadow(0 0 5px rgba(0, 245, 255, 0.5));
        }
        50% {
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8));
        }
    }
`;
document.head.appendChild(glowStyle);

// ===========================
// NAVIGATION FUNCTIONALITY
// ===========================

// Get navigation elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===========================
// COURSE CARD TOGGLE
// ===========================

function toggleCourse(button) {
    const courseCard = button.closest('.course-card');
    const courseContent = courseCard.querySelector('.course-content');
    const toggleBtn = courseCard.querySelector('.toggle-btn');
    
    // Toggle active class
    courseContent.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    
    // Smooth scroll to course card if opening
    if (courseContent.classList.contains('active')) {
        setTimeout(() => {
            courseCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// ===========================
// PDF DOWNLOAD FUNCTIONALITY
// ===========================

function downloadPDF(courseName) {
    // Map course names to PDF filenames
    const pdfFiles = {
        'c-programming': 'C_Programming_Notes.pdf',
        'html': 'HTML_Course_Notes.pdf',
        'python': 'Python_Programming_Notes.pdf',
        'java': 'Java_Programming_Notes.pdf',
        'cpp': 'CPP_Programming_Notes.pdf'
    };
    
    const courseNames = {
        'c-programming': 'C Programming',
        'html': 'HTML',
        'python': 'Python Programming',
        'java': 'Java Programming',
        'cpp': 'C++ Programming'
    };
    
    const pdfFile = pdfFiles[courseName];
    const displayName = courseNames[courseName] || courseName;
    
    if (pdfFile) {
        // Create download link
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = pdfFile;
        link.click();
        
        // Show success notification
        showNotification(
            `Download Started`,
            `Downloading ${displayName} course notes (PDF). Check your downloads folder!`,
            'success'
        );
    } else {
        // Show error if PDF not found
        showNotification(
            `PDF Not Found`,
            `${displayName} course notes are currently unavailable. Please try again later.`,
            'error'
        );
    }
}

// ===========================
// QUIZ FUNCTIONALITY
// ===========================

function startQuiz(courseName) {
    // This is a placeholder function
    // In a real application, you would redirect to quiz page or open quiz modal
    
    const courseNames = {
        'c-programming': 'C Programming',
        'html': 'HTML',
        'python': 'Python Programming',
        'java': 'Java Programming',
        'cpp': 'C++ Programming'
    };
    
    const displayName = courseNames[courseName] || courseName;
    
    // Show notification
    showNotification(
        `Quiz Coming Soon`,
        `${displayName} quiz will be available soon. Check back later or subscribe to our YouTube channel for updates!`,
        'info'
    );
    
    // In production, you would use:
    // window.location.href = `/quiz/${courseName}`;
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(title, message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1.5rem;
            background: var(--dark-card);
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-success {
            border-left-color: var(--success);
        }
        
        .notification-error {
            border-left-color: var(--error);
        }
        
        .notification-info {
            border-left-color: var(--primary-color);
        }
        
        .notification-content strong {
            display: block;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .notification-content p {
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.6;
        }
        
        .notification-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: var(--transition-fast);
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.message) {
        showFormResponse('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormResponse('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real application, you would send this to a backend server
    // For demonstration, we'll simulate a successful submission
    
    try {
        // Simulate API call
        await simulateFormSubmission(formData);
        
        // Show success message
        showFormResponse(
            'Thank you for your message! We will get back to you soon.',
            'success'
        );
        
        // Also show notification
        showNotification(
            'Message Sent!',
            'We have received your message and will respond shortly.',
            'success'
        );
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        showFormResponse(
            'Sorry, there was an error sending your message. Please try again or contact us directly via email.',
            'error'
        );
    }
});

// Simulate form submission (replace with actual backend call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log('Form submitted:', data);
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 1000);
    });
}

// Show form response message
function showFormResponse(message, type) {
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formResponse.style.display = 'none';
    }, 5000);
}

// ===========================
// BACK TO TOP BUTTON
// ===========================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for # only
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// CODE RAIN EFFECT (MATRIX STYLE)
// ===========================

function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    if (!codeRain) return;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]();=+-*/%';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = `${i * 20}px`;
        column.style.top = `${Math.random() * -500}px`;
        column.style.animation = `fall ${5 + Math.random() * 10}s linear infinite`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        for (let j = 0; j < 20; j++) {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.opacity = Math.random() * 0.5;
            column.appendChild(char);
        }
        
        codeRain.appendChild(column);
    }
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize code rain on load
window.addEventListener('load', createCodeRain);

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all course cards and service cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.course-card, .service-card, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================
// FLOATING ELEMENTS ANIMATION
// ===========================

const floatingElements = document.querySelectorAll('.floating-element');

floatingElements.forEach((element, index) => {
    // Random movement for each element
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + (index * 500));
});

// ===========================
// TYPING EFFECT FOR HERO SUBTITLE
// ===========================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const originalText = subtitle.textContent;
//     typeWriter(subtitle, originalText, 30);
// });

// ===========================
// STATS COUNTER ANIMATION
// ===========================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('h3');
            const originalText = statNumber.textContent;
            const number = parseInt(originalText);
            
            if (!isNaN(number)) {
                animateCounter(statNumber, number);
            }
            
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// PREVENT FORM RESUBMISSION
// ===========================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║         HA CODE LAB WEBSITE          ║
║                                       ║
║   Created by: Hafidh Omar Othman     ║
║   YouTube: @hacodelab                ║
║                                       ║
║   Learn Programming & ICT Skills     ║
║                                       ║
╚═══════════════════════════════════════╝
`);

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images (if you add images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
