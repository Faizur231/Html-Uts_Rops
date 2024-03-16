class Start {
    constructor() {
        // Inisialisasi variabel lokal
        let playerName = "Pemain";
        const botName = "bot";
        let playerOption;
        let botOption;
        let winner = "";
        let playerScore = 0;
        let botScore = 0;

        // Getter dan setter untuk botOption
        this.getBotOption = function () {
            return botOption;
        };
        this.setBotOption = function (option) {
            botOption = option;
        };

        // Getter dan setter untuk playerOption
        this.getPlayerOption = function () {
            return playerOption;
        };
        this.setPlayerOption = function (option) {
            playerOption = option;
        };

        // Getter dan setter untuk playerName
        this.getPlayerName = function () {
            return playerName;
        };
        this.setPlayerName = function (name) {
            playerName = name;
        };

        // Getter dan setter untuk playerScore
        this.getPlayerScore = function () {
            return playerScore;
        };
        this.setPlayerScore = function (score) {
            playerScore = score;
        };

        // Getter dan setter untuk botScore
        this.getBotScore = function () {
            return botScore;
        };
        this.setBotScore = function (score) {
            botScore = score;
        };

        // Fungsi untuk mendapatkan opsi bot
        this.getBotOption = function () {
            return botOption;
        };

        // Fungsi untuk menghasilkan pilihan bot secara acak
        this.botBrain = function () {
            const option = ["🖐", "✌", "✊"];
            const bot = option[Math.floor(Math.random() * option.length)];
            return bot;
        };

        // Fungsi untuk menghitung pemenang
        this.winCalculation = function () {
            if (botOption == "🖐" && playerOption == "✌") {
                winner = playerName;
            } else if (botOption == "🖐" && playerOption == "✊") {
                winner = botName;
            } else if (botOption == "✌" && playerOption == "🖐") {
                winner = botName;
            } else if (botOption == "✌" && playerOption == "✊") {
                winner = playerName;
            } else if (botOption == "✊" && playerOption == "🖐") {
                winner = playerName;
            } else if (botOption == "✊" && playerOption == "✌") {
                winner = botName;
            } else {
                winner = "SERI";
            }
        };

        // Fungsi untuk menentukan hasil pertandingan
        this.matchResult = function () {
            if (winner != "SERI") {
                return `${winner} MENANG!`;
            } else {
                return `WAAA ${winner}, GAK ADA YG MENANG 🤪`;
            }
        };

        // Fungsi untuk memperbarui skor
        this.updateScores = function () {
            if (winner === playerName) {
                playerScore++;
            } else if (winner === botName) {
                botScore++;
            }
        };
    }
}

const start = new Start();
let gameStarted = false; // Tandai apakah permainan sudah dimulai
const startButton = document.querySelector('button');

// Fungsi untuk memulai permainan
function startGame() {
    startButton.disabled = true;
    gameStarted = true;
    resetScores();
}

// Fungsi untuk menghentikan permainan
function stopGame() {
    startButton.disabled = false;
    gameStarted = false;
    resetScores();
}

// Fungsi untuk mereset skor
function resetScores() {
    start.setPlayerScore(0);
    start.setBotScore(0);
    updateScoreDisplay();
}

// Fungsi untuk memproses pemilihan pemain
function pickOption(params) {
    if (gameStarted) {
        start.setPlayerName(document.getElementById("playerName").value);
        start.setPlayerOption(params);
        start.setBotOption(start.botBrain());
        start.winCalculation();
        start.updateScores();

        const inGame = document.getElementById("inGame");
        const result = document.getElementById("result");

        inGame.textContent = "...";
        result.textContent = "...";

        setTimeout(() => {
            inGame.textContent = `${start.getPlayerOption()} VS ${start.getBotOption()}`;
            result.textContent = start.matchResult();

            updateScoreDisplay();

            // Cek apakah skor sudah mencapai 5
            if (start.getPlayerScore() === 5 || start.getBotScore() === 5) {
                let winnerMessage;

                // Tentukan pemenang berdasarkan skor
                if (start.getPlayerScore() > start.getBotScore()) {
                    winnerMessage = `${start.getPlayerName()} Menang!`;
                } else if (start.getPlayerScore() < start.getBotScore()) {
                    winnerMessage = "Bot Menang!";
                } else {
                    winnerMessage = "Permainan Seri!";
                }

                // Tampilkan alert dengan informasi pemenang
                alert(`Permainan Selesai!\nSkor : ${start.getPlayerScore()} - ${start.getBotScore()}\n${winnerMessage}`);

                // Stop permainan dan tampilkan tombol Mulai kembali
                gameStarted = false;
                startButton.disabled = false;
            }
        }, 1500);
    } else {
        alert("Mulai permainan terlebih dahulu!");
    }
}

// Fungsi untuk memperbarui tampilan skor
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.textContent = `Skor: ${start.getPlayerScore()} - ${start.getBotScore()}`;
}