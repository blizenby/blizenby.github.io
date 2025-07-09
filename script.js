
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);

      sections.forEach(section => {
        if (section.id === 'home' || section.id === 'contact') {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = 'block';
      }
    });
  });
  function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  const selected = document.getElementById(id);
  if (selected) {
    selected.style.display = 'block';
  }
}

}
});
