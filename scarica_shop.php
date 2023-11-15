<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo "Dati non validi o mancanti.";
} else {
    $username = $data->username;
    $stmt = $conn->prepare("SELECT id_utente FROM utenti WHERE username = ?");
    $stmt->execute([$username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_utente = $row["id_utente"];


    $stmt = $conn->prepare("SELECT 
                            serpente_arancione, 
                            serpente_verde, 
                            serpente_blu, 
                            serpente_nero, 
                            serpente_rosa, 
                            serpente_giallo,
                            serpente_grigio,
                            serpente_rosso,

                            cibo_arancione,
                            cibo_verde,
                            cibo_blu,
                            cibo_nero,
                            cibo_rosa,
                            cibo_giallo,
                            cibo_grigio,
                            cibo_rosso
                            FROM colori_sbloccati
                            where id_utente = ?");
    $stmt->execute([$id_utente]);
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $serpente_arancione = $row["serpente_arancione"];
        $serpente_verde = $row["serpente_verde"];
        $serpente_blu = $row["serpente_blu"];
        $serpente_nero = $row["serpente_nero"];
        $serpente_rosa = $row["serpente_rosa"];
        $serpente_giallo = $row["serpente_giallo"];
        $serpente_grigio = $row["serpente_grigio"];
        $serpente_rosso = $row["serpente_rosso"];

        $cibo_arancione = $row["cibo_arancione"];
        $cibo_verde = $row["cibo_verde"];
        $cibo_blu = $row["cibo_blu"];
        $cibo_nero = $row["cibo_nero"];
        $cibo_rosa = $row["cibo_rosa"];
        $cibo_giallo = $row["cibo_giallo"];
        $cibo_grigio = $row["cibo_grigio"];
        $cibo_rosso = $row["cibo_rosso"];



        $response = array(
            "serpente_arancione" => $serpente_arancione,
            "serpente_verde" => $serpente_verde,
            "serpente_blu" => $serpente_blu,
            "serpente_nero" => $serpente_nero,
            "serpente_rosa" => $serpente_rosa,
            "serpente_giallo" => $serpente_giallo,
            "serpente_grigio" => $serpente_grigio,
            "serpente_rosso" => $serpente_rosso,

            "cibo_arancione" => $cibo_arancione,
            "cibo_verde" => $cibo_verde,
            "cibo_blu" => $cibo_blu,
            "cibo_nero" => $cibo_nero,
            "cibo_rosa" => $cibo_rosa,
            "cibo_giallo" => $cibo_giallo,
            "cibo_grigio" => $cibo_grigio,
            "cibo_rosso" => $cibo_rosso
        );
    } else {
        echo json_encode(array("error" => "Nessun dato trovato per l'utente con ID: $id_utente"));
    }
    
    echo json_encode($response);

}
