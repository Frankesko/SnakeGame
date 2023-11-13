<?php
$conn = require('db_conn.php');
// Ricevi i dati inviati dal client (JavaScript)
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo "Dati non validi o mancanti.";
}   else {
        $id_utente = $data->id_utente;
        
        $serpente_arancione = $data-> serpente_arancione;
        $serpente_verde = $data-> serpente_verde;
        $serpente_blu = $data-> serpente_blu;
        $serpente_nero = $data-> serpente_nero;
        $serpente_rosa = $data-> serpente_rosa;
        $serpente_giallo = $data-> serpente_giallo;
        $serpente_grigio = $data-> serpente_grigio;
        $serpente_rosso = $data-> serpente_rosso;

        $cibo_arancione = $data-> cibo_arancione;
        $cibo_verde = $data-> cibo_verde;
        $cibo_blu = $data-> cibo_blu;
        $cibo_nero = $data-> cibo_nero;
        $cibo_rosa = $data-> cibo_rosa;
        $cibo_giallo = $data-> cibo_giallo;
        $cibo_grigio = $data-> cibo_grigio;
        $cibo_rosso = $data-> cibo_rosso;
        
        $stmt = $conn->prepare("SELECT * FROM impostazioni WHERE id_utente = ?");
        $stmt->execute([$id_utente]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row !== false) {
            $stmt = $conn->prepare("UPDATE  colori_selezionati 
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
            
            $stmt = $conn->prepare("INSERT INTO colori_selezionati 
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

            // Verifica se l'inserimento è riuscito
            if ($stmt->rowCount() > 0) {
                echo "true";
            } else {
                echo "false";
            
            }
        } 
}
?>