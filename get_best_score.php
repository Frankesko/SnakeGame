<?php
//connessione al database
require('db_conn.php');

//verifica della connessione
if (!$conn) {
    die("Connessione al database fallita: " . $conn->errorInfo()[2]);
}

//query per ottenere i punteggi
$query = "
SELECT partite.score, utenti.username
FROM partite
JOIN utenti ON partite.id_utente = utenti.id_utente
ORDER BY partite.score DESC
LIMIT 5
";

$result = $conn->query($query);

//elabora i risultati
$scores = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $scores[] = $row;
}

//chiudi la connessione al database
$conn = null;

//restituisci i risultati come JSON
header('Content-Type: application/json');
echo json_encode($scores);
?>
