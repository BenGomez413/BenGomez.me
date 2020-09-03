let r = 0;
let g = 0;
let b = 0;

let arduinoJSON = null;
// { 
//   "device": "MKR1010",
//   "red": "50",
//   "green": "100",
//   "blue": "255"
// }


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
getJSON();



document.getElementById('rgb-button').addEventListener('click', setRGB);
function setRGB() {
	arduinoJSON.red = document.getElementById("redRange").value;
	arduinoJSON.green = document.getElementById("greenRange").value;
	arduinoJSON.blue = document.getElementById("blueRange").value;
	updateJSON(arduinoJSON);
	updateTable();
	console.log(`rgb(${arduinoJSON.red}, ${arduinoJSON.green}, ${arduinoJSON.blue})`);
}

function getJSON() {
	fetch('/getJSON') // Call the fetch function passing the url of the API as a parameter
		.then(async function (res) {
			const incommingData = await res.json();
			//console.log(incommingData);
			arduinoJSON = incommingData;
			console.log(`rgb(${arduinoJSON.red}, ${arduinoJSON.green}, ${arduinoJSON.blue})`);
			updateTable();
		})
		.catch(function (err) {
			console.log(err);
		});
}

function updateTable() {
	const tableDevice = document.getElementById('table-device');
	const tableRed = document.getElementById('table-red');
	const tableGreen = document.getElementById('table-green');
	const tableBlue = document.getElementById('table-blue');

	tableDevice.innerHTML = arduinoJSON.device;
	tableRed.innerHTML = arduinoJSON.red;
	tableGreen.innerHTML = arduinoJSON.green;
	tableBlue.innerHTML = arduinoJSON.blue;
}


function updateJSON(updatedJSON) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedJSON)
  };
	fetch('/updateJSON', options)
	.then(async function (res) {
		const incommingData = await res.json();
		console.log(incommingData);
		updateTable();
	})
	.catch(function (err) {
		console.log(err);
	});
}

