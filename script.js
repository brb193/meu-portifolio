document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa Ícones
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Variável Global para o Gráfico ---
  let radarChartInstance = null;

  // 2. Lógica das Abas e Indicador Deslizante
  const tabs = document.querySelectorAll('.tab-item');
  const sections = document.querySelectorAll('.section-content');
  const indicator = document.querySelector('.nav-indicator');

  function updateIndicator(el) {
    if (indicator && el) {
      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.left = `${el.offsetLeft}px`;
    }
  }

  const activeTab = document.querySelector('.tab-item.active');
  if (activeTab) {
    setTimeout(() => updateIndicator(activeTab), 100);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      sections.forEach(s => s.classList.remove('active'));
      const targetId = this.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      updateIndicator(this);

      // Se a aba Habilidades foi clicada, renderiza o gráfico Geral
      if (targetId === 'skills') {
        // Limpa qualquer card que tenha ficado ativo
        document.querySelectorAll('.skill-category').forEach(c => c.classList.remove('active-card'));
        setTimeout(() => renderSkillsChart('geral'), 100);
      }
    });
  });

  // 3. Lógica da Máquina de Escrever
  const textElement = document.getElementById('typewriter');
  const phrases = [
    "Desenvolvedor Backend (PHP & Python)",
    "Engenheiro de Software",
    "Analista de Suporte Cloud"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // 4. Lógica do Canvas (Fundo de Constelação)
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const mouse = { x: null, y: null, radius: 150 };

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
        const active = document.querySelector('.tab-item.active');
        updateIndicator(active);
      }, 200);
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
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      let numberOfParticles = (window.innerWidth < 768) ? 40 : 80;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
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

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connect();
      animationId = requestAnimationFrame(animate);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });

    init();
    animate();
  }

  // 5. Lógica Interativa do Gráfico de Radar (Chart.js)
  const chartDataConfig = {
    geral: {
      labels: ['Backend (PHP/Python)', 'Banco de Dados (SQL)', 'Cloud/Infra', 'Frontend (HTML/CSS)', 'Análise (Power BI)'],
      data: [85, 80, 85, 65, 75]
    },
    backend: {
      labels: ['PHP (Laravel)', 'Python', 'REST APIs', 'Modelagem SQL', 'Análise de Dados'],
      data: [90, 80, 85, 85, 75]
    },
    cloud: {
      labels: ['Monitoramento', 'G. Workspace Admin', 'Automação', 'Segurança', 'Redes Básicas'],
      data: [85, 90, 75, 80, 65]
    },
    frontend: {
      labels: ['HTML5', 'CSS3', 'Integração de APIs', 'Responsividade', 'UI/UX Design'],
      data: [80, 75, 70, 85, 60]
    }
  };

  function renderSkillsChart(category = 'geral') {
    const chartCanvas = document.getElementById('skillsRadar');
    if (!chartCanvas) return;

    if (radarChartInstance) {
      radarChartInstance.destroy();
    }

    const ctx = chartCanvas.getContext('2d');
    const colorBlue = 'rgba(54, 162, 235, 1)';
    const colorBlueBg = 'rgba(54, 162, 235, 0.3)';
    const colorGrid = 'rgba(150, 150, 150, 0.2)';
    const colorText = '#888888';

    const currentData = chartDataConfig[category];

    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: currentData.labels,
        datasets: [{
          label: 'Nível de Domínio (%)',
          data: currentData.data,
          backgroundColor: colorBlueBg,
          borderColor: colorBlue,
          pointBackgroundColor: colorBlue,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colorBlue,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            bodyFont: { family: "'Inter', sans-serif" }
          }
        },
        scales: {
          r: {
            angleLines: { color: colorGrid },
            grid: { color: colorGrid },
            pointLabels: {
              color: colorText,
              font: { family: "'Inter', sans-serif", size: 10, weight: '600' }
            },
            ticks: {
              display: false,
              min: 0,
              max: 100,
              stepSize: 20
            }
          }
        }
      }
    });
  }

  // Event Listeners para os Cards de Habilidades
  const skillCards = document.querySelectorAll('.skill-category');
  
  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active-card')) {
        card.classList.remove('active-card');
        renderSkillsChart('geral');
      } else {
        skillCards.forEach(c => c.classList.remove('active-card'));
        card.classList.add('active-card');
        
        const category = card.getAttribute('data-category');
        renderSkillsChart(category);
      }
    });
  });

});