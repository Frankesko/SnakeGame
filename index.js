const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const shopBtn = document.querySelector("#shopBtn");
const loginRegistratiContainer = document.querySelector("#loginRegistratiButtons");
const loginPopUp = document.querySelector("#loginPopUp");
const registratiPopup = document.querySelector("#registratiPopup");
const loginChoiceButton = document.querySelector("#loginChoiceButton");
const loginSubmitButton = document.querySelector("#loginSubmitButton");
const registratiChoiceButton = document.querySelector("#registratiChoiceButton");
const registratiSubmitButton = document.querySelector("#registratiSubmitButton");
const pauseContainer = document.querySelector("#pauseContainer");
const riprendiBtn = document.querySelector("#riprendiBtn");
const testoSpiegazioneGioco = document.querySelector("#testoSpiegazioneGioco");
const mostraUsernameIfLoggato = document.querySelector("#mostraUsernameIfLoggato");
const settingsBtn = document.querySelector("#settingsBtn");
const impostazioniContainer = document.querySelector("#impostazioniContainer");
const speedInput = document.querySelector("#speed");
const speedValue = document.querySelector("#speedValue");
const chiudiImpostazioniContainerBtn = document.querySelector("#chiudiImpostazioniContainerBtn");
const negozioContainer = document.querySelector("#negozioContainer");
const chiudiNegozioBtn = document.querySelector("#chiudiNegozioBtn");
const startContainer = document.querySelector("#startContainer");
const riepilogoPartitaFinita = document.querySelector("#riepilogoPartitaFinita");
const playButton = document.querySelector("#playButton");
const scoreInFinePartita = document.querySelector("#scoreInFinePartita");
const shopBtnInFinePartita = document.querySelector("#shopBtnInFinePartita");
const settingsBtnInFinePartita = document.querySelector("#settingsBtnInFinePartita");
const leaderBoardsButtonInFinePartita = document.querySelector("#leaderBoardsButtonInFinePartita");
const leaderBoardsButton = document.querySelector("#leaderBoardsButton");
const leaderBoardsContainer = document.querySelector("#leaderBoardsContainer");
const chiudiLeaderBoardsContainerBtn = document.querySelector("#chiudiLeaderBoardsContainerBtn");
const passwordDimenticataBtn = document.getElementById("passwordDimenticata");
const passwordDimenticataPopUp = document.getElementById("passwordDimenticataPopUp");
const recuperoPasswordBtn = document.getElementById("recuperoPasswordBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "orange";
const snakeBorder = "orange";
const foodColor = "red";
let unitSize = 25;
let running = false;
let isPaused = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foods = [];

let score = 0;
let snake = [
    { x: unitSize * 4, y: 225 },
    { x: unitSize * 3, y: 225 },
    { x: unitSize * 2, y: 225 },
    { x: unitSize, y: 225 },
    { x: 0, y: 225 }
];
let timer = 3;
let timerInterval;
let persoControIlMuro;
let login = false;
let isRestarted = false;
let speed = 100;
let numFood = 1;

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);
riprendiBtn.addEventListener("click", continueGame);
settingsBtn.addEventListener("click", openSettings);
chiudiImpostazioniContainerBtn.addEventListener("click", closeSettings);
shopBtn.addEventListener("click", openShop);
chiudiNegozioBtn.addEventListener("click", closeShop);
shopBtnInFinePartita.addEventListener("click", openShop);
settingsBtnInFinePartita.addEventListener("click", openSettings);
leaderBoardsButton.addEventListener("click", openLeaderBoards);
leaderBoardsButtonInFinePartita.addEventListener("click", openLeaderBoards);
chiudiLeaderBoardsContainerBtn.addEventListener("click", closeLeaderBoards);
passwordDimenticataBtn.addEventListener("click", passwordDimenticata);
recuperoPasswordBtn.addEventListener("click", inviaRichiestaRecuperoPassword);

