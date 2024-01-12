//prendo gli elementi html e li salvo in una variabile
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
//const passwordDimenticataBtn = document.getElementById("passwordDimenticata");
//const passwordDimenticataPopUp = document.getElementById("passwordDimenticataPopUp");
//const recuperoPasswordBtn = document.getElementById("recuperoPasswordBtn");
const containerFooter = document.getElementById("containerFooter");
const chiudiLoginPopUpButton = document.getElementById("chiudiLoginPopUpButton");
const chiudiRegistratiPopUpButton = document.getElementById("chiudiRegistratiPopUpButton");
//const chiudiPasswordDimenticataPopUpButton = document.getElementById("chiudiPasswordDimenticataPopUpButton");
const chiudiImpostazioniPopUpButton = document.getElementById("chiudiImpostazioniPopUpButton");
const gameContainer = document.getElementById("gameContainer");

const modificaUtente = document.getElementById("modificaUtente");
const chudiProfilo = document.getElementById("chudiProfilo");

var countDown = document.getElementById("countDown");
var eatSound = document.getElementById("eatSound");
var changeDirectionV = document.getElementById("changeDirection");
var loseSound = document.getElementById("loseSound");
let isSoundOn = true;

var soundSwitcher = document.getElementById("soundSwitcher");
var soundIcon = document.getElementById("soundIcon");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "immagine.png";
//impostazioni di base
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
//serpente a inizio partita
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

//colori disponibili
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

let vinto;

//dichiarazione degli event listner
window.addEventListener("keydown", changeDirection);
mostraUsernameIfLoggato.addEventListener("click", modificaUtenteFunct);
chudiProfilo.addEventListener("click", chudiProfiloFunct);
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

//passwordDimenticataBtn.addEventListener("click", passwordDimenticata);
//recuperoPasswordBtn.addEventListener("click", inviaRichiestaRecuperoPassword);
chiudiLeaderBoardsContainerBtn.addEventListener("click", closeLeaderBoards);
chiudiLoginPopUpButton.addEventListener("click", chiudiLogin);
chiudiRegistratiPopUpButton.addEventListener("click", chiudiRegistrati);
//chiudiPasswordDimenticataPopUpButton.addEventListener("click", chiudiPasswordDimenticata);
chiudiImpostazioniPopUpButton.addEventListener("click", closeSettings);
soundSwitcher.addEventListener("click", toggleSound);

