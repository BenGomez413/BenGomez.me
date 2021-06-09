let r = 0; 
let g = 0;
let b = 0;

let rgbPreview = document.getElementById("rgbPreview");
let log = document.getElementById("log");

let command;

const ws = new WebSocket("ws:localhost:3000");

ws.addEventListener("open", () => {
	console.log("You have connected!");
});

ws.addEventListener("message", ({ data }) => {
	
	const regex = /rgb\(\d+,\d+,\d+\)/;      //check if rgb(225,255,255)
	rgbPreview.style.backgroundColor = regex.exec(data);

	let li = document.createElement("LI"); 
	li.className = "thisClient";

	let span = document.createElement("SPAN");
	let time = `${new Date().getHours()}:${new Date().getMinutes()}.${new Date().getSeconds()}`;
	span.className = "timestamp";
	span.append(time);

	let span2 = document.createElement("SPAN");	
	span2.append(data);

	let div = document.createElement("DIV");
	div.className = "logRGB";
	div.style.backgroundColor = regex.exec(data);

	li.append(span);
	li.append(span2); 
	li.append(div);

	log.append(li);
	log.scrollTop = log.scrollHeight;
});

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

		rgbPreview.style.backgroundColor = `rgb(${r},${g},${b})`;
	}
}



//SEND COMMAND 
document.getElementById('rgb-button').addEventListener('click', sendRGB);

function sendRGB(){
	command = `rgb(${r},${g},${b})`;
	ws.send(command);
	
	let li = document.createElement("LI"); 
	li.className = "thisClient";

	let div = document.createElement("DIV");
	div.className = "timestamp";
	div.append(getTimeStamp());
	li.append(div);
	
	let span = document.createElement("SPAN");	
	span.append(command);
	li.append(span);

	div = document.createElement("DIV");
	div.className = "logRGB";
	div.style.backgroundColor = command;
	li.append(div);

	log.append(li);
	log.scrollTop = log.scrollHeight;
}

function getTimeStamp(){
	let hours = new Date().getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
	let minutes = new Date().getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
	let seconds = new Date().getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

	let timestamp = `${hours}:${minutes}.${seconds}`;
	return timestamp;
}

