document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar nav');
  
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
      });
    }
  
    // Glühwürmchen generieren (bleibt wie zuvor)
    const glowWormContainer = document.querySelector('.glow-worm-container');
    const glowWormCount = 50; // Anzahl der Glühwürmchen
  
    for (let i = 0; i < glowWormCount; i++) {
      const glowWorm = document.createElement('div');
      glowWorm.classList.add('glow-worm');
  
      // Zufällige Position und Animationdauer
      glowWorm.style.left = Math.random() * 100 + '%';
      glowWorm.style.top = Math.random() * 100 + '%';
      glowWorm.style.animationDuration = Math.random() * 10 + 5 + 's';
      glowWorm.style.animationDelay = Math.random() * 5 + 's';
  
      glowWormContainer.appendChild(glowWorm);
    }
  
    // Animation beim Scrollen
    const animatedItems = document.querySelectorAll('.animate-on-scroll');
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.animate === 'text') {
            animateText(entry.target);
          }
          entry.target.classList.add('visible');
          // Verzögerung bei Bedarf setzen
          if (entry.target.dataset.delay) {
            entry.target.style.setProperty('--delay', entry.target.dataset.delay);
          }
          observer.unobserve(entry.target); // Beobachtung stoppen, wenn sichtbar
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    animatedItems.forEach(item => {
      observer.observe(item);
    });
  
    // Funktion, um Text in Wörter zu zerlegen und Animation hinzuzufügen
    function animateText(element) {
      const text = element.textContent;
      const words = text.split(' ');
      element.textContent = '';
  
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.classList.add('word');
        span.style.setProperty('--word-index', index);
        element.appendChild(span);
  
        // Leerzeichen hinzufügen, außer nach dem letzten Wort
        if (index < words.length - 1) {
          const space = document.createTextNode(' ');
          element.appendChild(space);
        }
      });
    }
  });
  