/**
 * Name: Avery Killian
 * Date: 10.02.2025
 * CSC 372-01
 *
 * JavaScript for Rock, Paper, Scissors game. Handles user selection,
 * computer "thinking" animation, winner determination, score tracking,
 * and reset functionality.
 */

let score = { wins: 0, losses: 0, ties: 0 };
const moves = ['rock', 'paper', 'scissors'];

const playerImages = document.querySelectorAll('.player-choices img');
const computerImage = document.getElementById('computer-throw');
const outcomeText = document.getElementById('outcome-text');
const winsSpan = document.getElementById('wins');
const lossesSpan = document.getElementById('losses');
const tiesSpan = document.getElementById('ties');
const resetBtn = document.getElementById('reset-btn');

/**
 * Adds event listeners to all player choice images.
 * Highlights selected choice and starts computer turn.
 */
playerImages.forEach(img => {
    img.addEventListener('click', () => {
        playerImages.forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        const playerMove = img.dataset.move;
        startComputerTurn(playerMove);
    });
});

/**
 * Starts the computer's turn by shuffling images for 3 seconds
 * before selecting a random throw.
 * @param {string} playerMove - The player's selected move
 */
function startComputerTurn(playerMove) {
    let count = 0;
    const shuffleInterval = setInterval(() => {
        computerImage.src = `images/${moves[count % 3]}.png`;
        count++;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        const computerMove = moves[Math.floor(Math.random() * 3)];
        computerImage.src = `images/${computerMove}.png`;
        determineWinner(playerMove, computerMove);
    }, 3000);
}

/**
 * Determines the winner of the round and updates the outcome text.
 * @param {string} player - The player's move
 * @param {string} computer - The computer's move
 */
function determineWinner(player, computer) {
    if (player === computer) {
        outcomeText.textContent = "It's a tie!";
        score.ties++;
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        outcomeText.textContent = "You win!";
        score.wins++;
    } else {
        outcomeText.textContent = "Computer wins!";
        score.losses++;
    }
    updateScore();
}

/**
 * Updates the score section with the current score.
 */
function updateScore() {
    winsSpan.textContent = score.wins;
    lossesSpan.textContent = score.losses;
    tiesSpan.textContent = score.ties;
}

/**
 * Resets the game to the initial state and clears the score.
 */
resetBtn.addEventListener('click', () => {
    score = { wins: 0, losses: 0, ties: 0 };
    updateScore();
    outcomeText.textContent = "Make your move!";
    computerImage.src = 'images/question-mark.png';
    playerImages.forEach(i => i.classList.remove('selected'));
});

