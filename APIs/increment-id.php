<?// Establish a MySQL database connection
$conn = mysqli_connect("localhost", "username", "password", "database");

// Check if the itemid column has an AUTO_INCREMENT attribute
$sql = "SHOW COLUMNS FROM my_table LIKE 'itemid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);

if (strpos($row['Extra'], 'auto_increment') === false) {
    // Add AUTO_INCREMENT attribute to the itemid column
    $sql = "ALTER TABLE my_table MODIFY itemid INT AUTO_INCREMENT";
    mysqli_query($conn, $sql);
}
?>