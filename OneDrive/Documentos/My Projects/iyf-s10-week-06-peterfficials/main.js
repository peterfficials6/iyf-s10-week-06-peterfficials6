// IYF Season 10 - Week 6 Main Script
// This file handles the main index page functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 IYF Season 10 - Week 6 Complete Collection Loaded');
    console.log('📚 Available Projects:');
    console.log('  🌤️ Weather App - Advanced weather application');
    console.log('  🔄 Task 11: Async JavaScript');
    console.log('  🌐 Task 12: Fetch API');
    
    // Add smooth scrolling to project sections
    const projectSections = document.querySelectorAll('.project-section');
    
    projectSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking for analytics
    const projectBtns = document.querySelectorAll('.project-btn');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const projectName = this.closest('.project-section').querySelector('h2').textContent;
            console.log(`🚀 Opening: ${projectName}`);
        });
    });
    
    // Add interactive feature tags
    const featureTags = document.querySelectorAll('.feature-tag');
    
    featureTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.background = '#48bb78';
            this.style.color = 'white';
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 300);
        });
    });
});

// Add some interactivity
function showMotivationalQuote() {
    const quotes = [
        "Code is like humor. When you have to explain it, it's bad.",
        "First, solve the problem. Then, write the code.",
        "Experience is the name everyone gives to their mistakes.",
        "In order to be irreplaceable, one must always be different.",
        "Java is to JavaScript what car is to Carpet."
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`💡 Quote of the day: "${randomQuote}"`);
}

// Show quote on page load
setTimeout(showMotivationalQuote, 2000);
