let r = 0;
let g = 0;
let b = 0;

let slidersOutputs = [
	[document.getElementById("redRange"), document.getElementById("redValue")], [document.getElementById("greenRange"), document.getElementById("greenValue")], [document.getElementById("blueRange"), document.getElementById("blueValue")]
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

		document.getElementById("rgbPreview").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	}
}




