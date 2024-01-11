<?php
$conn = require('db_conn.php');
//ricevi i dati inviati dal client
$data = json_decode(file_get_contents("php://input"));

//verifica se i dati sono validi
if(!$data){
    echo "Dati non validi o mancanti.";
} else {

    //estrae id utente
    $id_utente = $data->id_utente;
    
    //seleziona gli stati dei colori
    $stmt = $conn->prepare("SELECT * FROM colori_sbloccati WHERE id_utente = ?");
    $stmt->execute([$id_utente]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //nel caso in cui vi sia presente un record nel db fa l'update
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
        //altrimenti la insert
        $stmt = $conn->prepare("INSERT INTO colori_sbloccati (id_utente) values (?)");
        $stmt->execute([$id_utente]);
        //verifica se l'inserimento è riuscito
        if ($stmt->rowCount() > 0) {
            echo "true";
        } else {
            echo "false";
        
        }
    } 
}
?>