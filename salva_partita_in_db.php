<?php
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica del metodo HTTP richiesto
$method = $_SERVER['REQUEST_METHOD'];

//se il metodo è POST, gestisci la richiesta
if ($method === 'POST') {
    //verifica se i dati sono validi
    if (!$data) {
        echo "Dati non validi o mancanti.";
    } else {
        //estrae id utente
        //score
        //numero cibo
        //grandezza
        //velocità
        $id_utente = $data->id_utente;
        $score = $data->score;
        $numero_cibo = $data->numero_cibo;
        $dimensione_serpente = $data->dimensione_serpente;
        $speed = $data->speed;

        //prende i coins dell'utente
        $stmt = $conn->prepare("SELECT coins FROM utenti where id_utente = ?");
        $stmt->execute([$id_utente]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $oldCoinsAmount = $row["coins"];

        //aggiorna il valore dei coins
        $newCoinsAmount = $oldCoinsAmount + $score;

        //aggiorna il valore dei coins nella tabella utenti
        $stmt = $conn->prepare("UPDATE utenti SET coins = ? WHERE id_utente = ?");
        $stmt->execute([$newCoinsAmount, $id_utente]);

        //inserimento della partita nel database
        $stmt = $conn->prepare("INSERT INTO partite (id_utente, score, numero_cibo, dimensione_serpente, speed) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id_utente, $score, $numero_cibo, $dimensione_serpente, $speed]);

        //verifica se l'inserimento è riuscito
        if ($stmt->rowCount() > 0) {
            echo "Inserimento avvenuto";
        } else {
            echo "Errore durante inserimento.";
        
        }
    }
} else {
    //se non è riuscito restituisci messaggio di errore
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(array('message' => 'Metodo non consentito'));
}

?>