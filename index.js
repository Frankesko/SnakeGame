const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.getElementById("resetBtn");
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
const leaderBoardsContainer = document.querySelector("#container");
const chiudiLeaderBoardsContainerBtn = document.querySelector("#chiudiLeaderBoardsContainerBtn");
const passwordDimenticataBtn = document.getElementById("passwordDimenticata");
const passwordDimenticataPopUp = document.getElementById("passwordDimenticataPopUp");
const recuperoPasswordBtn = document.getElementById("recuperoPasswordBtn");

const chiudiLoginPopUpButton = document.getElementById("chiudiLoginPopUpButton");
const chiudiRegistratiPopUpButton = document.getElementById("chiudiRegistratiPopUpButton");
const chiudiPasswordDimenticataPopUpButton = document.getElementById("chiudiPasswordDimenticataPopUpButton");
const chiudiShopPopUpButton = document.getElementById("chiudiShopPopUpButton");
const chiudiImpostazioniPopUpButton = document.getElementById("chiudiImpostazioniPopUpButton");


const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
let snakeColor = "orange";
let snakeBorder = "orange";
let foodColor = "red";
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
let usernameUtenteLoggato;
let id_utente;

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);
riprendiBtn.addEventListener("click", continueGame);
settingsBtn.addEventListener("click", openSettings);
shopBtn.addEventListener("click", openShop);
chiudiNegozioBtn.addEventListener("click", closeShop);
shopBtnInFinePartita.addEventListener("click", openShop);
settingsBtnInFinePartita.addEventListener("click", openSettings);
leaderBoardsButton.addEventListener("click", openLeaderBoards);
leaderBoardsButtonInFinePartita.addEventListener("click", openLeaderBoards);
passwordDimenticataBtn.addEventListener("click", passwordDimenticata);
recuperoPasswordBtn.addEventListener("click", inviaRichiestaRecuperoPassword);

chiudiLeaderBoardsContainerBtn.addEventListener("click", closeLeaderBoards);
chiudiLoginPopUpButton.addEventListener("click", chiudiLogin);
chiudiRegistratiPopUpButton.addEventListener("click", chiudiRegistrati);
chiudiPasswordDimenticataPopUpButton.addEventListener("click", chiudiPasswordDimenticata);
chiudiShopPopUpButton.addEventListener("click", closeShop);
chiudiImpostazioniPopUpButton.addEventListener("click", closeSettings)

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
                        var response = xhr.responseText;
                        if (response === "true") {
                            // Accesso consentito, reindirizza o esegui altre azioni
                            loginPopUp.style.display = "none";
                            usernameUtenteLoggato = loginUsername;
                            testoSpiegazioneGioco.style.display = "none";
                            mostraUsernameIfLoggato.style.display = "block";
                            mostraUsernameIfLoggato.textContent = usernameUtenteLoggato;
                            startContainer.style.display = "block";
                            getIdUtente(usernameUtenteLoggato)
                            .then(id => {
                               id_utente = id;
                            })
                            getCoins(usernameUtenteLoggato);
                            playButton.addEventListener("click", function() {
                                startContainer.style.display = "none"; // Questa riga nasconderà lo startContainer
                                loadSettings(id_utente);
                                console.log("loadsettings provaYGVRSD");
                                gameStart(); // E poi avvierà il gioco
                                login = true;
                            });
                            
                        } else if (response === "usernameFalse") {
                            // Accesso negato, mostra un messaggio di errore
                            alert("Account inesistente");
                        } else if (response === "passwordFalse") {
                            alert("Password errata");
                        }
                    } else {
                        // Gestisci eventuali errori durante la richiesta AJAX
                        console.error("Errore nella richiesta AJAX");
                    }
                }
            };
        
            // Converte l'oggetto dati in una stringa JSON e invialo al server
            let jsonDataLog = JSON.stringify(dataLogin);
            xhr.send(jsonDataLog);
        

            
            
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
        
        if (isEmailValid(email)) {
            // L'indirizzo email è valido
            // Esegui il resto della registrazione
        } else {
            // L'indirizzo email non è valido
            alert("L'indirizzo email non è valido. Inserisci un indirizzo email valido.");
        }
        
        if (registratiUsername.trim() === "" || email.trim() === "" || registratiPassword.trim() === "" || confermaPassword.trim() === "") {
            alert("Compila tutti i campi obbligatori.");
        } else if (registratiPassword !== confermaPassword) {
            alert("Le password non corrispondono.");
        } else {
            // Verifica l'unicità dello username prima di procedere con la registrazione
            checkUsernameAvailability(registratiUsername, function(isAvailable) {
                if (isAvailable) {
                    // Lo username è disponibile, invia i dati al server
                    const dataRegistrati = {
                        username: registratiUsername,
                        email: email,
                        password: registratiPassword
                    };
    
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "registra_account.php", true);
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                // Elabora la risposta dal server, se necessario
                                
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
    
                    // Converte l'oggetto dati in una stringa JSON e invialo al server
                    let jsonDataReg = JSON.stringify(dataRegistrati);
                    xhr.send(jsonDataReg);
                } else {
                    // Lo username non è disponibile, mostra un messaggio di errore
                    alert("Lo username non è disponibile. Scegli un altro username.");
                }
            });
        }
    });
});
});



