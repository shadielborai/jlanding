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

// Job Search Chat (Section 2)
function initJobSearchChat() {
    const jobSearchUserMessage = document.getElementById('jobSearchUserMessage');
    const jobSearchUserText = document.getElementById('jobSearchUserText');
    const jobSearchTyping = document.getElementById('jobSearchTyping');
    const jobSearchResponse = document.getElementById('jobSearchResponse');
    const jobSearchResponseText = document.getElementById('jobSearchResponseText');
    const jobListings = document.getElementById('jobListings');
    
    if (!jobSearchUserMessage) return;
    
    let chatAnimationPlayed = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chatAnimationPlayed) {
                chatAnimationPlayed = true;
                playJobSearchChat();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const chatSection = document.getElementById('jobSearchChat');
    if (chatSection) {
        observer.observe(chatSection);
    }
    
    function playJobSearchChat() {
        const userQuery = "I need a job that perfectly matches my qualifications and skills, located in London";
        
        // Show and type user message
        jobSearchUserMessage.style.display = 'flex';
        let userText = '';
        let userIndex = 0;
        
        function typeUserMessage() {
            if (userIndex < userQuery.length) {
                userText += userQuery[userIndex];
                jobSearchUserText.textContent = userText;
                userIndex++;
                setTimeout(typeUserMessage, 30);
            } else {
                // Show typing indicator
                setTimeout(() => {
                    jobSearchTyping.style.display = 'flex';
                    
                    // Show AI response after delay
                    setTimeout(() => {
                        jobSearchTyping.style.display = 'none';
                        jobSearchResponse.style.display = 'flex';
                        
                        const aiText = "Perfect! I found a job in London that matches your requirements:";
                        let aiIndex = 0;
                        let currentText = '';
                        
                        function typeAIResponse() {
                            if (aiIndex < aiText.length) {
                                currentText += aiText[aiIndex];
                                jobSearchResponseText.textContent = currentText;
                                aiIndex++;
                                setTimeout(typeAIResponse, 20);
                            } else {
                                // Show job listings after typing
                                setTimeout(() => {
                                    jobListings.style.display = 'block';
                                    jobListings.innerHTML = `
                                        <div class="job-listing-item" style="opacity: 0; animation: fadeIn 0.5s ease forwards;">
                                            <h4>Senior Fullstack Engineer</h4>
                                            <div class="company">Google - London, UK</div>
                                            <div class="description">Build scalable web applications using React and Node.js. Work with cross-functional teams to deliver innovative solutions.</div>
                                            <button class="apply-btn">Apply</button>
                                        </div>
                                    `;
                                }, 500);
                            }
                        }
                        
                        typeAIResponse();
                    }, 1500);
                }, 500);
            }
        }
        
        setTimeout(typeUserMessage, 500);
    }
}

// Typing Effect for Section 4
function initTypingEffect() {
    const typingTitle = document.querySelector('.typing-title');
    const typingDescription = document.querySelector('.typing-description');
    
    if (!typingTitle || !typingDescription) return;
    
    let typingAnimationPlayed = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingAnimationPlayed) {
                typingAnimationPlayed = true;
                startTypingAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const sectionWrapper = document.querySelector('.typing-section-wrapper');
    if (sectionWrapper) {
        observer.observe(sectionWrapper);
    }
    
    function startTypingAnimation() {
        const titleText = typingTitle.getAttribute('data-text');
        const descriptionText = typingDescription.getAttribute('data-text');
        
        // Clear initial content
        typingTitle.textContent = '';
        typingDescription.textContent = '';
        
        // Type in the title and description elements
        let titleIndex = 0;
        let descIndex = 0;
        
        function typeTitle() {
            if (titleIndex <= titleText.length) {
                typingTitle.innerHTML = titleText.substring(0, titleIndex) + '<span class="typing-cursor"></span>';
                titleIndex++;
                setTimeout(typeTitle, 50);
            } else {
                // Remove cursor from title and start typing description
                typingTitle.textContent = titleText;
                setTimeout(typeDescription, 200);
            }
        }
        
        function typeDescription() {
            if (descIndex <= descriptionText.length) {
                typingDescription.innerHTML = descriptionText.substring(0, descIndex) + '<span class="typing-cursor"></span>';
                descIndex++;
                setTimeout(typeDescription, 30);
            } else {
                // Remove cursor after done
                typingDescription.textContent = descriptionText;
            }
        }
        
        setTimeout(typeTitle, 500);
    }
}

// Job Tracker Animation (Section 5)
function initJobTrackerAnimation() {
    const jobTrackerPreview = document.getElementById('jobTrackerPreview');
    const movingCard = document.getElementById('movingCard');
    const viewedCards = document.getElementById('viewedCards');
    const appliedCards = document.getElementById('appliedCards');
    
    if (!jobTrackerPreview || !movingCard) return;
    
    let animationPlayed = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationPlayed) {
                animationPlayed = true;
                playTrackerAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(jobTrackerPreview);
    
    function playTrackerAnimation() {
        setTimeout(() => {
            // Get the exact position of the placeholder in the second row of Applied column
            const placeholder = document.getElementById('placeholderCard');
            if (!placeholder) return;
            
            // Temporarily make placeholder visible ONLY to calculate position (but keep it invisible)
            placeholder.style.height = 'auto';
            placeholder.style.margin = '';
            placeholder.style.padding = '15px';
            placeholder.style.visibility = 'hidden'; // Hidden but takes up space for positioning
            
            // Get positions for horizontal animation
            const startRect = movingCard.getBoundingClientRect();
            const endRect = placeholder.getBoundingClientRect();
            
            // Calculate ONLY horizontal movement (same row level)
            const deltaX = endRect.left - startRect.left;
            const deltaY = 0; // Force no vertical movement
            
            // Apply pure horizontal transform animation
            movingCard.style.position = 'relative';
            movingCard.style.zIndex = '100';
            movingCard.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            movingCard.style.transform = `translateX(${deltaX}px) scale(1.05)`;
            movingCard.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            setTimeout(() => {
                // Reset styles and replace placeholder
                movingCard.style.transition = 'none';
                movingCard.style.transform = '';
                movingCard.style.position = '';
                movingCard.style.boxShadow = '';
                
                // Remove from original position and replace placeholder
                viewedCards.removeChild(movingCard);
                appliedCards.replaceChild(movingCard, placeholder);
                
                // Add highlight effect after placement
                setTimeout(() => {
                    movingCard.style.transition = 'all 0.3s ease';
                    movingCard.style.borderColor = 'var(--jobesta-blue)';
                    movingCard.style.background = 'var(--jobesta-gray-20)';
                    
                    setTimeout(() => {
                        movingCard.style.borderColor = '';
                        movingCard.style.background = '';
                        movingCard.style.zIndex = '';
                    }, 1000);
                }, 50);
            }, 1500);
        }, 1000);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Jobesta Landing Page Loaded');
    
    // Initialize new features
    initJobSearchChat();
    initTypingEffect();
    initJobTrackerAnimation();
});