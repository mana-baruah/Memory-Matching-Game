const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
const correctMovesCount = document.querySelector(".correctMovesCount");
const startButton = document.querySelector(".startButton");
const startScreen = document.querySelector(".startScreen");
const gameScreen = document.querySelector(".gameScreen");
let playerLives = 8;
let correctMoves = 0;
let gameEnded = false;

// Set initial lives and correct moves
playerLivesCount.textContent = playerLives;
correctMovesCount.textContent = correctMoves;

// Generate card data
const getData = () => [
    { imgSrc: "./Images/bird.png", name: "bird" },
    { imgSrc: "./Images/blue_pink.png", name: "blue_pink" },
    { imgSrc: "./Images/burger.png", name: "burger" },
    { imgSrc: "./Images/chilli.png", name: "chilli" },
    { imgSrc: "./Images/fire.png", name: "fire" },
    { imgSrc: "./Images/hotdog.png", name: "hotdog" },
    { imgSrc: "./Images/ketchup.png", name: "ketchup" },
    { imgSrc: "./Images/orange.png", name: "orange" },
    { imgSrc: "./Images/bird.png", name: "bird" },
    { imgSrc: "./Images/blue_pink.png", name: "blue_pink" },
    { imgSrc: "./Images/burger.png", name: "burger" },
    { imgSrc: "./Images/chilli.png", name: "chilli" },
    { imgSrc: "./Images/fire.png", name: "fire" },
    { imgSrc: "./Images/hotdog.png", name: "hotdog" },
    { imgSrc: "./Images/ketchup.png", name: "ketchup" },
    { imgSrc: "./Images/orange.png", name: "orange" },
];

// Randomize the card data
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Card generator function
const cardGenerator = () => {
    const cardData = randomize();
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            if (!card.classList.contains('toggleCard') && !gameEnded) {
                card.classList.toggle("toggleCard");
                checkCards(e);
            }
        });
    });
};

// Check cards
const checkCards = (e) => {
    const clickedCard = e.target.parentElement;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
            correctMoves++;
            correctMovesCount.textContent = correctMoves;
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                endGame();
            }
        }
    }

    if (toggleCard.length === 16) {
        endGame();
    }
};

// End the game
const endGame = () => {
    gameEnded = true;
    const gameOverMessage = document.createElement("div");
    gameOverMessage.className = "gameOverMessage";
    gameOverMessage.innerHTML = `
        <h2>Game Over</h2>
        <p>Correct Moves: ${correctMoves}</p>
        
        <p>Wrong Attempts: ${8 - playerLives}</p>
        <button class="restartButton">Restart</button>
    `;
    gameScreen.appendChild(gameOverMessage);

    const restartButton = document.querySelector(".restartButton");
    restartButton.addEventListener("click", () => {
        gameEnded = false;
        gameScreen.removeChild(gameOverMessage);
        restart("Game restarted!");
    });
};

// Restart the game
const restart = (text) => {
    const cardData = randomize();
    const faces = document.querySelectorAll(".face");
    const cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 8;
    correctMoves = 0;
    playerLivesCount.textContent = playerLives;
    correctMovesCount.textContent = correctMoves;
    setTimeout(() => alert(text), 100);
};

// Start button event listener
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    cardGenerator();
});
