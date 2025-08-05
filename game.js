const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações iniciais
const ballRadius = 10;
const hoopWidth = 100;
const hoopHeight = 15;
let ballX = 50;
let ballY = canvas.height - 30;
let ballSpeedX = 0;
let ballSpeedY = 0;
let gravity = 0.2;
let isBallInAir = false;
let hoopX = canvas.width - hoopWidth - 20;
let hoopY = 50;
let score = 0;
let timeLeft = 30; // Tempo de jogo em segundos
let gameInterval, timeInterval;

// Função para desenhar o campo de basquete
function drawCourt() {
    ctx.fillStyle = "#FF6600";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(hoopX, hoopY, hoopWidth, hoopHeight); // A cesta
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar o placar e o tempo
function drawScoreboard() {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Pontos: " + score, 20, 30);
    ctx.fillText("Tempo: " + timeLeft, canvas.width - 120, 30);
}

// Função que desenha o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
    drawBall();
    drawScoreboard();

    if (isBallInAir) {
        ballY += ballSpeedY;
        ballX += ballSpeedX;
        ballSpeedY += gravity;

        if (ballY + ballRadius > canvas.height) {
            ballY = canvas.height - ballRadius;
            ballSpeedY = -ballSpeedY * 0.7; // Bola quica no chão
        }

        // Verifica se a bola entrou na cesta
        if (ballX > hoopX && ballX < hoopX + hoopWidth && ballY - ballRadius < hoopY + hoopHeight) {
            score++;
            resetBall();
        }
    }
}

// Função para resetar a posição da bola
function resetBall() {
    ballX = 50;
    ballY = canvas.height - 30;
    ballSpeedX = 0;
    ballSpeedY = 0;
    isBallInAir = false;
}

// Função de controle da tecla de espaço para lançar a bola
function shootBall() {
    if (!isBallInAir) {
        ballSpeedY = -10;
        ballSpeedX = 5;
        isBallInAir = true;
    }
}

// Função que diminui o tempo do jogo
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        alert("Fim de jogo! Pontos: " + score);
    }
}

// Função para capturar eventos do teclado
document.addEventListener("keydown", function(event) {
    if (event.key === " " || event.key === "ArrowUp") {
        shootBall(); // Lança a bola com a tecla espaço ou seta para cima
    }
});

// Inicia o jogo
function startGame() {
    gameInterval = setInterval(drawGame, 1000 / 60); // Atualiza o jogo a 60 FPS
    timeInterval = setInterval(countdown, 1000); // Atualiza o tempo a cada segundo
}

startGame();
