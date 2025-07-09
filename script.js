
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const allSections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      allSections.forEach(section => {
        if (section.id === "home" || section.id === "contact") {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });

      if (target) {
        target.style.display = "block";
      }
    });
  });
});
