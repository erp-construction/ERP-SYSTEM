<!DOCTYPE html>
<html>
<head>
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
		
		<div class="containter">

		<div class="login-box">
			<div class="row">
				<div class="col-md-6 ">
					
					<h2>Admin Login</h2>
					<form action="Login.php" method="POST">
					<div class="form-group">
						<label>Admin Username</label>
						<center><input type="text" name="username" class="form-control" required></center>
					</div>
					<div class="form-group">
						<label>Password</label>
						<input type="password" name="password" class="form-control" required>
					</div>
					<button type="submit" name="submit" class="btn btn-primary">Login</button>

						
					</form>
				</div>

				
			</div>
			</div>
		</div>
</body>
</html>