document.addEventListener("DOMContentLoaded", function() {
    //click sul login
    loginChoiceButton.addEventListener("click", function() {
        //nascondi il container di login/registrazione
        loginRegistratiContainer.style.display = "none";
        //mostra il container di login
        loginPopUp.style.display = "block";
        //click su login
        loginSubmitButton.addEventListener("click", function() {

            //prende i valori inseriti
            let loginUsername = document.querySelector("#loginUsername").value;
            let loginPassword = document.querySelector("#loginPassword").value;

            //prepara l'array da inviare al server
            let dataLogin = {
                username: loginUsername,
                password: loginPassword
            };

            //richiesta al server
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "verifica_accesso.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //elabora la risposta dal server
                        var response = xhr.responseText;
                        if (response === "true") {
                            //accesso consentito
                            //nasconde il popup di login e mostra quello di gioco
                            loginPopUp.style.display = "none";
                            gameContainer.style.display = "block";
                            //mostra lo username
                            usernameUtenteLoggato = loginUsername;
                            testoSpiegazioneGioco.style.display = "none";
                            mostraUsernameIfLoggato.style.display = "block";
                            mostraUsernameIfLoggato.textContent = usernameUtenteLoggato;
                            
                            //mostra il footer e i tasti centrali
                            containerFooter.style.display = "flex";
                            startContainer.style.display = "block";

                            //prende l'id utente
                            getIdUtente(usernameUtenteLoggato)
                            .then(id => { //promises risolta con successo quindi assegna a id_utente l'id preso
                               id_utente = id;
                            })
                            
                            getCoins(usernameUtenteLoggato);  //prende i coin dell'utente per mostrarli in basso a sinistra
                            loadShop(usernameUtenteLoggato);  //carica gli elementi del negozio 
                            loadSettings(usernameUtenteLoggato);    //carica le precedenti impostazioni dell'utente
                            
                            //listner del tasto gioca
                            playButton.addEventListener("click", function() {
                                startContainer.style.display = "none"; //nascondo lo startContainer                
                                gameStart(); //chiamo il pre-gioco
                                login = true; //imposta l'utente su true
                            });  
                        } else if (response === "usernameFalse") {
                            //accesso negato, username non trovato nel db
                            alert("Account inesistente");
                        } else if (response === "passwordFalse") {
                            //accesso negato, password non corrisponde a quella nel db
                            alert("Password errata");
                        }
                    } else {
                        //errori durante la richiesta
                        console.error("Errore nella richiesta AJAX");
                    }
                }
            };
            //converte l'oggetto dati in una stringa JSON e lo manda al server
            let jsonDataLog = JSON.stringify(dataLogin);
            xhr.send(jsonDataLog);
        });
    });

    //click su registrati
    registratiChoiceButton.addEventListener("click", function() {
        //nascondi il container di login/registrazione
        loginRegistratiContainer.style.display = "none";
        //mostra il container di registrazione
        registratiPopup.style.display = "block";
        //click di registrati
        registratiSubmitButton.addEventListener("click", function() {
            //prende i valori inseriti
            let registratiUsername = document.querySelector("#registratiUsername").value;
            let email = document.querySelector("#registratiEmail").value;
            let registratiPassword = document.querySelector("#registratiPassword").value;
            let confermaPassword = document.querySelector("#registratiConfirmPassword").value;
        
        if (isEmailValid(email)) {
            //mail valida nessun errore
        } else {
            //mail non valida chiede conferma per proseguire
            alert("L'indirizzo email sembra non essere valido. Clicca 'Ok' se vuoi proseguire lo stesso, 'Esc' per modificarla.");
        }
        
        //controllo sull'inserimento dei campi
        if (registratiUsername.trim() === "" || email.trim() === "" || registratiPassword.trim() === "" || confermaPassword.trim() === "") {
            alert("Compila tutti i campi obbligatori.");
        } else if (registratiPassword !== confermaPassword) {
            //password non corrispondono
            alert("Le password non corrispondono.");
        } else {
            //verifica l'unicità dello username prima di procedere con la registrazione
            checkUsernameAvailability(registratiUsername, function(isAvailable) {
                if (isAvailable) {
                    //username disponibile, invia i dati al server
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
                                //chiamata andata a buon fine
                                //nasconde il popup di registrazione
                                registratiPopup.style.display = "none";
                                registratiChoiceButton.style.display = "none";
                                //mostra un messaggio di successo
                                let successMessage = document.querySelector("#successMessage");
                                successMessage.style.display = "block";
                                //mostra solo il tasto di login
                                loginRegistratiContainer.style.display = "flex";
                            } else {
                                //errore
                                console.error("Errore nella richiesta AJAX");
                            }
                        }
                    };
                    //converte l'oggetto dati in una stringa JSON e lo manda al server
                    let jsonDataReg = JSON.stringify(dataRegistrati);
                    xhr.send(jsonDataReg);
                } else {
                    //username non disponibile, mostra un messaggio di errore
                    alert("Lo username non è disponibile. Scegli un altro username.");
                }
            });
        }
    });
});
});

