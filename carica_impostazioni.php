<?php
//connessione
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    //estrae lo username dai dati
    $username = $data->username;

    //esegue la query per ottenere l'id utente
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_utente = $row["id_utente"];

    //esegue una query per ottenere le impostazioni dell'utente
    $stmt = $conn->prepare("SELECT numero_cibo, dimensione_serpente, speed, colore_serpente_selezionato, colore_cibo_selezionato
                            FROM impostazioni WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //accesso ai valori
    $numero_cibo = $row["numero_cibo"];
    $dimensione_serpente = $row["dimensione_serpente"];
    $speed = $row["speed"];
    $colore_serpente_selezionato = $row["colore_serpente_selezionato"];
    $colore_cibo_selezionato = $row["colore_cibo_selezionato"];

    //array associativo con i risultati delle impostazioni
    $response = array(
        "numero_cibo" => $numero_cibo,
        "dimensione_serpente" => $dimensione_serpente,
        "speed" => $speed,
        "colore_serpente_selezionato" => $colore_serpente_selezionato,
        "colore_cibo_selezionato" => $colore_cibo_selezionato
    );
    
    //conversione dell'array in json per restituirlo all'index.js
    echo json_encode($response);
}
?>