function gameStart() {
    playButton.disabled = true;
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
        playButton.disabled = false;
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
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    
    if (persoControIlMuro) {
        ctx.fillText("Boink!", gameWidth / 2, gameHeight / 2);
    } else {
        ctx.fillText("Gnam!", gameWidth / 2, gameHeight / 2);
    }

    running = false;    
    inviaPunteggioAlServer(id_utente, score, numFood, unitSize, speed);
    scoreInFinePartita.textContent = `Score: ${score}`;
    riepilogoPartitaFinita.style.display = "block";
    getCoins(usernameUtenteLoggato);
}

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

    chiudiImpostazioniContainerBtn.addEventListener("click", function() {
        // Chiamare la funzione di salvataggio con i parametri corretti
        saveSettings(numFood, unitSize, speed, foodColor, snakeColor);
    });
}


function saveSettings(numFood, unitSize, speed, colore_cibo_selezionato, colore_serpente_selezionato){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "salva_impostazioni.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

            } else {
                // Gestisci gli errori
                console.error("Errore nella richiesta AJAX");
            }
        }
    };

    data = {
        id_utente: id_utente,
        numFood: numFood,
        unitSize: unitSize,
        speed: speed,
        colore_serpente_selezionato: colore_serpente_selezionato,
        colore_cibo_selezionato: colore_cibo_selezionato
    };

    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
    
    impostazioniContainer.style.display = "none";
}

function closeSettings(){
    impostazioniContainer.style.display = "none";
}