function gameStart() {
    //disabilita il tasto start (per non farlo avviare due volte buggando il timer)
    playButton.disabled = true;
    //imposta il run su true
    running = true;   

    impostazioniContainer.style.display = "none";

    //imposta una variabile per tenere traccia dello stato della riproduzione del suono
    var soundPlayed = false;

    //avvia un intervallo per il timer
    timerInterval = setInterval(() => {
        ctx.clearRect(0, 0, gameWidth, gameHeight); //cancella il canvas
        //formattazione del timer
        ctx.font = "50px MV Boli";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        
        //verifica se il suono non è ancora stato riprodotto (sennò veniva prodotto a ogni tick)
        if (!soundPlayed) {
            countDown.play();
            soundPlayed = true; //imposta la variabile su true per indicare che il suono è stato riprodotto
        }

        if (timer === 0) {
            clearInterval(timerInterval); //ferma il timer quando raggiunge 0
            startGame(); //avvia il gioco effettivo
        } else {
            //mostra il timer a schermo
            ctx.fillText(`${timer}`, gameWidth / 2, gameHeight / 2);
        }
        timer--;
    }, 1000); //intervallo di 1 secondo (1000 millisecondi)
}


function startGame() {
    if(!isRestarted){
        vinto = false;
        loadSettings(usernameUtenteLoggato);
        //posso riattivare il tasto, poichè nascosto
        playButton.disabled = false;
        foods.splice(0, foods.length); //svuota l'array foods
        //crea cibo in base all'impostazione settata
        for (let i = 0; i < numFood; i++) {
            createFood(); //chiamata alla funzione per creare il cibo
            drawFood(); //chiamata per printare il cibo a schermo
        }             
    }
    //nextTick gestisce il "ciclo" del gioco
    nextTick(); 
}

function nextTick(){
    //se il gioco è in funzione e non è in pausa
    if(running && !isPaused){
        setTimeout(()=>{
            //pulisce la board
            clearBoard();
            //disegna il cibo
            drawFood();
            //muove il serpente
            moveSnake();
            //disegna il serpente
            drawSnake();
            //controlla se si ha perso
            checkGameOver();
            //richiama la funzione
            nextTick();
        }, speed)
    }
    else if (!running && !isPaused){
        //nel caso in cui non fosse in running e nemmeno in pausa significa che ho perso 
        //quindi mostra il messaggio di game over a schermo
        displayGameOver();
    }
};

function clearBoard(){
    var img = new Image();
    img.src = boardBackground;
    ctx.drawImage(img, 0, 0, gameWidth, gameHeight);
};

function createFood() {
    function randomFoodCoordinate() {
        //crea un cibo in una cordinata randomica dello schermo
        return Math.round(Math.random() * (gameWidth - unitSize) / unitSize) * unitSize;
    }

    //calcola il numero totale di posizioni sulla board
    const totalPositions = (gameWidth / unitSize) * (gameHeight / unitSize);

    //se non ci sono più posizioni disponibili, esci senza creare cibo (serve quando si sta per finire il gioco)
    if (snake.length >= totalPositions) {
        return;
    }

    //ottieni tutte le coordinate occupate dai cibi
    const occupiedCoordinates = foods.map(food => `${food.x}-${food.y}`);

    let newFood;
    let attempts = 0;
    const maxAttempts = 100; //numero massimo di tentativi per trovare una posizione libera

    do {
        newFood = {
            x: randomFoodCoordinate(),
            y: randomFoodCoordinate()
        };

        const newFoodCoordinates = `${newFood.x}-${newFood.y}`;

        attempts++;

        //se il numero di tentativi supera il massimo consentito, esci senza creare cibo
        if (attempts > maxAttempts) {
            console.warn("Impossibile trovare posizione per il cibo. La board potrebbe essere completamente riempita.");
            return;
        }
    } while (isFoodOnSnake(newFood.x, newFood.y) || occupiedCoordinates.includes(`${newFood.x}-${newFood.y}`));
      //se il serpente è sopra la coordinata creata di cibo, ne crea un altro
      //il cibo non dev'essere crato sotto al serpente
    //aggiunge il cibo all'array di cibi  
    foods.push(newFood);
}


function isFoodOnSnake(x, y) {
    //se il serpente è sopra la coordinata creata di cibo, ne crea un altro
    //il cibo non dev'essere crato sotto al serpente
    return snake.some(segment => segment.x === x && segment.y === y);
};

