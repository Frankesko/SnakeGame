<?php

// connect to the mysql database
$connessione = require('db_conn.php');

define('DEBUG', false);

// get the HTTP method, path, and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents("php://input"));

if (DEBUG) {
    var_dump($method);
    var_dump($request);
    var_dump($input);
}


// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$_key = array_shift($request);
$key = $_key;
//$key = $_key + 0;

if (DEBUG) {
    var_dump($table);
    var_dump($_key);
    var_dump($key);
}

// escape the columns and values from the input object
if (isset($input)) {
  $columns = preg_replace('/[^a-z0-9_]+/i', '', is_array($input) ? array_keys($input) : []);
  $values = array_map(function ($value) use ($connessione) {
      if ($value === null) return null;
      return $connessione->quote($value);
  }, array_values($input));
}

if (DEBUG) {
    var_dump($columns);
    var_dump($values);
}

// build the SET part of the SQL command
if (isset($input)) {
  $set = '';
  for ($i = 0; $i < count($columns); $i++) {
      $set .= ($i > 0 ? ',' : '') . '`' . $columns[$i] . '`=';
      $set .= ($values[$i] === null ? 'NULL' : '"' . $values[$i] . '"');
  }
}

function handleGetRequest($table, $key, $pdo){
  $sql = "SELECT COUNT (*) FROM `$table`" . ($key ? " WHERE ID = " . $pdo->quote($key) : '');
  try {
    $statement = $pdo->query($sql);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  } catch (PDOException $e) {
      http_response_code(404);
      die($e->getMessage());
  }
}

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
      $response = array('status' => 'success', 'message' => 'INSERT OK', 'inserted_id' => $lastInsertId);
      header('Content-Type: application/json');
      echo json_encode($response);
  } catch (PDOException $e) {
      http_response_code(404);
      $response = array('status' => 'error', 'message' => $e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
  }
}

function handlePutRequest($table, $input, $key, $pdo){
  $sql = "UPDATE $table SET password = :campo WHERE id = :id";
  try {
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':campo', $input['password'], PDO::PARAM_STR);
      $stmt->bindParam(':id', $key, PDO::PARAM_INT);
      $stmt->execute();
      $response = array('status' => 'success', 'message' => 'PUT OK');
      header('Content-Type: application/json');
      echo json_encode($response);
  } catch (PDOException $e) {
      http_response_code(404);
      $response = array('status' => 'error', 'message' => $e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
  }
}


function handleDeleteRequest($table, $key, $pdo) {
  $sql = "DELETE FROM `$table` WHERE id = " . $pdo->quote($key);
  try {
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
      handlePostRequest($table, file_get_contents('php://input'), $connessione);
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


if(DEBUG){
  var_dump($sql);
}

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
}


?>