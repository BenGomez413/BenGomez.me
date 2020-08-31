<?php
include_once 'dbconfig.php';

  try {
      $conn = mysqli_connect($host, $username, $password, $dbname);
      
  } catch (PDOException $pe) {
      die("Could not connect to the database $dbname :" . $pe->getMessage());
  }
?>