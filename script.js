/* ================================
   CSS & Figma Auto Layout Guide
   JavaScript - Interactive Features
   ================================ */

// ========== DOM Ready ==========
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
    initSmoothScroll();
    initGapSlider();
    initDirectionControls();
    initJustifyContent();
    initAlignItems();
    initFlexWrap();
    initNavbarHighlight();
});

// ========== Scroll to Top Button ==========
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}

// ========== Smooth Scroll for Anchor Links ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar-custom')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== Gap Slider Interactive Demo ==========
function initGapSlider() {
    const gapSlider = document.getElementById('gapSlider');
    const gapValue = document.getElementById('gapValue');
    const gapDemo = document.getElementById('gapDemo');
    
    if (!gapSlider || !gapValue || !gapDemo) return;
    
    gapSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        gapValue.textContent = value + 'px';
        gapDemo.style.gap = value + 'px';
        
        // Add visual feedback
        gapDemo.style.transition = 'gap 0.3s ease';
    });
}

// ========== Direction Controls (Flex Direction) ==========
function initDirectionControls() {
    const directionButtons = document.querySelectorAll('[data-direction]');
    const directionDemo = document.getElementById('directionDemo');
    const directionValue = document.getElementById('directionValue');
    
    if (!directionDemo || !directionValue) return;
    
    directionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.getAttribute('data-direction');
            
            // Update active button
            directionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update demo
            directionDemo.style.flexDirection = direction;
            directionValue.textContent = direction;
            
            // Adjust demo container for better visualization
            if (direction.includes('column')) {
                directionDemo.style.maxWidth = '300px';
                directionDemo.style.margin = '0 auto';
            } else {
                directionDemo.style.maxWidth = '';
                directionDemo.style.margin = '';
            }
            
            // Add transition
            directionDemo.style.transition = 'all 0.4s ease';
        });
    });
}

// ========== Justify Content Interactive Demo ==========
function initJustifyContent() {
    const justifySelect = document.getElementById('justifySelect');
    const justifyDemo = document.getElementById('justifyDemo');
    const justifyValue = document.getElementById('justifyValue');
    
    if (!justifySelect || !justifyDemo || !justifyValue) return;
    
    justifySelect.addEventListener('change', function() {
        const value = this.value;
        
        // Update demo
        justifyDemo.style.justifyContent = value;
        justifyValue.textContent = value;
        
        // Remove gap for space-* values for better visualization
        if (value.startsWith('space-')) {
            justifyDemo.style.gap = '0';
        } else {
            justifyDemo.style.gap = '15px';
        }
        
        // Add transition
        justifyDemo.style.transition = 'all 0.4s ease';
    });
}

// ========== Align Items Interactive Demo ==========
function initAlignItems() {
    const alignSelect = document.getElementById('alignSelect');
    const alignDemo = document.getElementById('alignDemo');
    const alignValue = document.getElementById('alignValue');
    
    if (!alignSelect || !alignDemo || !alignValue) return;
    
    alignSelect.addEventListener('change', function() {
        const value = this.value;
        
        // Update demo
        alignDemo.style.alignItems = value;
        alignValue.textContent = value;
        
        // Add transition
        alignDemo.style.transition = 'all 0.4s ease';
        
        // Reset item heights for stretch
        const items = alignDemo.querySelectorAll('.demo-flex-item');
        items.forEach((item, index) => {
            if (value === 'stretch') {
                item.style.height = '';
                item.style.padding = '2rem';
            } else if (value === 'baseline') {
                // Different font sizes for baseline demo
                const sizes = ['0.8rem', '1.5rem', '1rem'];
                item.style.fontSize = sizes[index] || '1rem';
            } else {
                item.style.fontSize = '';
                item.style.height = '';
            }
        });
    });
}

