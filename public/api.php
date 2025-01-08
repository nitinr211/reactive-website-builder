<?php
header('Content-Type: application/json'); // Set JSON header
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Allow all methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Access-Control-Allow-Credentials: false'); // Disable credentials for wildcard

// Connect to the database
$mysqli = new mysqli('localhost', 'root', '', 'quanta');

if ($mysqli->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection error: ' . $mysqli->connect_error]);
    exit();
}

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['dataArId']) && isset($data['action']) && $data['action'] === 'setSelected') {
    $dataArId = $mysqli->real_escape_string($data['dataArId']);
    $outerHtml = $mysqli->real_escape_string($data['outerHtml']); // Escape outerHTML to prevent SQL injection

    try {
        // Start a transaction
        $mysqli->begin_transaction();   

        // Set `selected` to 1 for the specified `id` and store `outerHTML`
        $updateQuery = "UPDATE builder SET selected = 1, itemcode = '$outerHtml' WHERE itemid = '$dataArId'";
        if (!$mysqli->query($updateQuery)) {
            throw new Exception('Error setting selected column to 1: ' . $mysqli->error);
        }

        // Commit the transaction
        $mysqli->commit();

        echo json_encode(['success' => true, 'message' => 'Selected set to 1']);
    } catch (Exception $e) {
        // Rollback the transaction on error
        $mysqli->rollback();
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data or action']);
}

$mysqli->close();
?>
