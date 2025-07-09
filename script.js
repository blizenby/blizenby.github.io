
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(section => {
      section.style.display = 'none';
    });

    const target = document.getElementById(id);
    if (target) {
      target.style.display = 'block';
    }
  }

  // Default: show only home on initial load
  showSection('home');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });
});
