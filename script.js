
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(section => {
      if (section.id !== 'contact') {
        section.style.display = 'none';
      }
    });

    const target = document.getElementById(id);
    if (target && target.id !== 'contact') {
      target.style.display = 'block';
    }
  }

  // Show 'home' by default
  showSection('home');

  // Handle nav bar buttons
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      showSection(id);
    });
  });

  // Handle all internal links like #taylor, #internship, etc.
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').substring(1);
      const targetAnchor = document.getElementById(id);

      if (targetAnchor && !targetAnchor.closest('#portfolio')) return; // Let it scroll if it's outside portfolio

      e.preventDefault();
      showSection('portfolio');

      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    });
  });
const scrollBtn = document.getElementById('scrollToTopBtn');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
  });
