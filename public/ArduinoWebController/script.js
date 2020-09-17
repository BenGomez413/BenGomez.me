let arduinoJSON = {
	"device": "MKR1010",
	"red": "50",
	"green": "100",
	"blue": "255"
}

let r = arduinoJSON.red;
let g = arduinoJSON.green;
let b = arduinoJSON.blue;

let response = "This is from the Arduino";
let command = "You do this!";

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
// getJSON();

document.getElementById('rgb-button').addEventListener('click', setRGB);

function setRGB() {
	arduinoJSON.red = document.getElementById("redRange").value;
	arduinoJSON.green = document.getElementById("greenRange").value;
	arduinoJSON.blue = document.getElementById("blueRange").value;
	// updateJSON(arduinoJSON);
	command = `rgb(${r}, ${g}, ${b})`;
	updateMongoDB();
	//console.log(`rgb(${arduinoJSON.red}, ${arduinoJSON.green}, ${arduinoJSON.blue})`);
}

// function getJSON() {
// 	fetch('/getJSON') // Call the fetch function passing the url of the API as a parameter
// 		.then(async function (res) {
// 			let incommingData = await res.json();
// 			console.log(incommingData);
// 			arduinoJSON = incommingData;
// 			//console.log(`rgb(${arduinoJSON.red}, ${arduinoJSON.green}, ${arduinoJSON.blue})`);
// 			updateTable();
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }


// function getJSON() {
// 	fetch('/getJSON')
// 		.then(res => res.json())
// 		.then(function (data) {
// 			console.log(data);
// 			arduinoJSON = data;

// 			updateTable();
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }

function updateTable() {
	const tableFromDevice = document.getElementById('table-from-device');
	const tableToDevice = document.getElementById('table-to-device');

	tableFromDevice.innerHTML = response;
	tableToDevice.innerHTML = command;
}


// function updateJSON(updatedJSON) {
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(updatedJSON)
// 	};
// 	fetch('/updateJSON', options)
// 		.then(async function (res) {
// 			updateTable();
// 			getJSON();
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }





//----------------------------------------MongoDB---------------------------------------------
//GET
getFromMongoDB();

function getFromMongoDB() {
	fetch('/getMicrocontrollerData', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({name: 'MKR1010'})
		})
		.then(res => res.json())
		.then(data => {
			//console.log(data[0]);
			r = data[0].rgb.red;
			g = data[0].rgb.green;
			b = data[0].rgb.blue;
			document.getElementById("rgbPreview").style.backgroundColor = `rgb(${r},${g},${b})`;
			updateTable();
		})
		.catch(function (err) {
			console.log(err);
		});
}


//UPDATE
document.getElementById('switch-button').addEventListener('click', updateMongoDB);
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
