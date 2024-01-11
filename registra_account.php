<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    //estrae username, email e password
    $username = $data->username;
    $email = $data->email;
    $password = $data->password;

    $username = trim(strtolower($username));
    //esegue l'hashing della password per criptarla
    $password = password_hash($password, PASSWORD_DEFAULT);
    //inserimento nel database
    $stmt = $conn->prepare("INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $password]);

    //verifica se l'inserimento è riuscito
    if ($stmt->rowCount() > 0) {
        echo "Registrazione avvenuta con successo!";
    } else {
        echo "Errore durante la registrazione.";
    }
}

//chiudi la connessione al database
$conn = null;
?>