<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {

    $stmt = $conn->prepare("SELECT numero_cibo, dimensione_serpente, speed, colore_serpente_selezionato, colore_cibo_selezionato FROM impostazioni WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Ora puoi accedere ai valori come segue
    $numero_cibo = $row["numero_cibo"];
    $dimensione_serpente = $row["dimensione_serpente"];
    $speed = $row["speed"];
    $colore_serpente_selezionato = $row["colore_serpente_selezionato"];
    $colore_cibo_selezionato = $row["colore_cibo_selezionato"];

    $response = array(
        "numero_cibo" => $numero_cibo,
        "dimensione_serpente" => $dimensione_serpente,
        "speed" => $speed,
        "colore_serpente_selezionato" => $colore_serpente_selezionato,
        "colore_cibo_selezionato" => $colore_cibo_selezionato
    );
    
    echo json_encode($response);
}
?>