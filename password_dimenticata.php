<?php 
$conn = require('db_conn.php');

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    $email = $data->email;

    // Esegui una query per verificare se l'email è presente nel database
    $stmt = $conn->prepare("SELECT * FROM utenti WHERE email = ?");
    $stmt->execute([$username]);

    if ($stmt->rowCount() > 0) {
        // L'email è presente nel database, genera un codice casuale di 5 cifre
        $codice = mt_rand(10000, 99999); // Genera un numero casuale tra 10000 e 99999
        // Invia l'email
        $to = $email;
        $subject = "Recupero Password";
        $message = "La tua nuova password è: " . $codice;
        $headers = "From: no-reply@example.com"; // Puoi personalizzare l'indirizzo del mittente

        // Invia l'email utilizzando la funzione mail()
        if (mail($to, $subject, $message, $headers)) {
            // L'email è stata inviata con successo, restituisci una risposta al client
            echo "true";
        } else {
            // Errore nell'invio dell'email, restituisci un messaggio di errore
            echo "false";
        } 
    } else {
            echo "falseAccount";
        }
}
?>