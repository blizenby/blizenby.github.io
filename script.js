document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');
 
  function showSection(id) {
    sections.forEach(section => {
      if (section.id === id) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
 
  // Show 'about-me' by default
  showSection('about-me');
 
  // Handle nav bar buttons
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      showSection(id);
    });
  });
 
  // Handle all internal links like #taylor, #research, etc.
  const internalLinks = document.querySelectorAll('a[href^="#"]');
 
  internalLinks.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').substring(1);
      const targetAnchor = document.getElementById(id);
 
      if (targetAnchor && !targetAnchor.closest('#portfolio')) return;
 
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
 
  // Scroll to top button
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
 
  // =============================================
  // Portfolio Image Galleries
  // =============================================
  function initGalleries() {
    document.querySelectorAll('.project-gallery').forEach(gallery => {
      const track = gallery.querySelector('.gallery-track');
      const dotsContainer = gallery.querySelector('.gallery-dots');
      const images = track.querySelectorAll('img');
      const count = images.length;
 
      if (count <= 1) return; // Single image — no controls needed
 
      let current = 0;
 
      // Build dots
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Photo ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
 
      // Build arrows
      const prev = document.createElement('button');
      prev.className = 'gallery-arrow gallery-arrow--prev';
      prev.innerHTML = '&#8249;';
      prev.setAttribute('aria-label', 'Previous photo');
      prev.addEventListener('click', () => goTo((current - 1 + count) % count));
 
      const next = document.createElement('button');
      next.className = 'gallery-arrow gallery-arrow--next';
      next.innerHTML = '&#8250;';
      next.setAttribute('aria-label', 'Next photo');
      next.addEventListener('click', () => goTo((current + 1) % count));
 
      gallery.appendChild(prev);
      gallery.appendChild(next);
 
      function goTo(index) {
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    });
  }
 
  // Initialize galleries when portfolio section becomes visible
  const portfolioSection = document.getElementById('portfolio');
  let galleriesInitialized = false;
 
  const portfolioObserver = new MutationObserver(() => {
    if (portfolioSection.style.display !== 'none' && !galleriesInitialized) {
      initGalleries();
      galleriesInitialized = true;
    }
  });
 
  portfolioObserver.observe(portfolioSection, { attributes: true, attributeFilter: ['style'] });
});
