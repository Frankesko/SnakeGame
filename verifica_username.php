<?php
//connessione
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if(!$data){
    echo "Dati non validi o mancanti.";
} else {
    //estrae username dai dati
    $username = $data->username;
    $username = trim($username);
    error_log("Received username: " . $username);
    //esegui una query per verificare se lo username è già presente nel database
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM utenti WHERE LOWER(username) = LOWER(:username)");
    $stmt->execute(['username' => $username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['count'] > 0) {
        //username è già presente nel database
        $response = array('available' => false);
    } else {
        //username è disponibile
        $response = array('available' => true);
    }

    echo json_encode($response);
}

?>
