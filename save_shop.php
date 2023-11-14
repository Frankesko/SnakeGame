<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
}   else {
    $id_utente = $data->id_utente;
    
    $stmt = $conn->prepare("SELECT * FROM colori_sbloccati WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if($row !== false) {
        $stmt = $conn->prepare("UPDATE  colori_sbloccati 
                                    SET 
                                        serpente_arancione = ?, 
                                        serpente_verde = ?, 
                                        serpente_blu = ?, 
                                        serpente_nero = ?, 
                                        serpente_rosa = ?, 
                                        serpente_giallo = ?,
                                        serpente_grigio = ?,
                                        serpente_rosso = ?,

                                        cibo_arancione = ?,
                                        cibo_verde = ?,
                                        cibo_blu = ?,
                                        cibo_nero = ?,
                                        cibo_rosa = ?,
                                        cibo_giallo = ?,
                                        cibo_grigio = ?,
                                        cibo_rosso = ?
                                        WHERE id_utente = ?");
        $stmt->execute([$serpente_arancione, $serpente_verde, $serpente_blu, $serpente_nero, $serpente_rosa, $serpente_giallo, $serpente_grigio, $serpente_rosso,
                        $cibo_arancione, $cibo_verde, $cibo_blu, $cibo_nero, $cibo_rosa, $cibo_giallo, $cibo_grigio, $cibo_rosso,
                        $id_utente]);

    } else {    
        /*
        $stmt = $conn->prepare("INSERT INTO colori_sbloccati 
                                            id_utente = ?,
                                            serpente_arancione = ?, 
                                            serpente_verde = ?, 
                                            serpente_blu = ?, 
                                            serpente_nero = ?, 
                                            serpente_rosa = ?, 
                                            serpente_giallo = ?,
                                            serpente_grigio = ?,
                                            serpente_rosso = ?,

                                            cibo_arancione = ?,
                                            cibo_verde = ?,
                                            cibo_blu = ?,
                                            cibo_nero = ?,
                                            cibo_rosa = ?,
                                            cibo_giallo = ?,
                                            cibo_grigio = ?,
                                            cibo_rosso = ?");
        $stmt->execute([$id_utente, 
                        $serpente_arancione, $serpente_verde, $serpente_blu, $serpente_nero, $serpente_rosa, $serpente_giallo, $serpente_grigio, $serpente_rosso,
                        $cibo_arancione, $cibo_verde, $cibo_blu, $cibo_nero, $cibo_rosa, $cibo_giallo, $cibo_grigio, $cibo_rosso]);
        */

        $stmt = $conn->prepare("INSERT INTO colori_sbloccati (id_utente) values (?)");
        $stmt->execute([$id_utente]);
        // Verifica se l'inserimento è riuscito
        if ($stmt->rowCount() > 0) {
            echo "true";
        } else {
            echo "false";
        
        }
    } 
}
?>