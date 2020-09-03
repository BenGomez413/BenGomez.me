let name = "";
let r;
let g;
let b;

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

		setRGBpreview();
	}
}

getRGB();

function setRGBpreview() {
	document.getElementById("rgbPreview").style.backgroundColor = `rgb(${r},${g},${b})`;
}

document.getElementById('switch-button').addEventListener('click', getRGB);

function getRGB(e) {
	if (e) {
		e.preventDefault();
	}

	fetch('/getRGB') // Call the fetch function passing the url of the API as a parameter
		.then(async function (res) {
			const incommingData = await res.json();
			//console.log(incommingData);

			name = incommingData.name;
			r = incommingData.red;
			g = incommingData.green;
			b = incommingData.blue;

			console.log(`rgb(${r}, ${g}, ${b})`);
			setRGBpreview();
			updateTable();
		})
		.catch(function () {
			console.log('Error');
		});
}

function updateTable() {
	const tableName = document.getElementById('table-name');
	const tableRed = document.getElementById('table-red');
	const tableGreen = document.getElementById('table-green');
	const tableBlue = document.getElementById('table-blue');

	tableName.innerHTML = name;
	tableRed.innerHTML = r;
	tableGreen.innerHTML = g;
	tableBlue.innerHTML = b;
}


document.getElementById('test-button').addEventListener('click', updateJSON);
const data = { username: 'example' };

async function updateJSON() {
	fetch('/updateJSON', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}



