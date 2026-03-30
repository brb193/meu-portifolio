document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa Ícones
    lucide.createIcons();

    // 2. Lógica das Abas
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
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
});