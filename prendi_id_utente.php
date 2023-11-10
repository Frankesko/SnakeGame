<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    $usernameUtenteLoggato = $data->username;
    $usernameUtenteLoggato = trim(strtolower($usernameUtenteLoggato));
    
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$usernameUtenteLoggato]);
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $id_utente = $row["id_utente"];

        // Ottieni l'ID utente dalla query
        echo json_encode(["success" => true, "id_utente" => $id_utente]);
    } else { 
        echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
    }
}
?>

