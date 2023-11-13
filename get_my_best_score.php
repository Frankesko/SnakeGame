<?php
// Connessione al database
require('db_conn.php');

// Verifica della connessione
if (!$conn) {
    die("Connessione al database fallita: " . $conn->errorInfo()[2]);
}
$id_utente = isset($_GET['id_utente']) ? $_GET['id_utente'] : null;
// Controlla se l'ID utente è stato fornito
if ($id_utente === null) {
    die("ID utente mancante nella richiesta.");
}
// Query per ottenere i punteggi
$query = "
SELECT partite.score, utenti.username
FROM partite
JOIN utenti ON partite.id_utente = utenti.id_utente
WHERE partite.id_utente = :id_utente
ORDER BY partite.score DESC
LIMIT 5
";

// Prepara la query
$stmt = $conn->prepare($query);

// Esegui la query sostituendo il parametro :id_utente
$stmt->execute(['id_utente' => $id_utente]);

// Elabora i risultati
$scores = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $scores[] = $row;
}

// Chiudi la connessione al database
$conn = null;

// Restituisci i risultati come JSON
header('Content-Type: application/json');
echo json_encode($scores);
?>