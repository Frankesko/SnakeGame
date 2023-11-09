<?php

$conn = require('db_conn.php');

$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
}   
    $username = $data->username;
    $username = trim($username);
    error_log("Received username: " . $username);
    // Esegui una query per verificare se lo username è già presente nel database
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM utenti WHERE LOWER(username) = LOWER(:username)");
    $stmt->execute(['username' => $username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['count'] > 0) {
        // Lo username è già presente nel database
        $response = array('available' => false);
    } else {
        // Lo username è disponibile
        $response = array('available' => true);
    }

    echo json_encode($response);


?>
