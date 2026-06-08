const emojis = ['🐶','🐱','🐭','🐸','🦊','🐻','🦁','🐯'];

let flipped = [];
let locked = false;
let score = 0;
let moves = 0;

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function initGame() {

    score = 0;
    moves = 0;
    flipped = [];

    document.getElementById("score").textContent = "0";
    document.getElementById("moves").textContent = "0";

    const cards = shuffle([...emojis, ...emojis]);

    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    cards.forEach((emoji) => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = "?";

        card.addEventListener("click", () => flipCard(card));

        grid.appendChild(card);
    });
}

function flipCard(card) {

    if (locked) return;
    if (card.classList.contains("flipped")) return;

    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");

    flipped.push(card);

    if (flipped.length === 2) {

        moves++;
        document.getElementById("moves").textContent = moves;

        checkMatch();
    }
}

function checkMatch() {

    const [card1, card2] = flipped;

    if (card1.dataset.emoji === card2.dataset.emoji) {

        card1.classList.add("matched");
        card2.classList.add("matched");

        score++;
        document.getElementById("score").textContent = score;

        flipped = [];

        if (score === emojis.length) {
            document.getElementById("winBanner").classList.add("show");
        }

    } else {

        locked = true;

        setTimeout(() => {

            card1.textContent = "?";
            card2.textContent = "?";

            card1.classList.remove("flipped");
            card2.classList.remove("flipped");

            flipped = [];
            locked = false;

        }, 1000);
    }
}

initGame();