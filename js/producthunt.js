/**
 * ProductHunt Launch Page JavaScript
 * Handles analytics tracking, interactions, and PH-specific features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Track ProductHunt traffic
    trackProductHuntVisit();

    // Initialize CTA tracking
    initCTATracking();

    // Initialize FAQ tracking
    initFAQTracking();

    // Initialize smooth scroll
    initSmoothScroll();
});

/**
 * Track visits from ProductHunt
 */
function trackProductHuntVisit() {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('ref') || urlParams.get('source');

    // Check if visitor came from ProductHunt
    if (referrer.includes('producthunt.com') || source === 'producthunt' || source === 'ph') {
        // Track with Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'producthunt_visit', {
                'event_category': 'acquisition',
                'event_label': 'ProductHunt Landing Page',
                'referrer': referrer
            });
        }

        // Store PH visitor flag in sessionStorage
        sessionStorage.setItem('ph_visitor', 'true');

        console.log('ProductHunt visitor detected');
    }
}

/**
 * Track CTA button clicks
 */
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn, .ph-link');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            const section = this.closest('section');
            const sectionClass = section ? section.className.split(' ')[0] : 'unknown';

            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'button_text': buttonText,
                    'button_href': buttonHref,
                    'page_section': sectionClass,
                    'is_ph_visitor': sessionStorage.getItem('ph_visitor') === 'true'
                });
            }

            console.log(`CTA clicked: ${buttonText} in ${sectionClass}`);
        });
    });
}

/**
 * Track FAQ interactions
 */
function initFAQTracking() {
    const faqItems = document.querySelectorAll('.ph-faq-item');

    faqItems.forEach((item, index) => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                const question = this.querySelector('.ph-faq-question').textContent.trim();

                // Track with Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'faq_opened', {
                        'event_category': 'engagement',
                        'event_label': question,
                        'faq_index': index + 1,
                        'is_ph_visitor': sessionStorage.getItem('ph_visitor') === 'true'
                    });
                }

                console.log(`FAQ opened: ${question}`);
            }
        });
    });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Track time spent on page (for PH visitors)
 */
let pageLoadTime = Date.now();
let timeTracked = false;

window.addEventListener('beforeunload', function() {
    if (sessionStorage.getItem('ph_visitor') === 'true' && !timeTracked) {
        const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000); // in seconds

        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_time_spent', {
                'event_category': 'engagement',
                'event_label': 'ProductHunt Landing Page',
                'value': timeSpent,
                'is_ph_visitor': true
            });
        }

        timeTracked = true;
    }
});

/**
 * Track scroll depth (for PH visitors)
 */
let maxScrollDepth = 0;
let scrollTracked = false;

window.addEventListener('scroll', function() {
    if (sessionStorage.getItem('ph_visitor') === 'true') {
        const scrollPercentage = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);

        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;
        }

        // Track milestone scroll depths
        if (!scrollTracked) {
            if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                trackScrollDepth(25);
            } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                trackScrollDepth(50);
            } else if (maxScrollDepth >= 75 && maxScrollDepth < 90) {
                trackScrollDepth(75);
            } else if (maxScrollDepth >= 90) {
                trackScrollDepth(90);
                scrollTracked = true;
            }
        }
    }
});

function trackScrollDepth(depth) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `${depth}%`,
            'value': depth,
            'is_ph_visitor': true
        });
    }

    console.log(`Scroll depth: ${depth}%`);
}
