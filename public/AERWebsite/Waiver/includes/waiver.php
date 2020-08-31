<?php
  require_once 'phpmysqlconnect.php';

  $last = $_POST['lastname'];
  $first = $_POST['firstname'];
  $birth = $_POST['birthday'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $minor = $_POST['minors'];
  $minors='';
  if($minor){
    foreach ($minor['val'] as $key=>$val) {
        $minors.= $val.", ";
    }
  }
  $room = $_POST['room'];
  $gameDate = $_POST['gameDate'];
  $time = $_POST['time'];


  $date = date('Y-m-d');
  $signatureInput = $_POST['signature'];
  $encodedData = str_replace(' ','+',$signatureInput);
  $decodedData = base64_decode($encodedData);

  $signedFolder = '../SignedWaivers/';
  $signedFileName = $date . '_' . $last . '_' . $first . '.jpg';

	$img = $_POST['signature'];
	$img = str_replace('data:image/jpeg;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$success = file_put_contents($signedFolder . $signedFileName, $data);
  //print $success ? $signedFileName : 'Unable to save the file.';
  
  if ($success === FALSE) {
    $exists  = is_file($signedFolder . $signedFileName);
    if ($exists === FALSE) {
        print 'The file could not be created.';
    } else {
        print 'The file was created but '.
              'it could not be written to it without an error.';
    }
}


  $sql = "INSERT INTO `Personal Info` (`Last Name`, `First Name`, `Birthday`, `Email`, `Phone`, `Minors`, `Room`, `Game Date`, `Time`, `Signature`) VALUES ('$last', '$first', '$birth', '$email', '$phone', '$minors', '$room', '$gameDate', '$time','$signedFileName');";
   mysqli_query($conn, $sql);

   header("Location: ../index.php?waiver_recieved");
?>