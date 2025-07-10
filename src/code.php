<?php
// Define the API endpoint
$apiUrl = "https://example.com/api/send-message"; // Replace with the actual API URL

// Authentication credentials
$username = "your_username";
$authToken = "your_auth_token";

// Message data
$messageData = [
    "recipient" => "receiver_username",  // The recipient of the message
    "message" => "Hello, this is a test message!",  // The message content
];

// Convert the data to JSON format
$jsonData = json_encode($messageData);

// Initialize cURL session
$ch = curl_init($apiUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $authToken" // Include the authentication token in headers
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

// Execute the request and get the response
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($ch);

// Handle response
if ($httpCode === 200) {
    echo "Message sent successfully: " . $response;
} else {
    echo "Failed to send message. HTTP Code: " . $httpCode . "\nResponse: " . $response;
}
?>