document.addEventListener("DOMContentLoaded", function() {
    loginChoiceButton.addEventListener("click", function() {
        // Nascondi il container di registrazione
        loginRegistratiContainer.style.display = "none";
        // Mostra il container di login
        loginPopUp.style.display = "block";
        
        loginSubmitButton.addEventListener("click", function() {

            let loginUsername = document.querySelector("#loginUsername").value;
            let loginPassword = document.querySelector("#loginPassword").value;
            let dataLogin = {
                username: loginUsername,
                password: loginPassword
            };
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "verifica_accesso.php", true); // Assicurati che l'URL sia corretto
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Elabora la risposta dal server
                        var response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // Accesso consentito, reindirizza o esegui altre azioni
                            alert("Accesso consentito!");
                            login = true;
                        } else {
                            // Accesso negato, mostra un messaggio di errore
                            alert("Accesso negato. " + response.message);
                        }
                    } else {
                        // Gestisci eventuali errori durante la richiesta AJAX
                        console.error("Errore nella richiesta AJAX");
                    }
                }
            };
        
            // Converte l'oggetto dati in una stringa JSON e invialo al server
            let jsonData = JSON.stringify(dataLogin);
            xhr.send(jsonData);
        

            if (login){
            loginPopUp.style.display = "none";
            testoSpiegazioneGioco.style.display = "none";
            mostraUsernameIfLoggato.style.display = "block";
            //mostraUsernameIfLoggato.textContent = logicadeldb
            startContainer.style.display = "block";
            playButton.addEventListener("click", function() {
                startContainer.style.display = "none"; // Questa riga nasconderà lo startContainer
                gameStart(); // E poi avvierà il gioco
            });
            }
        });
    });

    registratiChoiceButton.addEventListener("click", function() {
        // Nascondi il container di login
        loginRegistratiContainer.style.display = "none";
        // Mostra il container di registrazione
        registratiPopup.style.display = "block";

        registratiSubmitButton.addEventListener("click", function() {
            let registratiUsername = document.querySelector("#registratiUsername").value;
            let email = document.querySelector("#registratiEmail").value;
            let registratiPassword = document.querySelector("#registratiPassword").value;
            let confermaPassword = document.querySelector("#registratiConfirmPassword").value;
        
            

            // Crea un oggetto con i dati della registrazione
        let dataRegistrati = {
            username: registratiUsername,
            email: email,
            password: registratiPassword
        };

        if (registratiUsername.trim() === "" || email.trim() === "" || registratiPassword.trim() === "" || confermaPassword.trim() === "") {
            alert("Compila tutti i campi obbligatori.");
        } else if (registratiPassword !== confermaPassword) {
            alert("Le password non corrispondono.");
        } else if (registratiPassword == confermaPassword) {
            // Invia una richiesta AJAX al server per salvare i dati nel database
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "registra_account.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Elabora la risposta dal server, se necessario
                        console.log(xhr.responseText);
                        // Chiudi il modulo di registrazione se la registrazione è avvenuta con successo
                        registratiPopup.style.display = "none";
                        registratiChoiceButton.style.display = "none";
                        let successMessage = document.querySelector("#successMessage");
                        successMessage.style.display = "block";
                        loginRegistratiContainer.style.display = "flex";
                        
                    } else {
                        // Gestisci eventuali errori durante la richiesta AJAX
                        console.error("Errore nella richiesta AJAX");
                    }
                }
            };

            // Converte l'oggetto dati in una stringa JSON
            let jsonData = JSON.stringify(dataRegistrati);
            // Invia i dati JSON al server
            xhr.send(jsonData);
        }
        else {
            console.log("pw non corrispondente");
        }
    });
});
});



function gameStart() {
    running = true;
    impostazioniContainer.style.display = "none";
    // Avvia un intervallo per il timer
    timerInterval = setInterval(() => {
        ctx.clearRect(0, 0, gameWidth, gameHeight); // Cancella il canvas
        ctx.font = "50px MV Boli";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        if (timer === 0) {
            clearInterval(timerInterval); // Ferma il timer quando raggiunge 0
            startGame(); // Avvia il gioco effettivo
        } else {
            ctx.fillText(`${timer}`, gameWidth / 2, gameHeight / 2);
        }
        timer--;
    }, 1000); // Intervallo di 1 secondo (1000 millisecondi)
}

