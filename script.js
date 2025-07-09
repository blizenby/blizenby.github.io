
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(section => {
      // Only hide sections that are NOT contact
      if (section.id !== 'contact') {
        section.style.display = 'none';
      }
    });

    const target = document.getElementById(id);
    if (target && target.id !== 'contact') {
      target.style.display = 'block';
    }
  }

  // Show home by default on load
  showSection('home');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });
});
