// ── Project Data ────────────────────────────────────────────────────────────
// To add/edit a project: find its id below and update title, description,
// and photos array. Add as many photo paths as you like.
const PROJECTS = {
  'marble-sorter': {
    title: 'Marble Sorter',
    description: 'I worked as part of a two-person team to design a machine to sort marbles my color and size. I was responsible for design of the color sorting system (turntables and gates), mechanical integration of stepper motors, servos, and sensors, and the funnel and loading subsystem.',
    photos: ['sorter_photo_1.jpg', 'sorter_photo_2.jpg']
  },
  'pente-game': {
    title: 'Pente Game',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'laser-gun': {
    title: 'Laser Gun',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'statics-bridge': {
    title: 'Statics Bridge',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'hovercraft': {
    title: 'Hovercraft Competition',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'manufacturing': {
    title: 'Manufacturing Methods',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'inverted-pendulum': {
    title: 'Inverted Pendulum',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'airfoil': {
    title: 'Airfoil Simulation & Wind-Tunnel Testing',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'thermal-model': {
    title: 'MATLAB Thermal Model',
    description: 'Coming soon.',
    photos: ['taylor_project1.jpg']
  },
  'dannar': {
    title: 'Dannar',
    description: 'Coming soon.',
    photos: ['dannar_project1.jpg']
  },
  'quantinuum': {
    title: 'Quantinuum',
    description: 'Coming soon.',
    photos: ['dannar_project1.jpg']
  },
  'personal': {
    title: 'Personal Projects',
    description: 'Coming soon.',
    photos: []
  }
};
 
// ── Modal Logic ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const modal       = document.getElementById('projectModal');
  const track       = modal.querySelector('.gallery-track');
  const dotsWrap    = modal.querySelector('.gallery-dots');
  const titleEl     = modal.querySelector('.modal-title');
  const descEl      = modal.querySelector('.modal-desc');
  const closeBtn    = modal.querySelector('.modal-close');
  const prevBtn     = modal.querySelector('.gallery-prev');
  const nextBtn     = modal.querySelector('.gallery-next');
 
  let currentIndex = 0;
  let photos = [];
 
  function openModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;
 
    photos = project.photos;
    currentIndex = 0;
 
    titleEl.textContent = project.title;
    descEl.textContent  = project.description;
 
    // Build gallery slides
    track.innerHTML = photos.map(src =>
      `<div class="gallery-slide"><img src="${src}" alt="${project.title}" /></div>`
    ).join('');
 
    // Build dots
    dotsWrap.innerHTML = photos.map((_, i) =>
      `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Photo ${i + 1}"></button>`
    ).join('');
 
    // Show/hide arrows based on photo count
    const showArrows = photos.length > 1;
    prevBtn.style.display = showArrows ? 'flex' : 'none';
    nextBtn.style.display = showArrows ? 'flex' : 'none';
    dotsWrap.style.display = photos.length > 1 ? 'flex' : 'none';
 
    goToSlide(0);
 
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
 
  function goToSlide(index) {
    currentIndex = (index + photos.length) % photos.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotsWrap.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
 
  // Card clicks
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });
 
  // Close button / overlay click
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
 
  // Arrow buttons
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
 
  // Dot clicks
  dotsWrap.addEventListener('click', e => {
    const dot = e.target.closest('.gallery-dot');
    if (dot) goToSlide(parseInt(dot.dataset.index));
  });
 
  // Keyboard: Escape closes, arrows navigate
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });
 
  // ── Nav smooth scroll ────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
 
  // Active nav highlight
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');
 
  function setActiveNavLink() {
    let currentId = sections[0]?.id || '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 120) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').substring(1) === currentId);
    });
  }
 
  window.addEventListener('scroll', setActiveNavLink);
  setActiveNavLink();
 
  // ── Scroll-to-top ────────────────────────────────────────────────────────
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
 
