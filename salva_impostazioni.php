<?php

$conn = require('db_conn.php');

$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
}   else {
        $username = $data->username;
        $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
        $stmt->execute([$username]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $id_utente = $row["id_utente"];
        
        $numFood = $data->numFood;
        $unitSize = $data->unitSize;
        $speed = $data->speed;
        //$colore_serpente_selezionato = $data->colore_serpente_selezionato;
        //$colore_cibo_selezionato = $data->colore_cibo_selezionato;


        $stmt = $conn->prepare("SELECT * FROM impostazioni WHERE id_utente = ?");
        $stmt->execute([$id_utente]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row !== false) {
            $stmt = $conn->prepare("UPDATE impostazioni SET numero_cibo = ?, dimensione_serpente = ?, speed = ? /*, colore_serpente_selezionato = ?, colore_cibo_selezionato = ?*/ WHERE id_utente = ?");
            $stmt->execute([$numFood, $unitSize, $speed /*, $colore_serpente_selezionato, $colore_cibo_selezionato*/, $id_utente]);

        } else {    
            
            $stmt = $conn->prepare("INSERT INTO impostazioni (id_utente, numero_cibo, dimensione_serpente, speed /*, colore_serpente_selezionato, colore_cibo_selezionato*/) VALUES (?, ?, ?, ?/*, ?, ?*/)");
        $stmt->execute([$id_utente, $numFood, $unitSize, $speed /*, $colore_serpente_selezionato, $colore_cibo_selezionato*/]);

            // Verifica se l'inserimento è riuscito
            if ($stmt->rowCount() > 0) {
                echo "true";
            } else {
                echo "false";
            
            }
        }
    }
?>