function drawFood() {
    //disegna il cibo
    ctx.fillStyle = foodColor;
    foods.forEach(food => {
        ctx.beginPath();
        ctx.arc(food.x + unitSize / 2, food.y + unitSize / 2, unitSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function moveSnake() {
    //muovi serpente
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    foods.forEach((food, index) => {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            
            //quando mangia cibo playa il suono
            eatSound.play();
            
            //aggiunge un punto allo score
            score += 1;
            //aggiorna il valore dello score a schermo
            scoreText.textContent = score;
            actualCoins = coins + score;
            //aggiorna il valore dei coins a schermo
            document.getElementById("coinsUtente").textContent = actualCoins;
            
            //chiama la funzione di congraturazioni
            congratulations();

            //rimuovi il cibo mangiato dall'array
            foods.splice(index, 1);

            //crea un nuovo cibo
            createFood();

            //aggiungi un nuovo segmento alla coda del serpente
            const tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
            snake.push(tail);
        }
    });
    snake.pop(); //rimuove l'ultimo elemento del serpente (poichè si sta muovendo)
}

function drawSnake() {
    ctx.fillStyle = snakeColor; //colore del serpente
    ctx.strokeStyle = snakeBorder;

    //disegna la testa del serpente
    ctx.beginPath();
    ctx.arc(snake[0].x + unitSize / 2, snake[0].y + unitSize / 2, unitSize / 2, 0, Math.PI * 2);
    ctx.fill();

    //disegna il corpo del serpente (un po' più sottile)
    for (let i = 1; i < snake.length; i++) {
        //utilizza linee rette per il corpo del serpente in linea retta
        if (snake[i].x === snake[i - 1].x || snake[i].y === snake[i - 1].y) {
            ctx.beginPath();
            ctx.moveTo(snake[i - 1].x + unitSize / 2, snake[i - 1].y + unitSize / 2);
            ctx.lineTo(snake[i].x + unitSize / 2, snake[i].y + unitSize / 2);
            ctx.lineWidth = unitSize * 0.7; //riduci la larghezza delle linee
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.lineWidth = 1; 
        } else {
            //utilizza curve quadratiche per arrotondare le curve
            let midX = (snake[i].x + snake[i - 1].x) / 2;
            let midY = (snake[i].y + snake[i - 1].y) / 2;

            ctx.beginPath();
            ctx.moveTo(snake[i - 1].x + unitSize / 2, snake[i - 1].y + unitSize / 2);
            ctx.quadraticCurveTo(midX, midY, snake[i].x + unitSize / 2, snake[i].y + unitSize / 2);
            ctx.lineWidth = unitSize * 0.7; //riduci la larghezza delle linee
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.lineWidth = 1; 
        }
    }
}



function changeDirection(event){
    //in base al tasto premuto capisce come muoversi
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

    if(login){
        //questo controllo serve per non far avviare i suoni di movimento durante il login o la registrazione
        //o in generale al di fuori del gioco
        changeDirectionV.play();
    }    

    //in base alla key premuta controlla se cambiare la direzione o no
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
    //fa tutti i controlli che potrebbero terminare il gioco:
    //andare contro i bordi
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= gameWidth):
        case (snake[0].y < 0):
        case (snake[0].y >= gameHeight):
            running = false;
            persoControIlMuro = true;
            break;
    }   
    //mangiarsi da solo
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
            persoControIlMuro = false;
        }
    }

    //controllo di vittoria
    //in base alla grandezza del serpente si possono prendere più cibi per questo ci sono 3 controlli differenti
    if((unitSize == 25 && score == 395) ||
      (unitSize ==  5 && score == 1995) ||
      (unitSize == 1 && score == 9995)) {
        running = false;
        vinto = true;
    }
};

