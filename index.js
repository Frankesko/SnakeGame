const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const shopBtn = document.getElementById("shopBtn");
const loginRegistratiContainer = document.getElementById("loginRegistratiButtons");
const loginPopUp = document.getElementById("loginPopUp");
const registratiPopup = document.getElementById("registratiPopup");
const loginChoiceButton = document.getElementById("loginChoiceButton");
const loginSubmitButton = document.getElementById("loginSubmitButton");
const registratiChoiceButton = document.getElementById("registratiChoiceButton");
const registratiSubmitButton = document.getElementById("registratiSubmitButton");
const pauseContainer = document.getElementById("pauseContainer");
const riprendiBtn = document.getElementById("riprendiBtn");
const testoSpiegazioneGioco = document.getElementById("testoSpiegazioneGioco");
const mostraUsernameIfLoggato = document.getElementById("mostraUsernameIfLoggato");
const settingsBtn = document.getElementById("settingsBtn");
const impostazioniContainer = document.getElementById("impostazioniContainer");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const chiudiImpostazioniContainerBtn = document.getElementById("chiudiImpostazioniContainerBtn");
const negozioContainer = document.getElementById("negozioContainer");
const chiudiNegozioBtn = document.getElementById("chiudiNegozioBtn");
const startContainer = document.getElementById("startContainer");
const riepilogoPartitaFinita = document.getElementById("riepilogoPartitaFinita");
const playButton = document.getElementById("playButton");
const scoreInFinePartita = document.getElementById("scoreInFinePartita");
const shopBtnInFinePartita = document.getElementById("shopBtnInFinePartita");
const settingsBtnInFinePartita = document.getElementById("settingsBtnInFinePartita");
const leaderBoardsButtonInFinePartita = document.getElementById("leaderBoardsButtonInFinePartita");
const leaderBoardsButton = document.getElementById("leaderBoardsButton");
const leaderBoardsContainer = document.getElementById("container");
const sottocontaienrLeaderBoardsContainer = document.getElementById("leaderBoardsContainer");
const chiudiLeaderBoardsContainerBtn = document.getElementById("chiudiLeaderBoardsContainerBtn");
const passwordDimenticataBtn = document.getElementById("passwordDimenticata");
const passwordDimenticataPopUp = document.getElementById("passwordDimenticataPopUp");
const recuperoPasswordBtn = document.getElementById("recuperoPasswordBtn");
const containerFooter = document.getElementById("containerFooter");
const chiudiLoginPopUpButton = document.getElementById("chiudiLoginPopUpButton");
const chiudiRegistratiPopUpButton = document.getElementById("chiudiRegistratiPopUpButton");
const chiudiPasswordDimenticataPopUpButton = document.getElementById("chiudiPasswordDimenticataPopUpButton");
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

let prevSpeed;
let prevNumFood;
let prevUnitSize;    

let serpente_arancione;
let serpente_verde;
let serpente_blu;
let serpente_nero;
let serpente_rosa;
let serpente_giallo;
let serpente_grigio;
let serpente_rosso;
let cibo_arancione;
let cibo_verde;
let cibo_blu;
let cibo_nero;
let cibo_rosa;
let cibo_giallo;
let cibo_grigio;
let cibo_rosso;

let coins;


window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);
riprendiBtn.addEventListener("click", continueGame);
settingsBtn.addEventListener("click", openSettings);
shopBtn.addEventListener("click", function(){
    openShop(usernameUtenteLoggato);
});
chiudiNegozioBtn.addEventListener("click", function() {
    closeShop(usernameUtenteLoggato);
});
shopBtnInFinePartita.addEventListener("click", function(){
    openShop(usernameUtenteLoggato);
});
settingsBtnInFinePartita.addEventListener("click", openSettings);
leaderBoardsButton.addEventListener("click", function() {
    openLeaderBoards(id_utente);
});
leaderBoardsButtonInFinePartita.addEventListener("click", function() {
    openLeaderBoards(id_utente);
});

