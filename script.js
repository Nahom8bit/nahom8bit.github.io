async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/Nahom8bit/repos');
        const projects = await response.json();
        const projectList = document.getElementById('project-list');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'No description available.'}</p>
                <a href="${project.html_url}" target="_blank">View on GitHub</a>
            `;
            projectList.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save the user's preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for user's preference when the page loads
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('There was an error sending your message. Please try again.');
    }
});

// Sample blog posts data
const blogPosts = [
    { title: 'The Intersection of 3D Design and Architecture', excerpt: 'Exploring how 3D design is revolutionizing architectural visualization...' },
    { title: 'Bridging the Gap Between Design and Development', excerpt: 'My journey as a multidisciplinary professional in the tech industry...' }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogPostsContainer = document.querySelector('.blog-posts');
    blogPosts.forEach(post => {
        const blogPost = document.createElement('div');
        blogPost.className = 'blog-post';
        blogPost.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="#">Read more</a>
        `;
        blogPostsContainer.appendChild(blogPost);
    });
}

// Loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            animateContent();
        }, 500);
    }, 1800); // 1.8 seconds delay
});

// Animate content
function animateContent() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
}

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});

// GSAP animations
function initGSAPAnimations() {
    gsap.from('#home h1', { duration: 1, x: -100, opacity: 0, ease: 'power3.out' });
    gsap.from('#home p', { duration: 1, x: 100, opacity: 0, ease: 'power3.out', delay: 0.5 });
    
    gsap.from('#skills li', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
    renderBlogPosts();
    initGSAPAnimations();
    
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
});

// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});