<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
} else {
    $id_utente = $data->id_utente; 

    $stmt = $conn->prepare("SELECT coins FROM utenti WHERE id_utente = ?");
    $stmt->execute([$id_utente]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $coins = $row["coins"];

    $new_coins_amount = $coins - 50;

    $stmt = $conn->prepare("UPDATE utenti SET coins = ? WHERE id_utente = ?");
    $stmt->execute([$new_coins_amount, $id_utente]);

    $type = $data->type;
    $colore_sbloccato = $data->colore_sbloccato;


    if($type == 'serpente'){
        switch($colore_sbloccato){
            case 'green':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_verde = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'blue':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_blu = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'black':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_nero = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'pink':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_rosa = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'yellow':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_giallo = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'gray':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_grigio = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'red':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET serpente_rosso = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
        }
    } else if ($type == 'cibo'){
        switch($colore_sbloccato){
            case 'green':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_verde = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'blue':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_blu = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'black':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_nero = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'pink':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_rosa = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'yellow':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_giallo = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'gray':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_grigio = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
            case 'orange':
                $stmt = $conn->prepare("UPDATE colori_sbloccati SET cibo_arancione = 'si' WHERE id_utente = ?");
                $stmt->execute([$id_utente]);
                break;
        }
    }
}
?>