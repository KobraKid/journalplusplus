<?php
session_start();
session_destroy();
header('location: login.php'); // Hopefully modifying this helps
?>