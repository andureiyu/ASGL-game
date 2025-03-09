function startConfetti2() {
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

    // ✅ Start confetti instantly when the page loads
    createConfetti();
    setInterval(createConfetti, 5000);
}

function getRandomColor() {
    const colors = ['#FF5E5B', '#4CAF50', '#FF5722', '#FFD700', '#2E93E5'];
    return colors[Math.floor(Math.random() * colors.length)];
}


window.addEventListener('load', function() {
    startConfetti2();
});