function startGame() {
    if(!isRestarted){
        foods.splice(0, foods.length); // Svuota l'array foods
        for (let i = 0; i < numFood; i++) {
            createFood(); // Chiamata alla funzione per creare il cibo
            drawFood();
        }             
    }
    nextTick();
}
function nextTick(){
    if(running && !isPaused){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, speed)
    }
    else if (!running && !isPaused){
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood() {
    function randomFoodCoordinate() {
        return Math.round(Math.random() * (gameWidth - unitSize) / unitSize) * unitSize;
    }

    let newFood;
    do {
        newFood = {
            x: randomFoodCoordinate(),
            y: randomFoodCoordinate()
        };
    } while (isFoodOnSnake(newFood.x, newFood.y) || foods.some(food => food.x === newFood.x && food.y === newFood.y));

    foods.push(newFood);
}


function isFoodOnSnake(x, y) {
    return snake.some(segment => segment.x === x && segment.y === y);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    foods.forEach(food => {
        ctx.fillRect(food.x, food.y, unitSize, unitSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

    snake.unshift(head);

    foods.forEach((food, index) => {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 1;
            scoreText.textContent = score;
            congratulations();

            // Rimuovi il cibo mangiato dall'array
            foods.splice(index, 1);

            // Crea un nuovo cibo
            createFood();

            // Aggiungi un nuovo segmento alla coda del serpente
            const tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
            snake.push(tail);
        }
    });

    snake.pop();
}


function drawSnake(){
    ctx.fillStyle = snakeColor; // Colore generale del serpente
    ctx.strokeStyle = snakeBorder;
    
    // Disegna la testa del serpente (cambia il colore e la forma)
    ctx.beginPath();
    ctx.arc(snake[0].x + unitSize / 2, snake[0].y + unitSize / 2, unitSize / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Disegna il corpo del serpente
    for (let i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
        ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
    }
}


function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
    } 
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            persoControIlMuro = true;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            persoControIlMuro = true;
            break;
        case(snake[0].y < 0):
            running = false;
            persoControIlMuro = true;
            break;
        case(snake[0].y >= gameWidth):
            running = false;
            persoControIlMuro = true;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
            persoControIlMuro = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if(persoControIlMuro)
        ctx.fillText("Boink!", gameWidth / 2, gameHeight / 2);
    else {
        ctx.fillText("Gnam!", gameWidth / 2, gameHeight / 2);
    }
    running = false;
    scoreInFinePartita.textContent =  `Score: ${score}`;
    riepilogoPartitaFinita.style.display = "block";
};

function resetGame() {
    if(login && !running){
        // Disabilita il tasto di reset
        resetBtn.disabled = true;
        riepilogoPartitaFinita.style.display = "none";
        score = 0;
        scoreText.textContent = "0"; // Assegna una stringa vuota per nascondere il testo
        xVelocity = unitSize;
        yVelocity = 0;
        snake = [
            { x: unitSize * 4, y: 225 },
            { x: unitSize * 3, y: 225 },
            { x: unitSize * 2, y: 225 },
            { x: unitSize, y: 225 },
            { x: 0, y: 225 }
        ];
        timer = 3; // Reimposta il timer a 3 secondi
        gameStart();

        // Riabilita il tasto di reset dopo 6 secondi
        setTimeout(function() {
            resetBtn.disabled = false;
        }, 6000); // 6000 millisecondi (6 secondi)
    }
}

function congratulations() {
    if (score % 10 === 0) {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#f06', '#0f6', '#60f', '#ff0', '#f0f', '#0ff']; // Definisci una serie di colori
        const confettiCount = 100; // Numero di coriandoli

        // Crea i coriandoli
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';

            // Assegna un colore casuale dai colori definiti
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = randomColor;

            confettiContainer.appendChild(confetti);
        }
    }
}

function pauseGame() {
    if (running && !isPaused) {
        isPaused = true;
        clearInterval(timerInterval);
        running = false;
        pauseContainer.style.display = "block";
        document.querySelector("#actualScore").textContent = `Score: ${score}`;
        //aggiungere il best score
    }
}

function continueGame() {
    if (isPaused) {
        isPaused = false;
        pauseContainer.style.display = "none";
        timer = 3;
        timerInterval = setInterval(() => {
            if (timer <= 0) {
                clearInterval(timerInterval);
                isRestarted = true;
                startGame();
            } else {
                ctx.clearRect(0, 0, gameWidth, gameHeight);
                ctx.font = "50px MV Boli";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText(`${timer}`, gameWidth / 2, gameHeight / 2);
            }
            timer--;
        }, 1000);
        running = true;
    }
}



function openSettings() {
    if (!running && !isPaused)
        impostazioniContainer.style.display = "block";

    // Inverti il valore di speed prima di visualizzarlo
    speedValue.textContent = 251 - speed; // Mostra il valore in modo invertito

    speedInput.addEventListener("input", function() {
        // Inverti il valore di speed quando lo imposti
        speed = 251 - this.value; // Aggiorna il valore della variabile speed
        // Inverti nuovamente il valore prima di visualizzarlo
        speedValue.textContent = 251 - speed; // Mostra il valore aggiornato in modo invertito
    });

    const dimensioneSelect = document.querySelector("#dimensione");
    dimensioneSelect.addEventListener("change", function() {
        unitSize = parseInt(this.value);
        // Esegui le azioni desiderate con il valore di unitSize
    });
    const ciboSelect = document.querySelector("#cibo")
    ciboSelect.addEventListener("change", function() {
        numFood = parseInt(this.value)
    });
}


function saveSettings(){
    impostazioniContainer.style.display = "none";
}

function closeSettings(){
    impostazioniContainer.style.display = "none";
}

function openShop(){
    negozioContainer.style.display = "block";
}

function closeShop(){
    negozioContainer.style.display = "none";
}

function openLeaderBoards(){
    leaderBoardsContainer.style.display = "block";
}

function closeLeaderBoards(){
    leaderBoardsContainer.style.display = "none";
}


function passwordDimenticata(){
    loginRegistratiContainer.style.display = "none";
    passwordDimenticataPopUp.style.display = "block";
    
    

    
    
}



function inviaRichiestaRecuperoPassword(){
    // Recupera l'indirizzo email inserito dall'utente
    let email = document.getElementById("passwordDimenticataEmail").value;

    // Esegui una richiesta AJAX al server per verificare l'email
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "password_dimenticata.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La richiesta al server è stata completata con successo
                var response = JSON.parse(xhr.responseText);
                
                if (response.success) {
                    // Email valida, mostra un messaggio di successo
                    document.getElementById("recPassSuccessMessage").innerText = response.message;
                } else {
                    // Email non valida, mostra un messaggio di errore
                    document.getElementById("errorMessage").innerText = response.message;
                }
            } else {
                // Gestisci gli errori
                console.error("Errore nella richiesta AJAX");
            }
        }
    };

    // Invia l'email al server
    xhr.send("email=" + email);
    
}
