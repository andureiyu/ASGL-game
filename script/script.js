const words = document.querySelectorAll('.word');
const blanks = document.querySelectorAll('.blank');
const submitButton = document.querySelector('button');

const correctAnswers = ["builds", "encourage"];
const toxicAnswers = ["ignores", "demotivates"];

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

        // Remove any existing word in the blank
        if (blank.firstChild) {
            document.querySelector('.drag-area').appendChild(blank.firstChild);
        }

        // Place the new word
        blank.appendChild(draggedWord);
    });

    // Allow user to remove the word
    blank.addEventListener('click', () => {
        if (blank.firstChild) {
            document.querySelector('.drag-area').appendChild(blank.firstChild);
        }
    });
});

// Submit answer and calculate score based on scenarios
submitButton.addEventListener('click', () => {
    let score = 0;
    let negativeScore = 0;
    const userAnswers = [];

    blanks.forEach(blank => {
        if (blank.firstChild) {
            const userWord = blank.firstChild.textContent.trim();
            userAnswers.push(userWord);

            // Check if it's toxic
            if (toxicAnswers.includes(userWord)) {
                negativeScore++;
            }
        } else {
            userAnswers.push("");
        }
    });

    // ✅ Now calculate the score based on ALL 10 scenarios
    if (
        (userAnswers.includes("builds") && userAnswers.includes("encourage")) ||
        (userAnswers.includes("encourage") && userAnswers.includes("builds"))
    ) {
        // Scenario 1 OR 6 = Perfect Score
        score = 2;
    } 
    else if (
        (userAnswers.includes("builds") && userAnswers.includes("demotivates")) ||
        (userAnswers.includes("demotivates") && userAnswers.includes("builds"))
    ) {
        // Scenario 3 = 1/2 Score
        score = 1;
    }
    else if (
        (userAnswers.includes("demotivates") && userAnswers.includes("encourage")) ||
        (userAnswers.includes("encourage") && userAnswers.includes("demotivates"))
    ) {
        // Scenario 4 = 1/2 Score
        score = 1;
    }
    else if (
        (userAnswers.includes("builds") && userAnswers.includes("ignores")) ||
        (userAnswers.includes("ignores") && userAnswers.includes("builds"))
    ) {
        // Scenario 7 or 8 = 1/2 Score
        score = 1;
    }
    else if (
        (userAnswers.includes("encourage") && userAnswers.includes("ignores")) ||
        (userAnswers.includes("ignores") && userAnswers.includes("encourage"))
    ) {
        // Scenario 9 or 10 = 1/2 Score
        score = 1;
    }
    else {
        // All other scenarios = 0/2
        score = 0;
    }

    // ✅ Store the results
    localStorage.setItem('score', score);
    localStorage.setItem('negativeScore', negativeScore);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    // Redirect to results
    window.location.href = 'results.html';
});
