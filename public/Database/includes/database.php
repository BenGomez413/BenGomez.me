<?php
  require_once 'phpmysqlconnect.php';

  $sql = "SELECT `ID`, `Last Name`, `First Name`, `Birthday`, `Email`, `Phone`, `Minors`, `Room`, `Time`, `Signature` from `Personal Info`";
  $result = $conn-> query($sql);

  if($result-> num_rows > 0){
    while($row = $result-> fetch_assoc()){
      echo "<tr><td>" . $row["ID"] ."</td><td>". $row["Last Name"] ."</td><td>". $row["First Name"] ."</td><td>". $row["Birthday"] ."</td><td>". $row["Email"] ."</td><td>". $row["Phone"] ."</td><td>". $row["Minors"] . "</td><td>". $row["Room"] ."</td><td>". $row["Time"] ."</td><td>". $row["Signature"] ."</td></tr>";
    }
    echo "</table>";
  }
  else {
    echo "0 result";
  }
  $conn-> close();
?>