document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa Ícones
  lucide.createIcons();

  // 2. Lógica das Abas
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 3. Lógica da Máquina de Escrever
  const textElement = document.getElementById('typewriter');
  const phrases = [
    "Desenvolvedor Backend (PHP & Python)",
    "Engenheiro de Software",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove uma letra
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Adiciona uma letra
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pausa quando termina de escrever
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pausa antes de começar a próxima
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Inicia a digitação
  typeEffect();

  // Adicione isso ao final do seu script.js ou dentro do DOMContentLoaded
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  let lastWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    // Só reinicia se a LARGURA mudar (ignora mudanças de altura da barra do navegador)
    if (window.innerWidth !== lastWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastWidth = window.innerWidth;
      init();
    }
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Seu azul #3b82f6
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          let opacity = 1 - (distance / 150);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  init();
  animate();
});