function displayGameOver() {
    //formattazione del testo
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    
    //suono di game over
    loseSound.play()

    //messaggio di errore (o vincita) in base ai controlli fatti precedentemente
    if (persoControIlMuro && !vinto) {
        ctx.fillText("Boink!", gameWidth / 2, gameHeight / 3);
    } else if (!persoControIlMuro && !vinto) {
        ctx.fillText("Gnam!", gameWidth / 2, gameHeight / 3);
    } else if (vinto) {
        ctx.fillText("Hai vinto!", gameWidth / 2, gameHeight / 3);
        congratulations();
    } 

    //imposta running su false così da poter avviare una nuova partita
    running = false;   
    //chiama la funzione che manda i dati della partita al db 
    inviaPunteggioAlServer(id_utente, score, numFood, unitSize, speed);
    //imposta l'elemento "score in fine partita" per mostrarlo successivamente nel riepilogo
    scoreInFinePartita.textContent = `Score: ${score}`;
    //chiama get my top score per prendere il punteggio migliore dell'utente e mostrarlo nel riepilogo partita
    getMyTopScore(id_utente);
    //mostra il riepilogo partita
    riepilogoPartitaFinita.style.display = "block";
    //prende i coins
    getCoins(usernameUtenteLoggato);
};

function resetGame() {
    //a fine partita per rigiocare si usa il tasto di reset
    if(login){
        //disabilita il tasto di reset stesso motivo del play sopra
        resetBtn.disabled = true; 
        //nascondo il riepilogo partita
        riepilogoPartitaFinita.style.display = "none";
        //imposto lo score a 0
        score = 0;
        scoreText.textContent = "0"; // Assegna una stringa vuota per nascondere il testo
        xVelocity = unitSize;
        yVelocity = 0;
        //imposto le coordinate di partenza del serpente
        snake = [
            { x: unitSize * 4, y: 225 },
            { x: unitSize * 3, y: 225 },
            { x: unitSize * 2, y: 225 },
            { x: unitSize, y: 225 },
            { x: 0, y: 225 }
        ];
        timer = 3; //reimposta il timer a 3 secondi
        gameStart();
        //riabilita il tasto di reset dopo 6 secondi
        setTimeout(function() {
            resetBtn.disabled = false;
        }, 6000); //6000 millisecondi (6 secondi)
    }
};

function congratulations() {
    //ogni dieci punti o alla vittoria viene eseguito questo codice
    if (score % 10 === 0 || vinto) {
        //vengono mostrati a schermo dei "coriandoli" (o confetti) di diversi colori

        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#f06', '#0f6', '#60f', '#ff0', '#f0f', '#0ff']; //serie di colori
        const confettiCount = 100; //numero di coriandoli

        //crea i coriandoli
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';

            //assegna un colore casuale dai colori definiti
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = randomColor;

            confettiContainer.appendChild(confetti);
        }
    }
};

function pauseGame() {
    //funzione di pausa
    if (running && !isPaused) {
        //prende il top score per mostrarlo
        getMyTopScore(id_utente);
        isPaused = true;
        clearInterval(timerInterval);
        running = false;
        //prende lo score attuale per mostrarlo
        document.querySelector("#actualScore").textContent = `Score: ${score}`;
        //mostra il container della pausa con le informazioni prese e un tasto per riprendere il gioco
        pauseContainer.style.display = "block";
    }
};

