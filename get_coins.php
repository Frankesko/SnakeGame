<?php
//connessione al database
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono arrivati
if (!$data) {
    echo json_encode(["success" => false, "message" => "Dati non validi o mancanti."]);
} else {
    //estrae lo username dai dati
    $username = $data->username;
    $username = trim(strtolower($username));

    // Esegui una query per ottenere i coins dell'utente autenticato
    $stmt = $conn->prepare("SELECT coins FROM utenti WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $coins = $row["coins"];

        //restituisci i coins come risposta JSON
        echo json_encode(["success" => true, "coins" => $coins]);
    } else {
        echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
    }
}
?>
