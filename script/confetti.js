function startConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.backgroundColor = getRandomColor();
            confettiContainer.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    createConfetti();
    setInterval(createConfetti, 5000);
}

function getRandomColor() {
    const colors = ['#FF5E5B', '#4CAF50', '#FF5722', '#FFD700', '#2E93E5'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ✅ Automatically trigger confetti only if score is perfect (2/2)
window.onload = function() {
    const score = parseInt(localStorage.getItem('score')) || 0;

    if (score === 2) {
        startConfetti();
    }
};
