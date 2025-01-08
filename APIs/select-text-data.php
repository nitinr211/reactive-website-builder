<?php 

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS headers first
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Log the origin for debugging
    error_log("Origin: " . $_SERVER['HTTP_ORIGIN']);
    
    // Allow only localhost:3000 and localhost:7001 for security purposes
    if ($_SERVER['HTTP_ORIGIN'] == 'http://localhost:3000' || $_SERVER['HTTP_ORIGIN'] == 'http://localhost:7001') {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // Cache for 1 day
    } else {
        error_log("Origin not allowed: " . $_SERVER['HTTP_ORIGIN']);
        http_response_code(403); // Respond with 403 Forbidden
        exit();
    }
}
 else {
    error_log("No HTTP_ORIGIN header found");
}

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0); // OPTIONS request should exit immediately
}

// Database connection settings
$host = "localhost";
$user = "root";
$password = "";
$dbname = "quanta";

$con = mysqli_connect($host, $user, $password, $dbname);

// Handle connection error
if (!$con) {
    error_log("Database connection failed: " . mysqli_connect_error());
    die("Connection failed: " . mysqli_connect_error());
}

// Set the request method
$method = $_SERVER['REQUEST_METHOD'];
error_log("Request method: " . $method);

// Example of logging request method
if ($method == 'GET') {
    error_log("GET request received");
}

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM builder WHERE type='text'";
        break;
    default:
        error_log("Unsupported method: " . $method);
        http_response_code(405); // Method not allowed
        exit();
}

// Execute the SQL query
$result = mysqli_query($con, $sql);

// Handle SQL errors
if (!$result) {
    error_log("SQL error: " . mysqli_error($con));
    http_response_code(404);
    die(mysqli_error($con));
}

// Handle the GET request
if ($method == 'GET') {
    $response = [];
    while ($row = mysqli_fetch_object($result)) {
        $response[] = $row;
    }

    // Log example output (first result if available)
    if (!empty($response)) {
        error_log("First row of data: " . print_r($response[0], true));
    } else {
        error_log("No data found");
    }
    
    echo json_encode($response);
}

// Close the connection
$con->close();
?>
