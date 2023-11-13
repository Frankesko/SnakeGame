<?php
// Connessione al database
require('db_conn.php');

// Verifica della connessione
if (!$conn) {
    die("Connessione al database fallita: " . $conn->errorInfo()[2]);
}

// Query per ottenere i punteggi
$query = "
SELECT partite.score, utenti.username
FROM partite
JOIN utenti ON partite.id_utente = utenti.id_utente
ORDER BY partite.score DESC
LIMIT 5
";

$result = $conn->query($query);

// Elabora i risultati
$scores = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $scores[] = $row;
}

// Chiudi la connessione al database
$conn = null;

// Restituisci i risultati come JSON
header('Content-Type: application/json');
echo json_encode($scores);
?>
