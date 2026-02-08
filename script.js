/* ==========================================
   HA CODE LAB - JAVASCRIPT FUNCTIONALITY
   Author: HAFIDH OMAR OTHMAN
   ========================================== */

// ==========================================
// INITIALIZATION - Run when DOM is loaded
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeBackToTop();
    initializeContactForm();
    initializeAnimations();
});

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect - add shadow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon between bars and times
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==========================================
// COURSE DETAILS TOGGLE
// ==========================================
function toggleCourse(courseId) {
    const courseDetails = document.getElementById(`${courseId}-details`);
    const allCourseDetails = document.querySelectorAll('.course-details');
    
    // Close all other course details
    allCourseDetails.forEach(detail => {
        if (detail.id !== `${courseId}-details`) {
            detail.classList.remove('active');
        }
    });
    
    // Toggle the clicked course
    if (courseDetails) {
        courseDetails.classList.toggle('active');
        
        // Scroll to the course details smoothly
        if (courseDetails.classList.contains('active')) {
            setTimeout(() => {
                courseDetails.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    }
}

// ==========================================
// SCROLL EFFECTS AND ANIMATIONS
// ==========================================
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        observer.observe(card);
    });

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Observe info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        observer.observe(item);
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Create mailto link
            const subject = encodeURIComponent('Contact from HA Code Lab Website');
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );
            
            const mailtoLink = `mailto:hafidhomar167@gmail.com?subject=${subject}&body=${body}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Show success message
            showFormMessage('Opening your email client... If it doesn\'t open automatically, please email us directly at hafidhomar167@gmail.com', 'success');

            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message (success or error)
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ==========================================
// ANIMATIONS ON LOAD
// ==========================================
function initializeAnimations() {
    // Add staggered animation to hero stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });

    // Add animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${0.3 + index * 0.1}s`;
        btn.classList.add('fade-in');
    });
}

// ==========================================
// TYPING EFFECT FOR CODE WINDOW (OPTIONAL)
// ==========================================
function typeCodeEffect() {
    const codeElement = document.querySelector('.window-content code');
    
    if (codeElement) {
        const originalCode = codeElement.innerHTML;
        codeElement.innerHTML = '';
        
        let i = 0;
        const speed = 20; // milliseconds per character
        
        function typeWriter() {
            if (i < originalCode.length) {
                codeElement.innerHTML += originalCode.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing effect after page loads
        setTimeout(typeWriter, 1000);
    }
}

// Uncomment the line below if you want the typing effect
// window.addEventListener('load', typeCodeEffect);

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        // Create subtle parallax effect
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================
function updateFooterYear() {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', currentYear);
        }
    });
}

// Update year on page load
window.addEventListener('load', updateFooterYear);

// ==========================================
// KEYBOARD ACCESSIBILITY IMPROVEMENTS
// ==========================================
document.addEventListener('keydown', function(e) {
    // Close course details with Escape key
    if (e.key === 'Escape') {
        const activeCourseDetails = document.querySelector('.course-details.active');
        if (activeCourseDetails) {
            activeCourseDetails.classList.remove('active');
        }
    }
});

// ==========================================
// SMOOTH SCROLL INDICATOR FUNCTIONALITY
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
            coursesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ==========================================
// CONSOLE MESSAGE (EASTER EGG)
// ==========================================
console.log('%c👨‍💻 HA Code Lab - Learn Programming & ICT Skills', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cWebsite Created by HAFIDH OMAR OTHMAN', 'color: #ff6b35; font-size: 14px;');
console.log('%cInterested in learning? Visit: https://youtube.com/@hacodelab', 'color: #7c3aed; font-size: 12px;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event handlers
const debouncedScroll = debounce(function() {
    // Add any scroll-heavy operations here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// ANALYTICS AND TRACKING (PLACEHOLDER)
// ==========================================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        
        // Add your analytics code here
        // Example: gtag('event', 'button_click', { button_name: buttonText });
    });
});

// Track course card interactions
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', function() {
        const courseName = this.querySelector('h3').textContent;
        console.log(`Course viewed: ${courseName}`);
        
        // Add your analytics code here
    });
});

// ==========================================
// LOCAL STORAGE FOR USER PREFERENCES
// ==========================================

// Save scroll position
window.addEventListener('beforeunload', function() {
    localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position
window.addEventListener('load', function() {
    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
    }
});

// ==========================================
// COOKIE CONSENT (OPTIONAL PLACEHOLDER)
// ==========================================
function showCookieConsent() {
    // Check if user has already consented
    if (!localStorage.getItem('cookieConsent')) {
        // You can implement a cookie consent banner here
        console.log('Cookie consent not set');
        
        // For now, just set it automatically
        localStorage.setItem('cookieConsent', 'accepted');
    }
}

// ==========================================
// ERROR HANDLING
// ==========================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.message);
    // You can send error reports to your server here
});

// ==========================================
// LOADING ANIMATION (OPTIONAL)
// ==========================================
window.addEventListener('load', function() {
    // Hide loading screen if you have one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ==========================================
// RESPONSIVE FONT SIZE ADJUSTMENT
// ==========================================
function adjustFontSize() {
    const width = window.innerWidth;
    const root = document.documentElement;
    
    // Adjust base font size for very small screens
    if (width < 375) {
        root.style.fontSize = '14px';
    } else if (width < 768) {
        root.style.fontSize = '15px';
    } else {
        root.style.fontSize = '16px';
    }
}

// Adjust on load and resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', debounce(adjustFontSize, 250));

// ==========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ==========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
        function() {
            showFormMessage('Copied to clipboard!', 'success');
        },
        function(err) {
            console.error('Could not copy text: ', err);
        }
    );
}

// Add copy functionality to email and phone numbers
document.querySelectorAll('.info-item a[href^="mailto:"], .info-item a[href^="tel:"]').forEach(link => {
    link.addEventListener('dblclick', function(e) {
        e.preventDefault();
        const text = this.textContent;
        copyToClipboard(text);
    });
});

// ==========================================
// PRINT FUNCTIONALITY
// ==========================================
function printPage() {
    window.print();
}

// You can add a print button if needed
// <button onclick="printPage()">Print</button>

// ==========================================
// BROWSER COMPATIBILITY CHECKS
// ==========================================
function checkBrowserCompatibility() {
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        console.warn('CSS Grid is not supported in this browser');
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver is not supported in this browser');
        // Load polyfill if needed
    }
}

window.addEventListener('load', checkBrowserCompatibility);

// ==========================================
// LAZY LOADING FOR IMAGES (IF NEEDED)
// ==========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call if you're using lazy loading
// window.addEventListener('load', lazyLoadImages);

// ==========================================
// DARK MODE TOGGLE (OPTIONAL FEATURE)
// ==========================================
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    
    // Save preference
    const isDarkMode = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference
window.addEventListener('load', function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'false') {
        document.body.classList.add('light-mode');
    }
});

// ==========================================
// SEARCH FUNCTIONALITY (OPTIONAL)
// ==========================================
function searchCourses(query) {
    const courseCards = document.querySelectorAll('.course-card');
    const searchQuery = query.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// END OF JAVASCRIPT FILE
// ==========================================

console.log('%c✅ HA Code Lab Website Initialized Successfully!', 'color: #27c93f; font-size: 14px; font-weight: bold;');
