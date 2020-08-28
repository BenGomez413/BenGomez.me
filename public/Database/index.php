<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amazing Escape Room Database</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body id="body">
  <div class="vignette">
    <div class="container">
      <h2>Personal Info</h2>
      <table>
        <tr>
        <th>ID</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Birthday</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Minors</th>
        <th>Room</th>
        <th>Time</th>
        <th>Signature</th>
      </tr>

      <?php include_once 'includes/database.php';?>

      </table>

    </div>
  </div>
  <script src="scripts.js"></script>
</body>
</html>