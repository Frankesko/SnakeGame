<?php
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    //estrae username e password
    $username = $data->username;
    $password = $data->password;

    $username = trim(strtolower($username));
    //query per selezionare l'utente con lo username specifico
    $stmt = $conn->prepare("SELECT password FROM utenti WHERE username = ?");
    $stmt->execute([$username]);

    //verifica se l'utente con lo username specifico esiste
    if ($stmt->rowCount() > 0) {
        $storedPassword = $stmt->fetchColumn();
        //se è presente fa il conrollo con la pw del db
        if (password_verify($password, $storedPassword)) {
            echo "true"; //pw corrispondenti
        } else {
            echo "passwordFalse"; //pw sbagliata
        }
    } else {
        echo "usernameFalse"; //username non trovato
    }
}
?>
