<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {

    $id_utente = $data->id_utente;
    $score = $data->score;
    $numero_cibo = $data->numero_cibo;
    $dimensione_serpente = $data->dimensione_serpente;
    $speed = $data->speed;


    $stmt = $conn->prepare("SELECT coins FROM utenti where id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $oldCoinsAmount = $row["coins"];

    $newCoinsAmount = $oldCoinsAmount + $score;

    $stmt = $conn->prepare("UPDATE utenti SET coins = ? WHERE id_utente = ?");
    $stmt->execute([$newCoinsAmount, $id_utente]);

    // Esegui l'inserimento nel database
    $stmt = $conn->prepare("INSERT INTO partite (id_utente, score, numero_cibo, dimensione_serpente, speed) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$id_utente, $score, $numero_cibo, $dimensione_serpente, $speed]);

    // Verifica se l'inserimento è riuscito
    if ($stmt->rowCount() > 0) {
        echo "Inserimento avvenuto";
    } else {
        echo "Errore durante inserimento.";
    
    }
}
?>