<?php
//connessione
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if(!$data){
    echo "Dati non validi o mancanti.";
} else {
    //estrae lo username dai dati
    $username = $data->username;
    //prende l'id utente
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_utente = $row["id_utente"];
    
    //estrae le impostazioni di gioco
    //numero del cibo, 
    //grandezza serpente
    //e velocità
    $numFood = $data->numFood;
    $unitSize = $data->unitSize;
    $speed = $data->speed;
    //$colore_serpente_selezionato = $data->colore_serpente_selezionato;
    //$colore_cibo_selezionato = $data->colore_cibo_selezionato;

    //seleziona le impostazioni dell'utente
    $stmt = $conn->prepare("SELECT * FROM impostazioni WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //se ne sono già presenti esegue un update
    if($row !== false) {
        $stmt = $conn->prepare("UPDATE impostazioni SET numero_cibo = ?, dimensione_serpente = ?, speed = ? /*, colore_serpente_selezionato = ?, colore_cibo_selezionato = ?*/ WHERE id_utente = ?");
        $stmt->execute([$numFood, $unitSize, $speed /*, $colore_serpente_selezionato, $colore_cibo_selezionato*/, $id_utente]);

    } else {    
        //altrimenti esegue l'inserimento
        $stmt = $conn->prepare("INSERT INTO impostazioni (id_utente, numero_cibo, dimensione_serpente, speed, colore_serpente_selezionato, colore_cibo_selezionato) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id_utente, $numFood, $unitSize, $speed, 'orange', 'red']);

        //verifica se l'inserimento è riuscito
        if ($stmt->rowCount() > 0) {
            echo "true";
        } else {
            echo "false";
        
        }
    }
}
?>