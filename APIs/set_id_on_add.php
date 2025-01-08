<?
// Establish a MySQL database connection
$conn = mysqli_connect("localhost", "username", "password", "database");

// Remove a row from the table
$itemid = 123; // Replace with the itemid value of the row to be deleted

// Decrement the itemid values of all rows with higher itemid values
$sql = "UPDATE my_table SET itemid = itemid - 1 WHERE itemid > $itemid";
mysqli_query($conn, $sql);
?> 