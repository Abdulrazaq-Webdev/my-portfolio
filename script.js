// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Simulate form submission (replace with actual form submission)
        const formData = {
          name,
          email,
          subject,
          message
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
  
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Animate project cards when they come into view
    const observeProjects = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observeProjects.observe(card);
    });
  
    // Add typing effect to the hero heading
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
      const originalText = heroHeading.innerHTML;
      const highlightSpan = heroHeading.querySelector('.highlight');
      const highlightText = highlightSpan ? highlightSpan.textContent : '';
      
      // Only apply the effect if there's a highlight span
      if (highlightSpan) {
        // Replace the highlight span with a placeholder
        heroHeading.innerHTML = originalText.replace(
          `<span class="highlight">${highlightText}</span>`,
          '<span class="highlight typing"></span>'
        );
        
        const typingElement = heroHeading.querySelector('.typing');
        let i = 0;
        
        // Typing effect
        function typeWriter() {
          if (i < highlightText.length) {
            typingElement.textContent += highlightText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
      }
    }
  
    // Fix the submit button in the contact form (it has a typo in the HTML)
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    if (submitButton) {
      submitButton.className = 'btn btn-filled';
      submitButton.textContent = 'Send Message';
    }
  
    // Add scroll-to-top button
    const body = document.querySelector('body');
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '45px';
    scrollTopBtn.style.height = '45px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = 'var(--primary)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.zIndex = '999';
    scrollTopBtn.style.boxShadow = 'var(--shadow-md)';
    
    body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Add Font Awesome icons (since they're referenced in the HTML)
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
  });