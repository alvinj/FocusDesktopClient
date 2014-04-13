<?php

session_start();

// username and password sent from form 
$username = $_POST['user']; 
$password = $_POST['password']; 

$result = array();

# no database hit here, you are magically logged in!
$_SESSION['authenticated'] = "yes";
$_SESSION['username'] = $username;

$result['success'] = true;
$result['msg'] = 'User authenticated!';

// encode result as json
echo json_encode($result);
?>