passwordDimenticataBtn.addEventListener("click", passwordDimenticata);
recuperoPasswordBtn.addEventListener("click", inviaRichiestaRecuperoPassword);
chiudiLeaderBoardsContainerBtn.addEventListener("click", closeLeaderBoards);
chiudiLoginPopUpButton.addEventListener("click", chiudiLogin);
chiudiRegistratiPopUpButton.addEventListener("click", chiudiRegistrati);
chiudiPasswordDimenticataPopUpButton.addEventListener("click", chiudiPasswordDimenticata);
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
                            containerFooter.style.display = "block";
                            startContainer.style.display = "block";
                            getIdUtente(usernameUtenteLoggato)
                            .then(id => {
                               id_utente = id;
                            })
                            console.log("aaa");
                        
                            getCoins(usernameUtenteLoggato);
                            loadShop(usernameUtenteLoggato);
                            loadSettings(usernameUtenteLoggato);
                            playButton.addEventListener("click", function() {
                            
                                startContainer.style.display = "none"; // Questa riga nasconderà lo startContainer                
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
        loadSettings(usernameUtenteLoggato);
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
            getCoins(usernameUtenteLoggato);
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

    const W = 87;
    const A = 65;
    const S = 83;
    const D = 68;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == UP || keyPressed == W) && !goingDown:
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == DOWN || keyPressed == S) && !goingUp:
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case (keyPressed == LEFT || keyPressed == A) && !goingRight:
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == RIGHT || keyPressed == D) && !goingLeft:
            xVelocity = unitSize;
            yVelocity = 0;
            break;
    } 
};
function checkGameOver(){
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= gameWidth):
        case (snake[0].y < 0):
        case (snake[0].y >= gameHeight):
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
        ctx.fillText("Boink!", gameWidth / 2, gameHeight / 3);
    } else {
        ctx.fillText("Gnam!", gameWidth / 2, gameHeight / 3);
    }

    running = false;    
    inviaPunteggioAlServer(id_utente, score, numFood, unitSize, speed);
    scoreInFinePartita.textContent = `Score: ${score}`;
    getMyTopScore(id_utente);
    riepilogoPartitaFinita.style.display = "block";
    //getCoins(usernameUtenteLoggato);
}

function resetGame() {
    if(login){
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
        getMyTopScore(id_utente);
        isPaused = true;
        clearInterval(timerInterval);
        running = false;
        document.querySelector("#actualScore").textContent = `Score: ${score}`;
        pauseContainer.style.display = "block";
        
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
    loadSettings(usernameUtenteLoggato);
    if (!running && !isPaused)
        impostazioniContainer.style.display = "block";

    prevSpeed = speed;
    prevNumFood = numFood;
    prevUnitSize = unitSize;

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
        saveSettings(numFood, unitSize, speed /*, foodColor, snakeColor*/);
    });
}


function saveSettings(numFood, unitSize, speed /*, colore_cibo_selezionato, colore_serpente_selezionato*/){
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
        username: usernameUtenteLoggato,
        numFood: numFood,
        unitSize: unitSize,
        speed: speed
        //, colore_serpente_selezionato: colore_serpente_selezionato,
        //colore_cibo_selezionato: colore_cibo_selezionato
    };

    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
    
    impostazioniContainer.style.display = "none";
}

function closeSettings(){
    speed = prevSpeed;
    numFood = prevNumFood;
    unitSize = prevUnitSize;
    impostazioniContainer.style.display = "none";
}

function loadSettings(username){
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
        username: username
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}


