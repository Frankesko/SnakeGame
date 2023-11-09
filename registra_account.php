<?php
$conn = require('db_connection.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    $username = $data->username;
    $email = $data->email;
    $password = $data->password;

    // Esegui eventuali controlli sulla validità dei dati (validazione)

    // Esegui l'inserimento nel database
    $stmt = $conn->prepare("INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $password]);

    // Verifica se l'inserimento è riuscito
    if ($stmt->rowCount() > 0) {
        echo "Registrazione avvenuta con successo!";
    } else {
        echo "Errore durante la registrazione.";
    }
}

// Chiudi la connessione al database
$conn = null;
?>
