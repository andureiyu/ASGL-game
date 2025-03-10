const words = document.querySelectorAll('.word');
const blanks = document.querySelectorAll('.blank');
const submitButton = document.querySelector('button');

// Correct and Toxic Answers
const correctAnswers = [
    ["guide", "empower"], // Sentence 1
    ["mentor", "understand"], // Sentence 2
    ["develop", "nurture"], // Sentence 3
    ["lead", "inspire"] // Sentence 4
];

const toxicAnswers = [
    ["ignore", "discourage"], // Sentence 1
    ["command", "criticize"], // Sentence 2
    ["hinder", "neglect"], // Sentence 3
    ["dominate", "force"] // Sentence 4
];

// Handle dragging the word
words.forEach(word => {
    word.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

// Handle dropping the word
blanks.forEach(blank => {
    blank.addEventListener('dragover', (e) => e.preventDefault());

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

// ✅ Submit Answer and Accurately Calculate Score
submitButton.addEventListener('click', () => {
    let score2 = 0;
    let negativeScore2 = 0;

    // ✅ This will now track the user's answers
    blanks.forEach((blank, index) => {
        if (blank.firstChild) {
            const userWord = blank.firstChild.textContent.trim().toLowerCase();

            // ✅ If the word is correct, add score
            if (correctAnswers[index].includes(userWord)) {
                score2++;
            }

            // ✅ If the word is toxic, add negative score
            else if (toxicAnswers[index].includes(userWord)) {
                negativeScore2++;
            }
        }
    });

    // ✅ Save Scores to LocalStorage
    localStorage.setItem('score2', score2);
    localStorage.setItem('negativeScore2', negativeScore2);

    // ✅ Redirect to Results 2
    window.location.href = 'results2.html';
});
