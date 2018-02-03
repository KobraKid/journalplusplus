<?php
require_once('connect.php');

if (isset($_POST) & !empty($_POST)) {

	$submitLogin = $_POST['submit-login'];
	$submitRegister = $_POST['submit-register'];

	if ($submitLogin) { // We are logging in an existing user
		echo("Logging in");
	} else if ($submitRegister) { // We are creating a new user
		echo ("Registering");
	} else {
		echo("Neither :(");
	}
	
	$username = mysqli_real_escape_string($connection, $_POST['username']); // Prevent SQL injection
	$password = md5($_POST['password']); // Hash passwords to protect them

	
	$query = "INSERT INTO `users`(id, username, password) VALUES (DEFAULT, '$username', '$password')"; // ID increments by default, no need to specify one
	$result = mysqli_query($connection, $query);

	if ($result) {
		$success = "User registration successfull";
	} else {
		$failure = "User registration failed";
	}
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<title>User Registration</title>
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" href="../css/style.css" />
		
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	</head>
	<body>
		<?php if(isset($success)){ ?><div class="alert alert-success" role="alert"><?php echo $success; ?></div><?php } ?>
		<?php if(isset($failure)){ ?><div class="alert alert-danger" role="alert"><?php echo $failure; ?></div><?php } ?>
		<div class="container-fluid">
			<div class="row">
				<div class="col-6">
					<img src="https://snappygoat.com/b/19a728f16c7c793dd8ccf59bb3d893be6e426944" />
				</div>
				<div class="col-6" id="form">
					<!-- Register -->
					<form id="register" name="register" method="POST">
						<div class="container-fluid">
							<label><b>Enter your email address</b></label>
							<input type="text" placeholder="Example: john.doe@email.com" name="email" required>

							<label><b>Create a username</b></label>
							<input type="text" placeholder="Enter Username" name="username" required>

							<label><b>Create a password</b></label>
							<input type="password" placeholder="Enter Password" name="password" required>

							<label><b>Confirm your password</b></label>
							<input type="password" placeholder="Enter Password" name="password-confirm" required>
						</div>
						<div class="container-fluid">
							<div class="row">
								<button id="register-submit" class="col" name="register-submit" type="submit">Register</button>
							</div>
						</div>
					</form>
					<!-- Switch to login -->
					<form name="goToLogin">
						<div class="container-fluid">
							<div class="row">
								<button id="switch-to-login" class="col" type="button" onClick="switchToLogin()">Already have an account?</button>
							</div>
						</div>
					</form>
					<!-- Log in -->
					<form id="login" name="login" method="POST">
						<div class="container-fluid">

							<label><b>Username</b></label>
							<input type="text" placeholder="Enter Username" name="username-login" required>

							<label><b>Password</b></label>
							<input type="password" placeholder="Enter Password" name="password-login" required>
						</div>
						<div class="container-fluid">
							<div class="row">
								<button id="login-submit" class="col" name="login-submit" type="submit">Log In</button>
							</div>
						</div>
					</form>
					<!-- Switch to register -->
					<form id="cancelLogin" name="cancelLogin">
						<div class="container-fluid">
							<div class="row">
								<button id="login-cancel" class="col cancel" type="button" onClick="switchToRegister()">Cancel</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<script src="../js/script.js"></script>
	</body>
</html>