// ========== Flex Wrap Toggle ==========
function initFlexWrap() {
    const wrapToggle = document.getElementById('wrapToggle');
    const wrapDemo = document.getElementById('wrapDemo');
    const wrapValue = document.getElementById('wrapValue');
    
    if (!wrapToggle || !wrapDemo || !wrapValue) return;
    
    const originalCount = wrapDemo.children.length;
    const expandedCount = originalCount + 8;
    const addIntervalMs = 120;
    let addIntervalId;
    
    const createItem = (index) => {
        const item = document.createElement('div');
        item.className = 'demo-flex-item';
        item.style.minWidth = '120px';
        item.textContent = `Item ${index}`;
        item.style.opacity = '0';
        item.style.transition = 'opacity 200ms ease';
        return item;
    };
    
    const ensureExpandedItems = () => {
        clearInterval(addIntervalId);
        let nextIndex = wrapDemo.children.length + 1;
        addIntervalId = setInterval(() => {
            if (wrapDemo.children.length >= expandedCount) {
                clearInterval(addIntervalId);
                return;
            }
            const item = createItem(nextIndex);
            wrapDemo.appendChild(item);
            requestAnimationFrame(() => {
                item.style.opacity = '1';
            });
            nextIndex += 1;
        }, addIntervalMs);
    };
    
    const resetItems = () => {
        clearInterval(addIntervalId);
        while (wrapDemo.children.length > originalCount) {
            wrapDemo.removeChild(wrapDemo.lastElementChild);
        }
    };
    
    wrapToggle.addEventListener('change', function() {
        const isChecked = this.checked;
        if (isChecked) {
            wrapDemo.style.flexWrap = 'wrap';
            wrapValue.textContent = 'wrap';
            ensureExpandedItems();
        } else {
            wrapDemo.style.flexWrap = 'nowrap';
            wrapValue.textContent = 'nowrap';
            resetItems();
        }
    });
}

// ========== Navbar Active Link Highlight ==========
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== Copy Code to Clipboard ==========
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.setAttribute('aria-label', 'Copy code');
        
        // Add button to code block
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        // Copy functionality
        copyBtn.addEventListener('click', function() {
            const code = block.innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                // Show success feedback
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.color = '#98c379';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
            });
        });
    });
}

// ========== Animate on Scroll (Optional Enhancement) ==========
function initAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.concept-card, .case-study, .property-showcase');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========== Interactive Grid Demo ==========
function initGridDemo() {
    const gridItems = document.querySelectorAll('.demo-grid-item');
    
    gridItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add staggered animation on load
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========== Keyboard Navigation Enhancement ==========
function initKeyboardNav() {
    // Navigate sections with arrow keys
    let currentSectionIndex = 0;
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    document.addEventListener('keydown', (e) => {
        // Alt + Arrow Up/Down for section navigation
        if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            
            if (e.key === 'ArrowDown') {
                currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
            } else {
                currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
            }
            
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
        
        // Home key - scroll to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ========== Theme Toggle (Optional Feature) ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        this.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// ========== Performance Optimization ==========
// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== Loading Animation ==========
window.addEventListener('load', () => {
    // Hide loader if exists
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Initialize optional features
    initAnimateOnScroll();
    initGridDemo();
    initKeyboardNav();
    initCodeCopy();
});

// ========== Error Handling ==========
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ========== Utility Functions ==========

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get CSS variable value
function getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Set CSS variable value
function setCSSVariable(variable, value) {
    document.documentElement.style.setProperty(variable, value);
}

// ========== Export for Module Usage (if needed) ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollToTop,
        initSmoothScroll,
        initGapSlider,
        initDirectionControls,
        debounce,
        throttle
    };
}

// ========== Console Welcome Message ==========
console.log(
    '%c🎨 CSS & Figma Auto Layout Guide',
    'font-size: 20px; font-weight: bold; color: #F24E1E;'
);
console.log(
    '%cBem-vindo! Este guia interativo foi desenvolvido para ajudar designers e desenvolvedores.',
    'font-size: 12px; color: #1572B6;'
);
console.log(
    '%cDica: Use Alt + Seta para navegar entre seções!',
    'font-size: 11px; font-style: italic; color: #718096;'
);
