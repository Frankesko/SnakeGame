<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if(!$data){
    echo "Dati non validi o mancanti.";
}   else {
    //estrae lo username dai dati
    $username = $data->username;
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_utente = $row["id_utente"];
    
    //prende lo stato di tutti i colori di quell'utente
    $stmt = $conn->prepare("SELECT * FROM colori_sbloccati WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //inserisce i colori nella tabella (per non avere lo shop vuoto nel caso di un nuovo account)
    $stmt = $conn->prepare("INSERT INTO colori_sbloccati (id_utente) values (?)");
    $stmt->execute([$id_utente]);
    //verifica se l'inserimento è riuscito
    if ($stmt->rowCount() > 0) {
        //
        echo "true";
    } else {
        echo "false";
    
    }

}
?>