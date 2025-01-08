<?php

// Read the request body and insert the content into the database.
$fileContent = file_get_contents("php://input");

// Connect to the database.
$conn = new mysqli("hostname", "username", "password", "database");

// Insert the file content into the database.
$stmt = $conn->prepare("INSERT INTO table (content) VALUES (?)");
$stmt->bind_param("s", $fileContent);
$stmt->execute();

echo "Success";

?>