function continueGame() {
    //per riprendere il gioco
    if (isPaused) {
        isPaused = false;
        pauseContainer.style.display = "none";
        timer = 3;

        //imposta una variabile per tenere traccia dello stato della riproduzione del suono (come nello start game)
        var soundPlayed = false;

        timerInterval = setInterval(() => {
            

            //verifica se il suono non è ancora stato riprodotto (per non riprodurlo più volte)
            if (!soundPlayed) {
                countDown.play();
                soundPlayed = true; //imposta la variabile su true per indicare che il suono è stato riprodotto
            }

            if (timer <= 0) {
                clearInterval(timerInterval);
                isRestarted = true;
                startGame();  //alla fine del timer riprende il gioco
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
};


function openSettings() {
    loadSettings(usernameUtenteLoggato);
    if (!running && !isPaused) {
        //mostra il container delle impostazioni
        impostazioniContainer.style.display = "block";
        //prende i dati precedenti
        prevSpeed = speed;
        prevNumFood = numFood;
        prevUnitSize = unitSize;

        //inverti il valore di speed prima di visualizzarlo
        speedValue.textContent = 251 - speed; //mostra il valore in modo invertito

        speedInput.addEventListener("input", function() {
            //inverti il valore di speed quando lo imposti
            speed = 251 - this.value; //aggiorna il valore della variabile speed
            //inverti nuovamente il valore prima di visualizzarlo
            speedValue.textContent = 251 - speed; //mostra il valore aggiornato in modo invertito
        });

        const dimensioneSelect = document.querySelector("#dimensione");
        dimensioneSelect.addEventListener("change", function() {
            unitSize = parseInt(this.value);  //prende il nuovo valore della dimensione
        });
        const ciboSelect = document.querySelector("#cibo")
        ciboSelect.addEventListener("change", function() {
            numFood = parseInt(this.value) //prende il nuovo valore del numero cibo
        });

        //cliccando salva vengono salvate
        chiudiImpostazioniContainerBtn.addEventListener("click", function() {
            //chiama la funzione di salvataggio con i parametri corretti
            saveSettings(numFood, unitSize, speed /*, foodColor, snakeColor*/);
        });
    }
};


function saveSettings(numFood, unitSize, speed /*, colore_cibo_selezionato, colore_serpente_selezionato*/){
    //salva le impostazioni che gli sono state inviate
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "salva_impostazioni.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

            } else {
                //gestisci gli errori
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

    //converte in json e manda
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
    
    //chiude il container delle impostazioni
    impostazioniContainer.style.display = "none";
};

//cliccando annulla non vengono salvate
function closeSettings(){
    speed = prevSpeed;
    numFood = prevNumFood;
    unitSize = prevUnitSize;
    impostazioniContainer.style.display = "none";
};

//carica impostazioni serve all'apertura del gioco nel caso si fossero modificate le impostazioni di gioco precedentemente
//a non modificarle ogni volta che si accede
function loadSettings(username){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "carica_impostazioni.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //elabora la risposta del server
                var response = JSON.parse(xhr.responseText);
                if (response.numero_cibo && response.dimensione_serpente
                && response.speed && response.colore_cibo_selezionato && response.colore_serpente_selezionato) {
                    //imposta i valori delle variabili di gioco con i dati del db
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
    //converte in json e invia
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);
};

function openShop(username) {
    //chiama carica shop per prendere i dati dal db
    loadShop(username);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "scarica_shop.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                //se tutti i dati sono stati presi senza problemi
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
                    //allora può proseguire col codice
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

                    //crea l'elemento dello shop (con nome colore di quel colore, prezzo e tasto per comprare)
                    const createShopItemElement = (item, itemType) => {
                        //container
                        const shopItemElement = document.createElement('div');                        

                        //nome
                        const itemNameElement = document.createElement('div');
                        itemNameElement.style.color = item.colore;
                        itemNameElement.style.fontWeight = "bold";
                        itemNameElement.style.marginTop = "5px";
                        itemNameElement.textContent = item.colore;

                        //prezzo
                        const itemCostElement = document.createElement('div');
                        itemCostElement.textContent = "Prezzo: " + item.costo;
                        itemCostElement.style.fontSize = "14px";

                        //tasto
                        const buyButton = document.createElement('button');
                        //a secondo dello stato del colore nel db
                        //dipenderà il colore e il testo all'interno del tasto
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
                        
                        //stile generale dei tasti di buy
                        buyButton.style.color = 'white';
                        buyButton.style.padding = "5px, 10px";
                        buyButton.style.cursor = "pointer";
                        buyButton.classList.add('buy-button');
                        
                        //funzione al click del tasto di buy
                        buyButton.addEventListener('click', function () {
                            if(item.stato == "no" && item.costo < coins){
                                console.log("comprato");
                                let xhr = new XMLHttpRequest();
                                xhr.open("POST", "compra_colore.php", true);
                                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200) {                                            
                                            
                                            //aggiorna i coins e lo stato dello shop (sennò ti farebbe comprare lo stesso colore all'infinito)
                                            getCoins(username);  
                                            openShop(username);
                                            
                                            buyButton.textContent = 'Imposta'
                                            buyButton.style.backgroundColor = 'blue';
                                            
                                        } else {
                                            //errore nella richiesta
                                            console.log("Errore nella richiesta");
                                        }
                                    }    
                                };

                                //in base all'item type invia i dati richiesti
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
                                //converte in stringa e manda
                                const jsonData = JSON.stringify(data);
                                xhr.send(jsonData);
                            
                            } else if(item.stato == "no" && item.costo > coins){
                                alert("Coins insufficienti per proseguire con l'acquisto");
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

                    coloriSerpente.appendChild(textColoriSerpente);
                    coloriSerpenteArray.forEach((item) => {
                        const shopItemElement = createShopItemElement(item, 'serpente');
                        const itemId = `shop-item-serpente${item.colore}`; // Aggiungi un indice univoco
                        shopItemElement.id = itemId; // Imposta l'ID dell'elemento
                        coloriSerpente.appendChild(shopItemElement);
                        console.log(`ID dell'elemento: ${itemId}`);
                    });

                    coloriCibo.appendChild(textColoriCibo);
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
};

function closeShop(){
    loadSettings(usernameUtenteLoggato);
    negozioContainer.style.display = "none";
};

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
};

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
            usernameElement.textContent = `User: ${score.username}`;

            const spaceElement = document.createElement('br');

            const scoreElement = document.createElement('span');
            scoreElement.textContent = `Score: ${score.score}`;

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
};

function closeLeaderBoards(){
    leaderBoardsContainer.style.display = "none";
};

function chiudiLogin(){
    loginPopUp.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
};

function chiudiRegistrati(){
    registratiPopup.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
};
/*
function chiudiPasswordDimenticata(){
    passwordDimenticataPopUp.style.display = "none";
    loginRegistratiContainer.style.display = "flex";
};
*/
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
};
/*
function passwordDimenticata(){
    loginPopUp.style.display = "none";
    passwordDimenticataPopUp.style.display = "block";
    event.preventDefault(); // Impedisci il comportamento predefinito del modulo HTML
};

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
};
*/
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
};

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
};

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
};

