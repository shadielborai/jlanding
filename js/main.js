// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Chat simulation initialization
if (document.getElementById('chatMessages')) {
    const chatMessages = document.getElementById('chatMessages');
    const aiGreeting = document.getElementById('aiGreeting');
    const aiGreetingText = document.getElementById('aiGreetingText');
    const userMessage = document.getElementById('userMessage');
    const userMessageText = document.getElementById('userMessageText');
    const typingMessage = document.getElementById('typingMessage');
    const aiResponse = document.getElementById('aiResponse');
    const aiResponseText = document.getElementById('aiResponseText');
    const chatInput = document.getElementById('chatInput');
    
    const conversations = [
        {
            greeting: 'Hello! How can I help you today?',
            user: 'Help me find a job in NYC that actually fits me',
            ai: 'I can help you find targeted job opportunities in NYC! I\'ll analyze your skills and preferences to match you with roles that align with your career goals. Let me start by understanding your background and what you\'re looking for.'
        },
        {
            greeting: 'What\'s on your mind today?',
            user: 'Can you make my profile look more professional?',
            ai: 'Absolutely! I can help optimize your professional profile by analyzing your experience, highlighting key achievements, and suggesting improvements to make you stand out to recruiters. Let\'s enhance your professional brand together.'
        },
        {
            greeting: 'Hi there! What can I assist you with?',
            user: 'Put together a CV for me that\'s tailored to this job.',
            ai: 'Perfect! I\'ll create a customized, ATS-friendly CV that highlights your most relevant experience for this specific position. Just share the job description, and I\'ll tailor your CV to match the requirements and keywords.'
        },
        {
            greeting: 'Hey! Ready to boost your career?',
            user: 'Write me a cover letter for this one.',
            ai: 'I\'d be happy to craft a compelling cover letter that showcases why you\'re the perfect fit for this role. I\'ll personalize it based on the job requirements and your background to help you make a strong impression.'
        }
    ];
    
    let currentConversationIndex = 0;
    
    function showNextConversation() {
        const conversation = conversations[currentConversationIndex];
        
        // Smoothly update greeting message
        aiGreetingText.style.opacity = '0';
        setTimeout(() => {
            aiGreetingText.textContent = conversation.greeting;
            aiGreetingText.style.opacity = '1';
        }, 150);
        
        // Type user message
        userMessageText.textContent = '';
        userMessage.style.display = 'flex';
        
        let userText = '';
        let userIndex = 0;
        
        function typeUserMessage() {
            if (userIndex < conversation.user.length) {
                userText += conversation.user[userIndex];
                userMessageText.textContent = userText;
                userIndex++;
                setTimeout(typeUserMessage, 30);
            } else {
                // Show typing indicator after user message
                setTimeout(() => {
                    typingMessage.style.display = 'flex';
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Show AI response after typing delay
                    setTimeout(() => {
                        typingMessage.style.display = 'none';
                        aiResponse.style.display = 'flex';
                        
                        // Type AI response
                        let aiText = '';
                        let aiIndex = 0;
                        aiResponseText.textContent = '';
                        
                        function typeAIMessage() {
                            if (aiIndex < conversation.ai.length) {
                                aiText += conversation.ai[aiIndex];
                                aiResponseText.textContent = aiText;
                                aiIndex++;
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                                setTimeout(typeAIMessage, 20);
                            } else {
                                // Wait before starting next conversation
                                setTimeout(() => {
                                    // Hide all messages including greeting
                                    aiGreeting.style.display = 'none';
                                    userMessage.style.display = 'none';
                                    aiResponse.style.display = 'none';
                                    currentConversationIndex = (currentConversationIndex + 1) % conversations.length;
                                    
                                    setTimeout(() => {
                                        // Show greeting again for next conversation
                                        aiGreeting.style.display = 'flex';
                                        showNextConversation();
                                    }, 1000);
                                }, 3000);
                            }
                        }
                        
                        setTimeout(typeAIMessage, 500);
                    }, 1500);
                }, 500);
            }
        }
        
        // Start typing user message after a delay
        setTimeout(typeUserMessage, 1000);
    }
    
    // Start the conversation cycle
    setTimeout(() => {
        showNextConversation();
    }, 2000);
    
    // Handle chat input (just for show)
    const chatForm = document.getElementById('chatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Redirect to the actual app for real interaction
            window.open('https://app.jobesta.com/login', '_blank');
        });
    }
}

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
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

// Newsletter form validation
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterBtn = document.getElementById('newsletterBtn');

if (newsletterEmail && newsletterBtn) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email on input
    newsletterEmail.addEventListener('input', (e) => {
        const email = e.target.value;
        if (emailRegex.test(email)) {
            newsletterBtn.disabled = false;
            newsletterEmail.style.borderColor = 'var(--jobesta-green)';
        } else {
            newsletterBtn.disabled = true;
            if (email.length > 0) {
                newsletterEmail.style.borderColor = 'var(--jobesta-red)';
            } else {
                newsletterEmail.style.borderColor = 'var(--jobesta-gray-70)';
            }
        }
    });

    // Handle form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmail.value;
            
            if (emailRegex.test(email)) {
                // Show success message (in production, this would send to backend)
                const originalText = newsletterBtn.textContent;
                newsletterBtn.textContent = 'Subscribed!';
                newsletterBtn.style.background = 'var(--jobesta-green)';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    newsletterEmail.value = '';
                    newsletterBtn.textContent = originalText;
                    newsletterBtn.style.background = '';
                    newsletterBtn.disabled = true;
                    newsletterEmail.style.borderColor = 'var(--jobesta-gray-70)';
                }, 3000);
            }
        });
    }
}

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Parallax effect for hero section (subtle)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Add loading state for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Skip if it's an external link
        if (this.href && this.href.includes('app.jobesta.com')) {
            return;
        }
        
        // Skip if already loading
        if (this.classList.contains('loading')) {
            e.preventDefault();
            return;
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Jobesta Landing Page Loaded');
});