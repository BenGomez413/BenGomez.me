let r; 
let g;
let b;
let response = "This is from the Device";
let command = "You do this!";


//Update Color Preview as Sliders are moved.
let slidersOutputs = [
	[document.getElementById("redRange"), document.getElementById("redValue")],
	[document.getElementById("greenRange"), document.getElementById("greenValue")],
	[document.getElementById("blueRange"), document.getElementById("blueValue")]
];

for (let i = 0; i < slidersOutputs.length; i++) {
	slidersOutputs[i][1].innerHTML = slidersOutputs[i][0].value;

	slidersOutputs[i][0].oninput = function () {
		slidersOutputs[i][1].innerHTML = this.value;

		if (i === 0) {
			r = this.value;
		}

		if (i === 1) {
			g = this.value;
		}

		if (i === 2) {
			b = this.value;
		}

		document.getElementById("rgbPreview").style.backgroundColor = `rgb(${r},${g},${b})`;
	}
}

//SETUP
getDeviceInfo();

//UPDATE RGB 
document.getElementById('rgb-button').addEventListener('click', setRGB);
function setRGB() {
	command = `rgb(${r}, ${g}, ${b})`;
	updateMongoDB();
}

//UPDATE TABLE
function updateTable() {
	const tableFromDevice = document.getElementById('table-from-device');
	const tableToDevice = document.getElementById('table-to-device');
	tableFromDevice.innerHTML = response;
	tableToDevice.innerHTML = command;
}

//----------------------------------------MongoDB---------------------------------------------
//GET
document.getElementById('switch-button').addEventListener('click', getDeviceInfo);
function getDeviceInfo() {
	fetch('/getInfo?device=MKR1010')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
		console.log(data);
		r = data[0].rgb.red;
		g = data[0].rgb.green;
		b = data[0].rgb.blue;

		response = data[0].device;
		command = data[0].browser;

		document.getElementById("rgbPreview").style.backgroundColor = `rgb(${r},${g},${b})`;
		updateTable();
	})
	.catch(function (err) {
			console.log(err);
	});
}

//UPDATE
function updateMongoDB() {
	fetch('/updateMongoDB', {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({
				name: 'MKR1010',
				browser: command,
				rgb: {
					red: r,
					green: g,
					blue: b
				}
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			updateTable();
		})
		.catch(function (err) {
			console.log(err);
		});
}