function openShop(username) {
    loadShop(usernameUtenteLoggato);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "scarica_shop.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (
                    response.serpente_arancione &&
                    response.serpente_verde &&
                    response.serpente_blu &&
                    response.serpente_nero &&
                    response.serpente_rosa &&
                    response.serpente_giallo &&
                    response.serpente_grigio &&
                    response.serpente_rosso &&
                    response.cibo_arancione &&
                    response.cibo_verde &&
                    response.cibo_blu &&
                    response.cibo_nero &&
                    response.cibo_rosa &&
                    response.cibo_giallo &&
                    response.cibo_grigio &&
                    response.cibo_rosso
                ) {                  

                    const coloriSerpenteArray = [
                        { colore: 'orange', costo: 50, stato: response.serpente_arancione },
                        { colore: 'green', costo: 50, stato: response.serpente_verde },
                        { colore: 'blue', costo: 50, stato: response.serpente_blu },
                        { colore: 'black', costo: 50, stato: response.serpente_nero },
                        { colore: 'pink', costo: 50, stato: response.serpente_rosa },
                        { colore: 'yellow', costo: 50, stato: response.serpente_giallo },
                        { colore: 'gray', costo: 50, stato: response.serpente_grigio },
                        { colore: 'red', costo: 50, stato: response.serpente_rosso },
                    ];

                    const coloriCiboArray = [
                        { colore: 'orange', costo: 50, stato: response.cibo_arancione },
                        { colore: 'green', costo: 50, stato: response.cibo_verde },
                        { colore: 'blue', costo: 50, stato: response.cibo_blu },
                        { colore: 'black', costo: 50, stato: response.cibo_nero },
                        { colore: 'pink', costo: 50, stato: response.cibo_rosa },
                        { colore: 'yellow', costo: 50, stato: response.cibo_giallo },
                        { colore: 'gray', costo: 50, stato: response.cibo_grigio },
                        { colore: 'red', costo: 50, stato: response.cibo_rosso },
                    ];

                    
                    const coloriSerpente = document.getElementById("coloriSerpente");
                    const coloriCibo = document.getElementById("coloriCibo");

                    coloriSerpente.innerHTML = '';
                    coloriCibo.innerHTML = '';

                    const createShopItemElement = (item, itemType) => {
                        const shopItemElement = document.createElement('div');                        

                        const itemNameElement = document.createElement('div');
                        itemNameElement.style.color = item.colore;
                        itemNameElement.style.fontWeight = "bold";
                        itemNameElement.style.marginTop = "5px";
                        itemNameElement.textContent = item.colore;

                        const itemCostElement = document.createElement('div');
                        itemCostElement.textContent = item.costo;
                        itemCostElement.style.fontSize = "14px";

                        const buyButton = document.createElement('button');
                        if(item.stato == "no") {
                            buyButton.textContent = 'Acquista'
                            buyButton.style.backgroundColor = 'green';
                        } else {
                            if((itemType === 'serpente' && item.colore === snakeColor) || 
                              (itemType === 'cibo' && item.colore === foodColor)) {
                                buyButton.textContent = 'Impostato'
                                buyButton.style.backgroundColor = 'grey';
                            } else {
                                buyButton.textContent = 'Imposta'
                                buyButton.style.backgroundColor = 'blue';
                            }
                        }

                        buyButton.style.color = 'white';
                        buyButton.style.padding = "5px, 10px";
                        buyButton.style.cursor = "pointer";
                        buyButton.classList.add('buy-button');

                        buyButton.addEventListener('click', function () {
                            if(item.stato == "no" && item.costo < coins){
                                console.log("comprato");
                                let xhr = new XMLHttpRequest();
                                xhr.open("POST", "compra_colore.php", true);
                                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200) {                                            
                                            
                                            console.log("comprato davvero");
                                            getCoins(usernameUtenteLoggato);  //FORSE DARA' PROBLEMI
                                            buyButton.textContent = 'Imposta'
                                            buyButton.style.backgroundColor = 'blue';
                                        } else {
                                            console.log("fallito");
                                        }
                                    }    
                                };
                                if (itemType == 'serpente') {
                                    data = {
                                        username: username,
                                        colore_sbloccato: item.colore,
                                        type: "serpente"
                                    };
                                } else if (itemType == 'cibo') {
                                    data = {
                                        username: username,
                                        colore_sbloccato: item.colore,
                                        type: "cibo"
                                    }
                                }
                                const jsonData = JSON.stringify(data);
                                xhr.send(jsonData);
                            
                            } else if(item.stato == "no" && item.costo > coins){
                                console.log("non hai abbastanza soldini");
                            } else if (item.stato == "si" && item.colore != snakeColor || item.colore != foodColor) {
                                console.log("impostato");
                                let xhr = new XMLHttpRequest();
                                xhr.open("POST", "imposta_colore.php", true);
                                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200) {                                            
                                            var response = xhr.responseText;
                                            
                                            if(itemType == 'serpente'){
                                                console.log(response);
                                                let specificItem = document.getElementById(`shop-item-serpente${response}`);
                                                console.log(specificItem);
                                                
                                                const buyButtonPrecedente = specificItem.querySelector('.buy-button');
                                                buyButtonPrecedente.textContent = 'Imposta'
                                                buyButtonPrecedente.style.backgroundColor = 'blue';
    
                                                buyButton.textContent = 'Impostato'
                                                buyButton.style.backgroundColor = 'grey';
                                            } else {
                                                let specificItem = document.getElementById(`shop-item-cibo${response}`);
                                            
                                                const buyButtonPrecedente = specificItem.querySelector('.buy-button');
                                                buyButtonPrecedente.textContent = 'Imposta'
                                                buyButtonPrecedente.style.backgroundColor = 'blue';
    
                                                buyButton.textContent = 'Impostato'
                                                buyButton.style.backgroundColor = 'grey';
                                            }
                                            
                                        }
                                    }
                                };

                                if (itemType == 'serpente') {
                                    data = {
                                        username: username,
                                        colore_impostato: item.colore,
                                        type: "serpente"
                                    };
                                } else if (itemType == 'cibo') {
                                    data = {
                                        username: username,
                                        colore_impostato: item.colore,
                                        type: "cibo"
                                    }
                                }
                                const jsonData = JSON.stringify(data);
                                xhr.send(jsonData);
                            } else if (item.stato == "si" && item.colore == snakeColor || item.colore == foodColor) {
                                console.log("gia impostato")
                            }

                                console.log(`Bottone ${item.colore} cliccato!`);
                        });

                        shopItemElement.appendChild(itemNameElement);
                        shopItemElement.appendChild(itemCostElement);
                        shopItemElement.appendChild(buyButton);
                        shopItemElement.classList.add('shopitem');
                        return shopItemElement;
                    };

                    const textColoriSerpente = document.createElement('p');
                    textColoriSerpente.textContent = "Snake colors";
                    const textColoriCibo = document.createElement('p');
                    textColoriCibo.textContent = "Food colors";

                    coloriSerpenteArray.forEach((item, index) => {
                        const shopItemElement = createShopItemElement(item, 'serpente');
                        const itemId = `shop-item-serpente${item.colore}`; // Aggiungi un indice univoco
                        shopItemElement.id = itemId; // Imposta l'ID dell'elemento
                        coloriSerpente.appendChild(shopItemElement);
                        console.log(`ID dell'elemento: ${itemId}`);
                    });
                    
                    coloriCiboArray.forEach((item) => {
                        const shopItemElement = createShopItemElement(item, 'cibo');
                        const itemId = `shop-item-cibo${item.colore}`;
                        shopItemElement.id = itemId; // Imposta l'ID dell'elemento
                        coloriCibo.appendChild(shopItemElement);
                        console.log(`ID dell'elemento: ${itemId}`);
                        
                    });

                } else {
                    console.log("non ricevuti dati");
                }

                //console.log("andato");
            } else {
                // Gestisci gli errori
                console.log("fallito");
            }
        }
    };

    data = {
        username: username,
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
    negozioContainer.style.display = "block";
}

