<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Arduino Web Controller</title>
	<meta name="description" content="The HTML5 Herald">
	<meta name="author" content="SitePoint">
	<link rel="stylesheet" href="style.css">
</head>

<body>

	<header>
		<h1>Web Controller</h1>
	</header>

	<div class="gridContainer">

		<form class="container rgb" action="includes/update.rgb.php" method="post">
			<h1>RGB</h1>

			<div class="color red">
				<label>RED</label> 
				<div class="value" id="redValue"></div>
				<input class="slider" name="red" type="range" min="0" max="255" value="0" id="redRange">
			</div>

			<div class="color green">
				<label>GREEN</label> 
				<div type="text" class="value" id="greenValue"></div>
				<input class="slider" name="green" type="range" min="0" max="255" value="0" id="greenRange">
			</div>

			<div class="color blue">
				<label >BLUE</label> 
				<div class="value" id="blueValue"></div>
				<input class="slider" name="blue" type="range" min="0" max="255" value="0" id="blueRange">
			</div>

			<input class="submit" name="rgbSubmit" type="submit" value="SEND">
		</form>

		<div class="container rgbPreviewContainer">
			<div class="rgbPreview" id="rgbPreview"></div>
		</div>

		<div class="container switchBoard">
			<h1>SWITCH BOARD</h1><br>
			<form action="/action_page.php">

				<div class="toggle">
					<input type="checkbox" id="switch1" name="switch1" value="switch1">
					<label for="switch1">Pin 0</label><br>
				</div>

				<div class="toggle">
					<input type="checkbox" id="switch2" name="switch2" value="switch2">
					<label for="switch2">Pin 1</label><br>
				</div>

				<div class="toggle">
					<input type="checkbox" id="switch3" name="switch3" value="switch3">
					<label for="switch3">Pin 2</label><br>
				</div>

				<div class="toggle">
					<input type="checkbox" id="switch4" name="switch4" value="switch4">
					<label for="switch4">Pin 3</label><br>
				</div>

				<br>
				<input type="submit" value="SEND">
			</form>

		</div>
	</div>

	<section class="databaseTable">
		<div class="head">
		<div><h1>DATABASE TABLE</h1></div>
			<img src="Assets/arduino-logo-black-and-white.png">
		</div>
		<table>
			<tr>
				<th>ID</th>
				<th>TIME</th>
				<th>RED</th>
				<th>GREEN</th>
				<th>BLUE</th>
				<th>PIN0</th>
			</tr>


			<?php include_once 'includes/database.php';?>


		</table>
	</section>
	<script src="sketch.js"></script>
</body>

</html>
