<?php
// Connessione al database
$conn = require('db_conn.php');

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(["success" => false, "message" => "Dati non validi o mancanti."]);
} else {
    $username = $data->username;
    $username = trim(strtolower($username));

    // Esegui una query per ottenere i coins dell'utente autenticato
    $stmt = $conn->prepare("SELECT coins FROM utenti WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $coins = $row["coins"];

        // Restituisci i coins come risposta JSON
        echo json_encode(["success" => true, "coins" => $coins]);
    } else {
        echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
    }
}
?>