function loadSettings(id_utente){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "carica_impostazioni.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Elabora la risposta del server
                var response = JSON.parse(xhr.responseText);
                if (response.numero_cibo && response.dimensione_serpente
                && response.speed && response.colore_cibo_selezionato && response.colore_serpente_selezionato) {
                    numFood = response.numero_cibo;
                    unitSize = response.dimensione_serpente;
                    speed = response.speed;
                    snakeColor = response.colore_serpente_selezionato;
                    snakeBorder = snakeColor;
                    foodColor = response.colore_cibo_selezionato;
                } else {
                    console.log("La risposta del server non contiene i campi attesi.");
                }
            } else {
                console.log("Errore durante la richiesta al server. Codice di stato: " + xhr.status);
            }
        }
    };

    const data = {
        id_utente: id_utente
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    xhr.send(jsonData);
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

function chiudiLogin(){
    loginPopUp.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
}
function chiudiRegistrati(){
    registratiPopup.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
}
function chiudiPasswordDimenticata(){
    passwordDimenticataPopUp.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
}












function passwordDimenticata(){
    loginPopUp.style.display = "none";
    passwordDimenticataPopUp.style.display = "block";
    event.preventDefault(); // Impedisci il comportamento predefinito del modulo HTML
}

function inviaRichiestaRecuperoPassword() {
    // Recupera l'indirizzo email inserito dall'utente
    let email = document.getElementById("passwordDimenticataEmail").value;

    // Verifica se il campo email è compilato
    if (email.trim() === "") {
        // Mostra un messaggio di errore e esci dalla funzione
        document.getElementById("errorMessage").innerText = "Inserisci un indirizzo email valido.";
        return;
    }

    // Verifica se l'indirizzo email è valido utilizzando la funzione isEmailValid
    if (!isEmailValid(email)) {
        // Mostra un messaggio di errore e esci dalla funzione
        document.getElementById("errorMessage").innerText = "Inserisci un indirizzo email valido.";
        return;
    }

    // Continua solo se l'indirizzo email è valido

    // Esegui una richiesta AJAX al server per verificare l'email
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "password_dimenticata.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Resto del codice per gestire la risposta dal server
                var response = xhr.responseText;
                
                if (response === "true") {
                    // Email valida, mostra un messaggio di successo
                    document.getElementById("recPassSuccessMessage").innerText = " Mail inviata, esegui il login con la nuova password.";
                    let recuperoPasswordSuccessMessage = document.querySelector("#recuperoPasswordSuccessMessage");
                    recuperoPasswordSuccessMessage.style.display = "block";
                } else if (response === "false") {
                    // Email non valida, mostra un messaggio di errore
                    document.getElementById("recPassSuccessMessage").innerText = "Errore durante l'invio della mail";
                    let recuperoPasswordSuccessMessage = document.querySelector("#recuperoPasswordSuccessMessage");
                    recuperoPasswordSuccessMessage.style.display = "block";
                } else if (response === "falseAccount") {
                    document.getElementById("errorMessage").innerText = "Errore, nessun account registrato con questa mail";
                }
            } else {
                // Gestisci gli errori
                console.error("Errore nella richiesta AJAX");
            }
        }
    };
    const data = {
        email: email
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
    
    passwordDimenticataPopUp.style.display = "none";
    registratiChoiceButton.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
}

function getCoins(username) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "get_coins.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Elabora la risposta del server
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    var coins = response.coins;
                    // Aggiorna l'elemento HTML per mostrare i coins
                    document.getElementById("coinsUtente").textContent = coins;
                } else {
                    // Gestisci errori o situazioni in cui l'utente non è autenticato
                }
            }
        }
    };
    const data = {
        username: username
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}


function checkUsernameAvailability(registratiUsername, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "verifica_username.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Elabora la risposta dal server
                const response = JSON.parse(xhr.responseText);
                callback(response.available);
            } else {
                // Gestisci eventuali errori durante la richiesta AJAX
                console.error("Errore nella richiesta AJAX");
                callback(false); // Assume che ci siano problemi nel server
            }
        }
    };

    const data = {
        username: registratiUsername
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}

function isEmailValid(email) {
    // Definisci un'espressione regolare per verificare l'indirizzo email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Verifica se l'indirizzo email corrisponde all'espressione regolare
    return emailRegex.test(email);
}


function getIdUtente(usernameUtenteLoggato) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "prendi_id_utente.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        resolve(response.id_utente);
                    } else {
                        reject("Utente non trovato o non autenticato");
                        
                    }
                } else {
                    reject("Errore nella richiesta AJAX");
                    console.error("Errore nella richiesta AJAX");
                }
            }
        };

        const data = {
            username: usernameUtenteLoggato
        };
        const jsonData = JSON.stringify(data);
        xhr.send(jsonData);
    });
}


function inviaPunteggioAlServer(id_utente, score, numeroCibo, dimensioneSerpente, speed) {
    
    
    // Dati da inviare al server
    

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "salva_partita_in_db.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Callback che verrà eseguita quando lo stato della richiesta cambia
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // La richiesta al server è stata completata con successo
            } else {
                // Gestisci gli errori
                console.error("Errore nella richiesta AJAX");
            }
        }
    };

    const data = {
        id_utente: id_utente, 
        score: score,
        numero_cibo: numeroCibo,
        dimensione_serpente: dimensioneSerpente,
        speed: speed
    };

const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}