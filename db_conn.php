<?php
// Connessione al database
$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "SnakeDb";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Errore di connessione al database: " . $e->getMessage();
    die();
}
return $conn;
?>