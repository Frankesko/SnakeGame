<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    //estrae lo username dai dati
    $usernameUtenteLoggato = $data->username;
    $usernameUtenteLoggato = trim(strtolower($usernameUtenteLoggato));
    
    //seleziona l'id utente
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$usernameUtenteLoggato]);
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $id_utente = $row["id_utente"];

        //restituisce l'id utente a js
        echo json_encode(["success" => true, "id_utente" => $id_utente]);
    } else { 
        echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
    }
}
?>

