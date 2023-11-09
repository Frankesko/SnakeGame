<?php
$conn = require('db_connection.php');

// Dati inseriti dall'utente
$username = $_POST['username']; // Assicurati di avere un campo input nel tuo modulo HTML per l'username
$password = $_POST['password']; // Assicurati di avere un campo input nel tuo modulo HTML per la password

// Query per selezionare l'utente con lo username specifico
$stmt = $conn->prepare("SELECT * FROM utenti WHERE username = ?");
$stmt->execute([$username]);

// Verifica se l'utente con lo username specifico esiste
if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $storedPassword = $row['password'];

    // Verifica se la password inserita corrisponde a quella memorizzata nel database
    if (password_verify($password, $storedPassword)) {
        // Accesso consentito, l'utente ha fornito le credenziali corrette
        echo "Accesso consentito!"; // Puoi reindirizzare l'utente alla pagina di accesso o eseguire altre azioni necessarie.
    } else {
        // Password errata
        echo "Password errata. Riprova.";
    }
} else {
    // L'utente con lo username specifico non esiste
    echo "Utente non trovato.";
}
?>