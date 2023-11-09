<?php
$conn = require('db_conn.php');

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    $username = $data->username;
    $password = $data->password;

    $username = trim(strtolower($username));
    // Query per selezionare l'utente con lo username specifico
    $stmt = $conn->prepare("SELECT password FROM utenti WHERE username = ?");
    $stmt->execute([$username]);

    // Verifica se l'utente con lo username specifico esiste
    if ($stmt->rowCount() > 0) {
        $storedPassword = $stmt->fetchColumn();

        if ($password === $storedPassword) {
            echo "true";
        } else {
            echo "passwordFalse";
        }
    } else {
        echo "usernameFalse";
    }
}
?>
