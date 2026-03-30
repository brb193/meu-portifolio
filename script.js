document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa Ícones
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

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

    // Inicializa o indicador na aba ativa ao carregar
    const activeTab = document.querySelector('.tab-item.active');
    if (activeTab) {
        // Timeout pequeno para garantir que o navegador calculou as larguras corretamente
        setTimeout(() => updateIndicator(activeTab), 100);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();

            // Atualiza classes das abas
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Atualiza visibilidade das seções
            sections.forEach(s => s.classList.remove('active'));
            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Move o indicador deslizante
            updateIndicator(this);
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

        // Otimização de redimensionamento
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                init();
                // Reposiciona o indicador da nav se o tamanho da tela mudar
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

        // Visibilidade da Aba (Pausa o canvas para economizar bateria)
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
});