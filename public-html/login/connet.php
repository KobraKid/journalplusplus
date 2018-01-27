<?php
$connection = mysqli_connect('localhost', 'pi', 'hub');

if (!$connection) {
	die("Database connection failed" . mysqli_error($connection));
}

$select_db = mysqli_select_db($connection, 'membership');

if (!$select_db) {
	die("Database connection failed" . mysqli_error($connection));
}
?>