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

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        showDetailPage(targetId);
    });
});

// Show detail page
function showDetailPage(pageId) {
    const detailPages = document.getElementById('detail-pages');
    const mainContent = document.querySelector('.main-content');
    
    // Hide all detail pages first
    document.querySelectorAll('.detail-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the requested page
    const targetPage = document.querySelector(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        detailPages.style.display = 'block';
        mainContent.style.display = 'none';
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Hide detail page
function hideDetailPage() {
    const detailPages = document.getElementById('detail-pages');
    const mainContent = document.querySelector('.main-content');
    
    detailPages.style.display = 'none';
    mainContent.style.display = 'block';
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.column, .category-card, .cta-button');
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle browser back button
window.addEventListener('popstate', function() {
    hideDetailPage();
});