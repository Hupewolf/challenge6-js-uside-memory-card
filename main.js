const game = document.getElementById("game");
const scoreEl = document.getElementById("score");

let gameStarted = false;

let baseEmojis = ["🐶", "🐱", "🐼", "🐸", "🦊", "🐯", "🐷", "💩"];
let emojis = [...baseEmojis, ...baseEmojis];
emojis.sort(() => Math.random() - 0.5);

let firstCard = null;
let lock = false;
let score = 0;

function createCard(emoji) {
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
        if (!gameStarted) gameStarted = true;
        if (lock || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
        } else {
            if (firstCard.dataset.emoji === card.dataset.emoji) {

                score++;
                scoreEl.textContent = score;
                firstCard = null;

                if (score === 8) {
                    setTimeout(() => {
                        alert("Bạn thắng!");
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

    return card;
}

function resetGame() {
    score = 0;
    scoreEl.textContent = score;

    firstCard = null;
    lock = false;
    gameStarted = false;

    game.innerHTML = "";

    emojis = [...baseEmojis, ...baseEmojis];
    emojis.sort(() => Math.random() - 0.5);

    emojis.forEach(emoji => {
        game.appendChild(createCard(emoji));
    });
}

emojis.forEach(emoji => game.appendChild(createCard(emoji)));

document.getElementById("resetBtn").addEventListener("click", resetGame);