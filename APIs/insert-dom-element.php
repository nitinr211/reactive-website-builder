<?php
// move_element.php

// Connect to the database
$mysqli = new mysqli("localhost", "username", "password", "database");

// Get the ID and position from the request
$id = $_POST["id"];
$position = $_POST["position"];

// Update the position of the element
$query = "UPDATE elements SET position = $position WHERE id = $id";
$result = $mysqli->query($query);

// Close the database connection
$mysqli->close();

// Return a response
header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
