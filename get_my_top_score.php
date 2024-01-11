<?php
$conn = require('db_conn.php');
//ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    //prendi l'id utente
    $id_utente = $data->id_utente;

    //seleziona lo score migliore dalle partite con quell'id utente
    $stmt = $conn->prepare("SELECT score FROM partite WHERE id_utente = ? ORDER BY partite.score DESC LIMIT 1");
    $stmt->execute([$id_utente]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $score = $row["score"];

        // restituisci il punteggio come risposta JSON
        echo json_encode(["success" => true, "score" => $score]);
    } else {
        echo json_encode(["success" => false, "message" => "Utente non trovato o non autenticato"]);
    }
}
?>
