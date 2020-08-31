//==================Check Age==================//
function checkAge() {
  let input = document.getElementById('birthday').value;
  let birthday = new Date(input);

  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch

  age = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (age < 18) {
    warning = document.getElementById('personalInfoWarning');
    warning.style.display = "block";
    warning.innerHTML = "You must be 18 years or older to sign. If you are under the age of 18 please ask an adult to sign on your behalf";
  }

  if (age >= 18) {
    warning = document.getElementById('personalInfoWarning');
    warning.style.display = "none";
    warning.innerHTML = "";
  }
}


//==================Add Minor==================//
let minorAdded = false;
let index = 0;

function addMinor() {
  const container = document.getElementById('minor');
  const newMinor = document.createElement('div');

  if (minorAdded === false) {
    container.appendChild(newMinor);
    let firstHeading = document.createElement('h2');
    firstHeading.innerHTML = "First Name";
    newMinor.appendChild(firstHeading);

    let lastHeading = document.createElement('h2');
    lastHeading.innerHTML = "Last Name";
    newMinor.appendChild(lastHeading);
    minorAdded = true;
  }

  container.appendChild(newMinor);

  let firstInput = document.createElement('input');
  firstInput.setAttribute('name', 'minors[val][]');
  firstInput.setAttribute('class', 'minorFirstName');
  newMinor.appendChild(firstInput);

  let lastInput = document.createElement('input');
  lastInput.setAttribute('name', 'minors[val][]');
  lastInput.setAttribute('class', 'minorLastName');
  newMinor.appendChild(lastInput);
  index++

}


//==================Room Select==================//

let Roaring20sTimes = ["10:45am", "12:00pm", "1:15pm", "2:30pm", "3:45pm", "5:00pm", "6:15pm", "7:30pm", "8:45pm", "10:00pm", "11:15pm"];
let StarlightTimes = ["11:00am", "12:15pm", "1:30pm", "2:45pm", "4:00pm", "5:15pm", "6:30pm", "7:45pm", "9:00pm", "10:15pm", "11:30pm"];
let DragonTimes = ["11:15am", "12:30pm", "1:45pm", "3:00pm", "4:15pm", "5:30pm", "6:45pm", "8:00pm", "9:15pm", "10:30pm", "11:45pm"];

roomSelected('Roaring20s');

function roomSelected(room) {
  let times = [];
  let container = document.getElementById('timeContainer');

  if (room === 'Roaring20s' || room === 'CorpX') {
    times = Roaring20sTimes;
  }
  if (room === 'Starlight' || room === 'Office') {
    times = StarlightTimes;
  }
  if (room === 'Dragon') {
    times = DragonTimes;
  }


  while (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
  }

  for (let i = 0; i < times.length; i++) {
    let newInput = document.createElement('input');
    newInput.setAttribute("type", "radio");
    newInput.setAttribute("id", times[i]);
    newInput.setAttribute("name", "time");
    newInput.setAttribute("value", times[i]);
    newInput.setAttribute("required", "true");

    container.appendChild(newInput);

    let newLabel = document.createElement('label');
    newLabel.setAttribute("for", times[i]);
    newLabel.setAttribute("id", times[i] + 'label');
    container.appendChild(newLabel);
    document.getElementById(times[i] + 'label').innerHTML = times[i];

    let br = document.createElement('br');
    container.appendChild(br);
  }
}

//==================Signature==================//
window.addEventListener("load", () => {
  const canvas = document.querySelector("#myCanvas");
  const ctx = canvas.getContext("2d");

  //Variables
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = 200;

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    e.preventDefault();

    if (!painting) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    var rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top + 20;

    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  //Event Listeners
  canvas.addEventListener("touchstart", startPosition, false);
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("touchend", finishedPosition, false);

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
});

function resetSignature() {
  const canvas = document.querySelector("#myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
  html2canvas(document.getElementById("body")).then(function (canvas) {
    let dataURL = canvas.toDataURL("image/jpeg", 0.8);

    let signatureInput = document.getElementById('signatureInput');
    signatureInput.value = dataURL;
    //console.log(dataURL);
  });
}


