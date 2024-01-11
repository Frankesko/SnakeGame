<?php

//connessione
$connessione = require __DIR__ . "/db_conn.php";

define('DEBUG', false);

//prende HTTP METODO, percorso, e la richiesta
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);



// divide la table dalla key
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$_key = array_shift($request);
$key = $_key;


// escape the columns and values from the input object
if (isset($input)) {
  $columns = preg_replace('/[^a-z0-9_]+/i', '', array_keys($input));
  $values = array_map(function ($value) use ($connessione) {
      if ($value === null) return null;
      return $connessione->quote($value);
  }, array_values($input));
}

// costruisce la parte SET del comand SQL 
if (isset($input)) {
  $set = '';
  for ($i = 0; $i < count($columns); $i++) {
      $set .= ($i > 0 ? ',' : '') . '`' . $columns[$i] . '`=';
      $set .= ($values[$i] === null ? 'NULL' : '"' . $values[$i] . '"');
  }
}

//richiesta get per prendere le partite giocate
function handleGetRequest($table, $key, $pdo) {
  $sql = "SELECT * FROM `$table`" . ($key ? " WHERE id_utente = " . $pdo->quote($key) : '');

  try {
      $statement = $pdo->query($sql);
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);

      // Invia la risposta al client
      header('Content-Type: application/json');
      echo json_encode(['status' => 'success', 'data' => $result]);
  } catch (PDOException $e) {
      // In caso di errore, invia una risposta di errore al client
      http_response_code(404);
      echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
  }
}

/*
function handlePostRequest($table, $json_data, $pdo) {
  $set = json_decode($json_data, true);
  $columns = preg_replace('/[^a-z0-9_]+/i', '', array_keys($set));
  $values = array_map(function ($value) use ($pdo) {
      return $pdo->quote($value);
  }, array_values($set));

  $columns_string = implode(', ', $columns);
  $values_string = implode(', ', $values);

  $sql = "INSERT INTO `$table` ($columns_string) VALUES ($values_string)";

  try {
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
      $lastInsertId = $pdo->lastInsertId();
      $response = array('status' => 'success', 'message' => 'INSERT OK', 'inserted_id' => $lastInsertId, 'inserito' => $values_string);
      header('Content-Type: application/json');
      echo json_encode($response);
  } catch (PDOException $e) {
      http_response_code(404);
      $response = array('status' => 'error', 'message' => $e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
  }
}
*/

//richiesta put per la modifica della password
function handlePutRequest($table, $input, $key, $pdo){
  $sql = "UPDATE $table SET password = :campo WHERE id_utente = :id_utente";
  try {
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':campo', $input['password'], PDO::PARAM_STR);
      $stmt->bindParam(':id_utente', $key, PDO::PARAM_INT);
      $stmt->execute();
      $response = array('status' => 'success', 'message' => 'Password aggiornata');
      header('Content-Type: application/json');
      echo json_encode($response);
  } catch (PDOException $e) {
      http_response_code(404);
      $response = array('status' => 'error', 'message' => $e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
  }
}

//richiesta delete per l'eliminazione dell'account
function handleDeleteRequest($table, $key, $pdo) {
  $sql1 = "DELETE FROM partite WHERE id_utente = " . $pdo->quote($key);
  $sql2 = "DELETE FROM bie WHERE id_utente = " . $pdo->quote($key);
  $sql3 = "DELETE FROM colori_sbloccati WHERE id_utente = " . $pdo->quote($key);
  $sql4 = "DELETE FROM impostazioni WHERE id_utente = " . $pdo->quote($key);
  $sql = "DELETE FROM `$table` WHERE id_utente = " . $pdo->quote($key);
  try {
      $statement1 = $pdo->query($sql1);
      $statement2 = $pdo->query($sql2);
      $statement3 = $pdo->query($sql3);
      $statement4 = $pdo->query($sql4);
      $statement = $pdo->query($sql);
      $response = array('status' => 'success', 'message' => 'DELETE OK');
      header('Content-Type: application/json');
      echo json_encode($response);
  } catch (PDOException $e) {
      http_response_code(404);
      $response = array('status' => 'error', 'message' => $e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
  }
}



// create SQL based on HTTP method
switch ($method) {
  case 'GET':
      handleGetRequest($table, $key, $connessione);
      break;
  case 'POST':
      //handlePostRequest($table, file_get_contents('php://input'), $connessione);
      break;
  case 'PUT':
      handlePutRequest($table, $input, $key, $connessione);
      break;
  case 'DELETE':
      handleDeleteRequest($table, $key, $connessione);
      break;
  default:
    break;
}
?>