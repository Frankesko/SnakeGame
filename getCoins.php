<?php
// Connessione al database
$conn = require('db_connection.php');

// Recupera lo username dalla richiesta GET
$username = $_GET['username'];

// Esegui una query per ottenere i coins dell'utente autenticato
$sql = "SELECT coins FROM tabella_utenti WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $coins = $row["coins"];

    // Restituisci i coins come risposta JSON
    echo json_encode(["success" => true, "coins" => $coins]);
} else {
    echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
}

$conn->close();
?>
