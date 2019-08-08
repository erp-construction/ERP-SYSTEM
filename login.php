<?php
session_start();
 include "conn.php";
if(isset($_POST["submit"]))
{
  
   $username = $_POST["username"];
   $password = $_POST["password"];
   
   $login = $db->query("SELECT * FROM users WHERE name = '$username' AND password = '$password'");
   if($login->num_rows > 0)
   {
	  while($row = $login->fetch_assoc())
	  {
		$_SESSION['name'] = $row["name"];
		header("Location:code/index1.html");
	  }
   }
   else
   {
		echo mysqli_error($db);
   }
   
}
else{
echo "No data recieved";
}
