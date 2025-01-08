<?
// Establish a MySQL database connection
$conn = mysqli_connect("localhost", "username", "password", "database");

// Find the highest itemid value in the table
$sql = "SELECT MAX(itemid) FROM my_table";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
$max_itemid = $row[0];

// Calculate the new itemid value
$new_itemid = $max_itemid + 1;

?>
