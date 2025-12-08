const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const movesEl = document.getElementById("moves");

let startTime = null;
let timerInterval = null;
let gameStarted = false;

function startTimer() {
    startTime = Date.now();

    timerInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime; 

        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const milliseconds = Math.floor((elapsed % 1000) / 10); 
        // format:  mm:ss:ms
        timeEl.textContent =
            String(minutes).padStart(2, '0') + ":" +
            String(seconds).padStart(2, '0') + ":" +
            String(milliseconds).padStart(2, '0');

    }, 50);
}    

function stopTimer() {
    clearInterval(timerInterval);
}

let baseEmojis = ["🐶", "🐱", "🐼", "🐸", "🦊", "🐯", "🐷", "💩"];
let emojis = [...baseEmojis, ...baseEmojis];
emojis.sort(() => Math.random() - 0.5);

let firstCard = null;
let lock = false;
let score = 0;
let moves = 0;

emojis.forEach(emoji => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">❓</div>
            <div class="card-back">${emoji}</div>
        </div>
    `;

    card.dataset.emoji = emoji;

    card.addEventListener("click", () => {

        if (!gameStarted) {
            gameStarted = true;
            startTimer();
        }

        if (lock || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
        } else {

            moves++;
            movesEl.textContent = moves;

            if (firstCard.dataset.emoji === card.dataset.emoji) {
                score++;
                scoreEl.textContent = score;
                firstCard = null;

                if (score === 8) {
                    stopTimer();
                    setTimeout(() => {
                        alert("Bạn thắng! Thời gian: " + timeEl.textContent + " | Lượt: " + moves);
                    }, 300);
                }
            } else {
                lock = true;
                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    card.classList.remove("flipped");
                    firstCard = null;
                    lock = false;
                }, 800);
            }
        }
    });

    game.appendChild(card);
});

document.getElementById("resetBtn").addEventListener("click", resetGame);

function resetGame() {
    stopTimer();
    timeEl.textContent = "00:00:00";
    gameStarted = false;

    moves = 0;
    movesEl.textContent = moves;

    score = 0;
    scoreEl.textContent = score;

    firstCard = null;
    lock = false;

    game.innerHTML = "";

    emojis = [...baseEmojis, ...baseEmojis];
    emojis.sort(() => Math.random() - 0.5);

    emojis.forEach(emoji => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;

        card.dataset.emoji = emoji;

        card.addEventListener("click", () => {
            if (!gameStarted) {
                gameStarted = true;
                startTimer();
            }

            if (lock || card.classList.contains("flipped")) return;

            card.classList.add("flipped");

            if (!firstCard) {
                firstCard = card;

            } else {
                moves++;
                movesEl.textContent = moves;

                if (firstCard.dataset.emoji === card.dataset.emoji) {
                    score++;
                    scoreEl.textContent = score;
                    firstCard = null;

                    if (score === 8) {
                        stopTimer();
                        setTimeout(() => {
                            alert("Bạn thắng! Thời gian: " + timeEl.textContent + " | Lượt: " + moves);
                        }, 300);
                    }

                } else {
                    lock = true;
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        card.classList.remove("flipped");
                        firstCard = null;
                        lock = false;
                    }, 800);
                }
            }
        });

        game.appendChild(card);
    });
}