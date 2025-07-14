
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

  // Show home on load
  showSection('home');

  // Nav bar links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });

  // Timeline links to portfolio subsections
  const timelineLinks = document.querySelectorAll('.timeline a');

  timelineLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const anchorId = link.getAttribute('href').substring(1);

      // 1. Show the portfolio section
      showSection('portfolio');

      // 2. Scroll to the target inside portfolio after a short delay
      setTimeout(() => {
        const targetAnchor = document.getElementById(anchorId);
        if (targetAnchor) {
          targetAnchor.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200); // Wait for section to be visible
    });
  });
});