function inviaPunteggioAlServer(id_utente, score, numeroCibo, dimensioneSerpente, speed) {   
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
};

function toggleSound() {
    isSoundOn = !isSoundOn; // Cambia lo stato del suono
    soundSwitch(isSoundOn); // Chiama la funzione soundSwitch con il nuovo stato
};

function soundSwitch(isSoundOn) {
    if (isSoundOn) {
        // Attiva il suono
        changeDirectionV.volume = 1;
        loseSound.volume = 1;
        eatSound.volume = 1;
        countDown.volume = 1;

        // Cambia l'aspetto dell'icona
        soundIcon.src = "audio_on.png";
    } else {
        // Disattiva il suono
        changeDirectionV.volume = 0;
        loseSound.volume = 0;
        eatSound.volume = 0;
        countDown.volume = 0;

        // Cambia l'aspetto dell'icona
        soundIcon.src = "audio_off.png";
    }
};

function modificaUtenteFunct(){
    modificaUtente.style.display = "flex";
    console.log("dadadadada");


    const inserisciBio = document.getElementById("inserisciBio");
    const calcolaTotPartiteGiocate = document.getElementById("calcolaTotPartiteGiocate");
    const modificaPassword = document.getElementById("modificaPassword");
    const eliminaAccount = document.getElementById("eliminaAccount");

    //inserisciBio.addEventListener("click", inserisciBioFunct);
    calcolaTotPartiteGiocate.addEventListener("click", calcolaTotPartiteGiocateFunct);
    modificaPassword.addEventListener("click", modificaPasswordFunct);
    eliminaAccount.addEventListener("click", eliminaAccountFunct);
}

function chudiProfiloFunct(){
    modificaUtente.style.display = "none";
}

