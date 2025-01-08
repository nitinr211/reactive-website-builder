<?php
// Connect to the MongoDB database
$mongo = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$database = 'mydatabase';
$collection = 'mycollection';

// Construct a query to retrieve all the documents from the collection
$query = new MongoDB\Driver\Query([]);

// Execute the query and retrieve the data
$cursor = $mongo->executeQuery("$database.$collection", $query);
$data = iterator_to_array($cursor);

// Output the data in an HTML table
echo '<table>';
echo '<thead><tr><th>Name</th><th>Email</th></tr></thead>';
echo '<tbody>';
foreach ($data as $document) {
    echo '<tr>';
    echo '<td>' . $document->name . '</td>';
    echo '<td>' . $document->email . '</td>';
    echo '</tr>';
}
echo '</tbody>';
echo '</table>';
?>
