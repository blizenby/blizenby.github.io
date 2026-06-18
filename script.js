document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
 
  // Smooth-scroll for nav links and any other in-page anchor links
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
 
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
 
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
 
  // Highlight the nav link for the section currently in view
  const sections = document.querySelectorAll('.section');
 
  function setActiveNavLink() {
    let currentId = sections[0]?.id || '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) {
        currentId = section.id;
      }
    });
 
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      link.classList.toggle('active', href === currentId);
    });
  }
 
  window.addEventListener('scroll', setActiveNavLink);
  setActiveNavLink();
 
  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollToTopBtn');
 
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
 
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