/*
function inserisciBioFunct() {
    modificaUtente.style.display = "none";
    const inserisciBioDiv = document.getElementById("inserisciBioDiv");
    inserisciBioDiv.style.display = "flex";

    const POST = document.getElementById("POST");
    POST.addEventListener("click", function () {
        
        const data = {
            id_utente: id_utente,
            info_bio: document.getElementById("BioIns").value
        };
        
        var jsondata = JSON.stringify(data);
            console.log(data);
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    try {
                        console.log(xhr.responseText);
            
                        // Utilizza il metodo split per ottenere il secondo elemento
                        let response = JSON.parse(xhr.responseText);
                        let arrayFromSplit = response.inserito.split(',');
                        let secondoElemento = arrayFromSplit[1].trim();
                        secondoElemento = secondoElemento.slice(1, -1);

                        console.log(secondoElemento);
                        const bio = document.getElementById("bio");
                        bio.textContent = secondoElemento;
                        bio.style.display = "Block";

                        
                    } catch (error) {
                        console.error("Error parsing JSON response:", error);
                        console.log(xhr.responseText);
                    }
                } else {
                    console.log("non entrato nel file // richiesta non andata a buon fine");
                    console.log(xhr.responseText);
                }
            };
            
            xhr.open("POST", "/api.php/bie", true); // Cambiato in POST
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            // Cambiato in inviare una richiesta POST
            xhr.send(jsondata);
            inserisciBioDiv.style.display = "none";
    });
    
}
*/

function modificaPasswordFunct(){
    modificaUtente.style.display = "none";
    const modificaPasswordDiv = document.getElementById("modificaPasswordDiv");
    modificaPasswordDiv.style.display = "flex";

    const PUT = document.getElementById("PUT");
    PUT.addEventListener("click", function () {
        console.log("in");

        pw = document.getElementById("modificaPasswordIns").value;
        password = document.getElementById("modificaPasswordConfirmIns").value

        if(pw == password) {
            const data = {
                
                password: password
            };  
            console.log("pw == pwcofn");
            const jsonData = JSON.stringify(data);

            let xhr = new XMLHttpRequest();
            
            xhr.onload = function () {
                // Verifica se la richiesta è andata a buon fine
                if (xhr.readyState === 4){
                    if(xhr.status === 200) {
                    // Mostra il messaggio di successo
                    console.log(xhr.responseText); 
                    console.log("sucesso");
                    console.log(password);
                    } else {
                    console.log("errore");
                    
                    console.log(xhr.responseText);
                    }
                } else {
                    console.log("non entrato nel file // richiesta non andata a buon fine");
                    console.log(xhr.responseText);
                }
            };
            xhr.open("PUT", "/api.php/utenti/" + id_utente, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(jsonData);
            modificaPasswordDiv.style.display = "none";
        } else {
            alert("Password non corrispondenti");
        }
    });
    
}

function eliminaAccountFunct(){
    
    let xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        console.log("entrato nel click");
        // Verifica se la richiesta è andata a buon fine
        if (xhr.readyState === 4){
            if(xhr.status === 200) {
            // Mostra il messaggio di successo
            console.log(xhr.responseText); 
            console.log("sucesso");
            
            } else {
            console.log("errore");
            console.log(xhr.responseText);
            }
        } else{
            console.log("non entrato nel file // richiesta non andata a buon fine");
            console.log(xhr.responseText);
        }
    };
    xhr.open("DELETE", "/api.php/utenti/" + id_utente, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    location.reload();
}

function calcolaTotPartiteGiocateFunct() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parsa la risposta JSON
                const response = JSON.parse(xhr.responseText);

                // Accedi ai dati della risposta
                if (response.status === 'success') {
                    const data = response.data;
                    let partite = data.length;
                    console.log(data);
                    console.log("successo");
                    const partiteGiocate = document.getElementById("partiteGiocate");
                    partiteGiocate.textContent = "Hai giocato " + partite + " partite.";
                    partiteGiocate.style.display = "block";

                } else {
                    console.log("errore: " + response.message);
                }
            } else {
                console.log("errore");
            }
        }
    };

    xhr.open("GET", "/api.php/partite/" + id_utente, true);
    xhr.send();
}
