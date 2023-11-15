<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
}   else {
    $username = $data->username;
    $type = $data->type;
    $colore_impostato = $data->colore_impostato;

    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_utente = $row["id_utente"];

    
    if($type == 'serpente') {
        $stmt = $conn->prepare("SELECT colore_serpente_selezionato from impostazioni where id_utente = ?");
        $stmt->execute([$id_utente]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $prevColore = $row["colore_serpente_selezionato"];
        

        $stmt = $conn->prepare("UPDATE impostazioni SET colore_serpente_selezionato = ? WHERE id_utente = ?");
        $stmt->execute([$colore_impostato, $id_utente]);

        

    } else if ($type == 'cibo'){
        $stmt = $conn->prepare("SELECT colore_cibo_selezionato from impostazioni where id_utente = ?");
        $stmt->execute([$id_utente]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $prevColore = $row["colore_cibo_selezionato"];


        $stmt = $conn->prepare("UPDATE impostazioni SET colore_cibo_selezionato = ? WHERE id_utente = ?");
        $stmt->execute([$colore_impostato, $id_utente]);

        

    }
    echo $prevColore;
}


?>