const words = document.querySelectorAll('.word');
const blanks = document.querySelectorAll('.blank');
const submitButton = document.querySelector('button');

const correctAnswers = [
    ["guide", "empower"], // Sentence 1 correct answers
    ["mentor", "understand"], // Sentence 2 correct answers
    ["develop", "nurture"], // Sentence 3 correct answers
    ["lead", "inspire"] // Sentence 4 correct answers
];

const toxicAnswers = [
    ["ignore", "discourage"], // Sentence 1 toxic answers
    ["command", "criticize"], // Sentence 2 toxic answers
    ["hinder", "neglect"], // Sentence 3 toxic answers
    ["dominate", "force"] // Sentence 4 toxic answers
];

// Handle dragging the word
words.forEach(word => {
    word.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

// Handle dropping the word
blanks.forEach(blank => {
    blank.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    blank.addEventListener('drop', (e) => {
        e.preventDefault();
        const wordId = e.dataTransfer.getData('text/plain');
        const draggedWord = document.getElementById(wordId);

        if (blank.firstChild) {
            document.querySelector('.drag-area').appendChild(blank.firstChild);
        }

        blank.appendChild(draggedWord);
    });

    blank.addEventListener('click', () => {
        if (blank.firstChild) {
            document.querySelector('.drag-area').appendChild(blank.firstChild);
        }
    });
});

// Submit answer and calculate score
submitButton.addEventListener('click', () => {
    let score2 = 0;
    let negativeScore2 = 0;
    const userAnswers2 = [];

    blanks.forEach((blank, index) => {
        if (blank.firstChild) {
            const userWord = blank.firstChild.textContent.trim();
            userAnswers2.push(userWord);

            if (correctAnswers[index].includes(userWord)) {
                score2++;
            } else if (toxicAnswers[index].includes(userWord)) {
                negativeScore2++;
            }
        } else {
            userAnswers2.push("");
        }
    });

    // ✅ FIXED: Properly store the Round 2 score now!
    localStorage.setItem('score2', score2);
    localStorage.setItem('negativeScore2', negativeScore2);
    localStorage.setItem('userAnswers2', JSON.stringify(userAnswers2));

    // ✅ Redirect to results2.html
    window.location.href = 'results2.html';
});
