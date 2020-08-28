<?php
  require_once 'phpmysqlconnect.php';

  $red = $_POST['red'];
  $green = $_POST['green'];
  $blue = $_POST['blue'];

  $sql = "UPDATE `MKR1010` 
          SET `RED` = '$red', 
               `GREEN` ='$green', 
               `BLUE` ='$blue'  
          WHERE `ID`=1";
   
  if($conn->query($sql) === true){
    header("Location: ../index.php?web2server");
  } else {
    echo "ERROR: Could not able to execute $sql. " . $mysqli->error;
  }

  $conn->close();
?>