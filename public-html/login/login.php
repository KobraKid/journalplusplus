<?php
session_start();
require_once('connect.php');

if (isset($_POST) & !empty($_POST)) {
	
	$username = mysqli_real_escape_string($connection, $_POST['username']); // Prevent SQL injection
	$password = md5($_POST['password']); // Hash passwords to protect them
	
	$query = "SELECT * FROM `users` WHERE username='$username' AND password='$password'";
	$result = mysqli_query($connection, $query);
	$count = mysqli_num_rows($result);

	if ($count == 1) {
		$_SESSION['username'] = $username;
	} else {
		$failure = "User login failed";
	}
}

if (isset($_SESSION['username'])) {
	$success = "User already logged in";
}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<title>User Login</title>
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" href="../css/style.css" />
		
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	</head>
	<body>
		<div id="login-box">
			<?php if(isset($success)){ ?><div class="alert alert-success" role="alert"><?php echo $success; ?></div><?php } ?>
			<?php if(isset($failure)){ ?><div class="alert alert-danger" role="alert"><?php echo $failure; ?></div><?php } ?>
			<form method="POST">
				<div class="container">
					<label><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="username" required autofocus>

					<label><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="password" required>

					<button type="submit">Log In</button>
				</div>
				<div class="container">
					<button type="button" class="cancel">Cancel</button>
				</div>
			</form>
		</div>
	</body>
</html>