function closeShop(){
    loadSettings(usernameUtenteLoggato);
    negozioContainer.style.display = "none";
}

function loadShop(username){
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "load_shop.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log("Aaaa")
            } else {
                // Gestisci gli errori
                console.error("Errore nella richiesta AJAX");
            }
        }
    };

    data = {
        username: username
    };

    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
}

function openLeaderBoards(id_utente) {
    const allBestUrl = 'http://localhost/get_best_score.php';
    const myBestUrl = `http://localhost/get_my_best_score.php?id_utente=${id_utente}`;

    Promise.all([
        fetch(allBestUrl).then(response => response.json()),
        fetch(myBestUrl).then(response => response.json())
    ])
    .then(([allBestData, myBestData]) => {
        //console.log('Dati dei punteggi generali:', allBestData);
        //console.log('Dati dei miei punteggi:', myBestData);

        // Ottieni il riferimento al container nel tuo HTML
        const generalBestLeaderBoard = document.getElementById('generalBestLeaderBoard');
        const personalBestLeaderBoard = document.getElementById('personalBestLeaderBoard');

        // Rimuovi eventuali elementi esistenti nei container
        generalBestLeaderBoard.innerHTML = '';
        personalBestLeaderBoard.innerHTML = '';

        // Funzione per creare gli elementi HTML
        const createScoreElement = (score) => {
            const scoreContainer = document.createElement('div');
            scoreContainer.setAttribute('class', 'scoreContainer');

            const usernameElement = document.createElement('span');
            usernameElement.textContent = `Utente: ${score.username}`;

            const spaceElement = document.createElement('br');

            const scoreElement = document.createElement('span');
            scoreElement.textContent = `Punteggio: ${score.score}`;

            scoreContainer.appendChild(usernameElement);
            scoreContainer.appendChild(spaceElement);
            scoreContainer.appendChild(scoreElement);

            return scoreContainer;
        };

        const textBest = document.createElement('p');
        textBest.textContent = "Best score";
        const textMyBest = document.createElement('p');
        textMyBest.textContent = "My best score";

        // Itera attraverso i dati generali e crea gli elementi HTML
        generalBestLeaderBoard.appendChild(textBest);
        allBestData.forEach(score => {
            const scoreContainer = createScoreElement(score);
            generalBestLeaderBoard.appendChild(scoreContainer);
        });

        // Itera attraverso i dati personali e crea gli elementi HTML
        personalBestLeaderBoard.appendChild(textMyBest);
        myBestData.forEach(score => {
            const scoreContainer = createScoreElement(score);
            personalBestLeaderBoard.appendChild(scoreContainer);
        });

        // Mostra i container dei leaderboard
        generalBestLeaderBoard.style.display = 'block';
        personalBestLeaderBoard.style.display = 'block';
        leaderBoardsContainer.style.display = 'block';
    })
    .catch(error => {
        console.error('Errore durante la richiesta dei punteggi:', error);
    });
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

function getMyTopScore(id_utente){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "get_my_top_score.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Elabora la risposta del server
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    let topScore = response.score;
                    if(score > topScore) {
                        document.getElementById("pausaPersonalBest").textContent = ` My best: ${score}`;
                        document.getElementById("personalBest").textContent = ` My best: ${score}`
                    } else {
                        document.getElementById("pausaPersonalBest").textContent = ` My best: ${topScore}`;
                        document.getElementById("personalBest").textContent = ` My best: ${topScore}`
                    }
                } else {
                    // Gestisci errori o situazioni in cui l'utente non è autenticato
                }
            }
        }
    };
    const data = {
        id_utente: id_utente
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
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
                    coins = response.coins;
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

