// IYF Season 10 - Week 6 Main Script
// This file handles the main index page functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 IYF Season 10 - Week 6 Loaded');
    console.log('📚 Available Tasks:');
    console.log('  🔄 Task 11: Async JavaScript');
    console.log('  🌐 Task 12: Fetch API');
    
    // Add smooth scrolling to task sections
    const taskSections = document.querySelectorAll('.task-section');
    
    taskSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking for analytics
    const taskBtns = document.querySelectorAll('.task-btn');
    
    taskBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const taskName = this.closest('.task-section').querySelector('h2').textContent;
            console.log(`🚀 Starting: ${taskName}`);
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
