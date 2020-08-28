<?php
  require_once 'phpmysqlconnect.php';

  $sql = "SELECT `ID`, `TIME`, `RED`, `GREEN`, `BLUE`, `PIN0` FROM `MKR1010`";
  $result = $conn-> query($sql);

  if($result-> num_rows > 0){
    while($row = $result-> fetch_assoc()){
      echo "<tr><td>" . $row["ID"] ."</td><td>". $row["TIME"] ."</td><td>". $row["RED"] ."</td><td>". $row["GREEN"] ."</td><td>". $row["BLUE"] ."</td><td>". $row["PIN0"] ."</td></tr>";
    }
    echo "</table>";
  }
  else {
    echo "0 result";
  }

  $conn-> close();

?>
