// Load content configuration and apply to page
function loadContent() {
    const content = window.ContentConfig || {};
    
    // Meta information
    if (content.meta) {
        document.getElementById('page-title').textContent = content.meta.title;
        document.getElementById('page-description').setAttribute('content', content.meta.description);
    }
    
    // Navigation
    if (content.nav) {
        document.getElementById('nav-logo').textContent = content.nav.logo;
        document.getElementById('nav-features').textContent = content.nav.links.features;
        document.getElementById('nav-download').textContent = content.nav.links.download;
        document.getElementById('nav-about').textContent = content.nav.links.about;
        document.getElementById('theme-toggle').setAttribute('aria-label', content.nav.themeToggle);
    }
    
    // Hero section
    if (content.hero) {
        document.getElementById('hero-title-line1').textContent = content.hero.title.line1;
        document.getElementById('hero-title-highlight').textContent = content.hero.title.highlight;
        document.getElementById('hero-subtitle').textContent = content.hero.subtitle;
        document.getElementById('hero-btn-download').textContent = content.hero.buttons.download;
        document.getElementById('hero-btn-source').textContent = content.hero.buttons.sourceCode;
    }
    
    // Features section
    if (content.features) {
        document.getElementById('features-title').textContent = content.features.title;
        document.getElementById('features-subtitle').textContent = content.features.subtitle;
        
        const featureTitles = document.querySelectorAll('.feature-title');
        const featureDescs = document.querySelectorAll('.feature-desc');
        
        content.features.items.forEach((item, index) => {
            if (featureTitles[index]) {
                featureTitles[index].textContent = item.title;
            }
            if (featureDescs[index]) {
                featureDescs[index].textContent = item.description;
            }
        });
    }
    
    // Download section
    if (content.download) {
        document.getElementById('download-title').textContent = content.download.title;
        document.getElementById('download-subtitle').textContent = content.download.subtitle;
        document.getElementById('version-title').textContent = content.download.version.title;
        document.getElementById('version-number').textContent = content.download.version.number;
        document.getElementById('version-date').textContent = content.download.version.date;
        document.getElementById('requirements-title').textContent = content.download.requirements.title;
        document.getElementById('qr-scan-text').textContent = content.download.qr.scanText;
        document.getElementById('qr-github-text').textContent = content.common?.githubReleases || 'GitHub Releases';
        document.getElementById('download-link-text').textContent = content.download.qr.downloadLink;
        
        const requirementsList = document.getElementById('requirements-list');
        if (requirementsList) {
            requirementsList.innerHTML = content.download.requirements.items
                .map(item => `<li>${item}</li>`)
                .join('');
        }
    }
    
    // About section
    if (content.about) {
        document.getElementById('about-title').textContent = content.about.title;
        document.getElementById('about-subtitle').textContent = content.about.subtitle;
        document.getElementById('about-desc-1').textContent = content.about.description[0];
        
        // Hide tech-stack section if it exists
        const techStack = document.getElementById('tech-stack');
        if (techStack) {
            techStack.style.display = 'none';
        }
        
        // Hide the second paragraph if it exists
        const secondParagraph = document.getElementById('about-desc-2');
        if (secondParagraph) {
            secondParagraph.style.display = 'none';
        }
    }
    
    // Footer
    if (content.footer) {
        document.getElementById('footer-logo-name').textContent = content.footer.logo.name;
        document.getElementById('footer-logo-desc').textContent = content.footer.logo.description;
        document.getElementById('footer-links-title').textContent = content.footer.links.title;
        document.getElementById('footer-license-title').textContent = content.footer.license.title;
        document.getElementById('footer-license-text').textContent = content.footer.license.text;
        document.getElementById('footer-copyright').innerHTML = content.footer.copyright;
        
        const footerLinksList = document.getElementById('footer-links-list');
        if (footerLinksList) {
            footerLinksList.innerHTML = content.footer.links.items
                .map(item => {
                    // 如果是 release 链接，不在新标签页打开
                    const target = item.url.startsWith('./') ? '_self' : '_blank';
                    return `<li><a href="${item.url}" target="${target}">${item.text}</a></li>`;
                })
                .join('');
        }
    }
    
    // Common elements
    if (content.common) {
        const appScreenshot = document.getElementById('app-screenshot');
        if (appScreenshot) {
            appScreenshot.setAttribute('alt', content.common.appScreenshotAlt);
        }
    }
}

// Apply content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

// Toggle mobile menu
mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Add copy to clipboard for version
document.addEventListener('DOMContentLoaded', function() {
    const versionElement = document.querySelector('.version');
    if (versionElement) {
        versionElement.style.cursor = 'pointer';
        versionElement.title = '点击复制版本号';
        
        versionElement.addEventListener('click', function() {
            const versionText = this.textContent;
            navigator.clipboard.writeText(versionText).then(() => {
                const originalText = this.textContent;
                this.textContent = '已复制!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
});

// Add download animation
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const phoneMockup = document.querySelector('.phone-mockup');
    const featuresSection = document.getElementById('features');
    
    if (heroImage && window.innerWidth > 768) {
        // Get the position of the features section
        const featuresTop = featuresSection.offsetTop;
        const featuresHeight = featuresSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate when to start fading (when features section comes into view)
        const fadeStart = featuresTop - windowHeight * 0.8;
        const fadeEnd = featuresTop - windowHeight * 0.3;
        
        // Apply parallax effect to hero-image container
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Apply fade effect to phone-mockup
        if (scrolled >= fadeStart && scrolled <= fadeEnd) {
            const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            phoneMockup.style.opacity = 1 - fadeProgress;
            phoneMockup.style.transition = 'opacity 0.1s ease-out';
        } else if (scrolled > fadeEnd) {
            phoneMockup.style.opacity = 0;
        } else {
            phoneMockup.style.opacity = 1;
        }
    }
});

// Memory bar animation
function animateMemoryBar() {
    const memoryUsed = document.querySelector('.memory-used');
    if (memoryUsed) {
        let width = 20;
        const targetWidth = 65;
        const increment = 1;
        
        const interval = setInterval(() => {
            if (width < targetWidth) {
                width += increment;
                memoryUsed.style.width = width + '%';
            } else {
                clearInterval(interval);
                // Reset after a delay
                setTimeout(() => {
                    width = 20;
                    memoryUsed.style.width = width + '%';
                    animateMemoryBar();
                }, 3000);
            }
        }, 30);
    }
}

// Start memory bar animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateMemoryBar, 1000);
});

// Add hover effect for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy load images (if any are added in the future)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add year to footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle?.querySelector('.sun-icon');
const moonIcon = themeToggle?.querySelector('.moon-icon');

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize theme
if (savedTheme) {
    setTheme(savedTheme);
} else if (systemPrefersDark) {
    setTheme('dark');
} else {
    setTheme('light');
}

// Listen for theme toggle clicks
themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});