let gameOver = false;
let boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const grid = document.getElementById('grid');
let currentRow = 0; // Indeks baris saat ini

// Function to initialize or reset the game
function initGame() {
    gameOver = false;
    message.textContent = 'Choose a box!';
    restartButton.style.display = 'none';
    grid.innerHTML = ''; // Clear grid
    currentRow = 0;

    // Create new 5x5 grid
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        grid.appendChild(row);
        
        // Create boxes for each row
        for (let j = 0; j < 5; j++) {
            const newBox = document.createElement('div');
            newBox.className = 'box';
            row.appendChild(newBox);
        }

        // Randomly select one box to be a skull in each row
        const skullIndex = Math.floor(Math.random() * 5);
        row.children[skullIndex].classList.add('skull');
    }

    boxes = document.querySelectorAll('.box'); // Re-select boxes
}

// Initialize the game
initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        if (gameOver || box.textContent) return;

        if (box.classList.contains('skull')) {
            box.textContent = '💀';
            message.textContent = 'You lost!';
            gameOver = true;
            restartButton.style.display = 'block';
            setTimeout(initGame, 2000); // Restart game after 5 seconds
        } else {
            box.textContent = '🍏';
            box.classList.add('won');
            
            // Check if all boxes in the current row are won
            const startIdx = currentRow * 5;
            const endIdx = startIdx + 5;
            const allWon = Array.from(boxes).slice(startIdx, endIdx).every(box => box.textContent === '🍏');
            
            if (allWon) {
                if (currentRow < 4) {
                    // Move to the next row
                    currentRow++;
                    message.textContent = `You won row ${currentRow + 1}!`;
                    // Add skull to a random box in the next row
                    const nextRowStartIdx = currentRow * 5;
                    const nextSkullIndex = nextRowStartIdx + Math.floor(Math.random() * 5);
                    boxes[nextRowStartIdx + nextSkullIndex].classList.add('skull');
                } else {
                    // Won all rows
                    message.textContent = 'You won the game!';
                    gameOver = true;
                    restartButton.style.display = 'block';
                    setTimeout(initGame, 2000); // Restart game after 5 seconds
                }
            } else {
                message.textContent = 'Choose a box!';
            }
        }
    });
});

// Restart button functionality
restartButton.addEventListener('click', function() {
    initGame();
});
