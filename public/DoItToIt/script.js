//test string
let testJSON = [{
    "id": "2020-08-01-0",
    "text": "Task 0",
    "date": "8/1/2020",
    "checked": false
  },
  {
    "id": "2020-08-20-1",
    "text": "Task 1",
    "date": "8/20/2020",
    "checked": true
  },
  {
    "id": "2020-08-25-2",
    "text": "Task 2",
    "date": "8/25/2020",
    "checked": false
  },
  {
    "id": "2020-09-25-3",
    "text": "Task 3",
    "date": "9/25/2020",
    "checked": false
  }
]

const taskArray = [];
const todayHeader = document.getElementById('today-header');
const focusedDayHeader = document.getElementById('focused-day-header');

let today = new Date();
let focusedDate = today;


/*
███████ ███████ ████████ ██    ██ ██████  
██      ██         ██    ██    ██ ██   ██ 
███████ █████      ██    ██    ██ ██████  
     ██ ██         ██    ██    ██ ██      
███████ ███████    ██     ██████  ██                            
*/
//Header Time Formating 
todayHeader.innerHTML = `Today is
<br>${today.toLocaleString('default', { month: 'long' })} ${today.getDate()}, ${today.getFullYear()}`;
focusedDayHeader.innerHTML = `${focusedDate.toLocaleString('default', { weekday: 'long' })},
<br>${focusedDate.toLocaleString('default', { month: 'long' })} ${focusedDate.getDate()}, ${focusedDate.getFullYear()}`;



function displayTasks() { //triggered on load of main section
  let fromLocal = JSON.parse(localStorage.getItem('taskArray')); //get local storage data
  $(".main").empty(); //clear main
  fromLocal.forEach((task, index) => { //refill main
    makeTasks(task, index);
  });
  syncCheckbox(); //make checkboxes match local storage
}


/*
███    ███  █████  ██   ██ ███████     ████████  █████  ███████ ██   ██ 
████  ████ ██   ██ ██  ██  ██             ██    ██   ██ ██      ██  ██  
██ ████ ██ ███████ █████   █████          ██    ███████ ███████ █████   
██  ██  ██ ██   ██ ██  ██  ██             ██    ██   ██      ██ ██  ██  
██      ██ ██   ██ ██   ██ ███████        ██    ██   ██ ███████ ██   ██  
*/
function makeTasks(task, index) {
  $('.main').append(
    `<div class="todo">
        <label for="${task.id}">
          <input class="input-checkbox" type="checkbox" id="${task.id}">
          <span class="custom-checkbox">
          <svg class="checkmark" id="${task.id}-checkmark" width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0758 8.30399C25.827 8.93722 26.6648 9.58963 27.3692 10.118C24.1914 11.5368 20.8117 14.6902 17.8464 18.0765C14.8155 21.5379 12.1556 25.3159 10.5042 27.9403C8.12938 25.4623 5.96601 23.7974 4.19667 22.7182C2.92469 21.9424 1.84331 21.4614 1.02558 21.2035C1.33723 20.8766 1.71493 20.4575 2.10891 20.0093C2.80609 19.2162 3.56376 18.3207 4.11531 17.6582C4.39204 17.7629 4.73935 17.9606 5.14572 18.2538C5.6803 18.6395 6.26604 19.152 6.8527 19.7192C8.02532 20.8528 9.16672 22.1703 9.85713 23.0352L10.3373 23.6367L10.6917 22.9535C15.7952 13.1166 20.4889 8.30802 23.2299 6.52032C23.3587 6.68805 23.5212 6.86874 23.7034 7.05502C24.0763 7.43616 24.5596 7.86886 25.0758 8.30399Z" stroke="#2EC97F"/>
</svg>
          </span>
        </label>

        <div>
        <p class="task" id="${task.id}-task">${task.text}</p>
        <button class="delete" id="${index}">X</button>
        </div>
        <p class="due-date">${task.date}</p>
      </div>`
  )
}



/*
 █████  ██████  ██████      ████████  █████  ███████ ██   ██ 
██   ██ ██   ██ ██   ██        ██    ██   ██ ██      ██  ██  
███████ ██   ██ ██   ██        ██    ███████ ███████ █████   
██   ██ ██   ██ ██   ██        ██    ██   ██      ██ ██  ██  
██   ██ ██████  ██████         ██    ██   ██ ███████ ██   ██ 
*/
function showInputOverlay() { //show the add new task inputs
  $('.input-overlay').css('display', 'block');
}

$('#new-task-form').submit(function (e) {
  e.preventDefault(); //prevent form refreshing page
  let text = $('#new-task-text').val(); //get value from text input
  let date = $('#new-task-date').val(); //get date from date input
  let index = taskArray.length; //assign an index to keep track of each task

  let task = { //make task object
    id: `${date}-${index}`,
    text: text,
    date: date,
    checked: false
  }

  if (task.date === '') { //If date isn't set assume they need it done ASAP
    task.date = 'ASAP'
  } else {
    const dateObj = new Date(task.date + 'T00:00:00'); //format date
    task.date = new Intl.DateTimeFormat('en-US').format(dateObj);
  }

  taskArray.push(task); //push(add) the new task to the array

  if (localStorage.getItem('taskArray')) { //if taskArray exsits in local storage 
    let taskJSON = JSON.parse(localStorage.getItem('taskArray')); //then get it and
    taskJSON.push(task); //push the new task 
    localStorage.setItem('taskArray', JSON.stringify(taskJSON)); //Local store update
    //console.log(taskJSON);
  } else { //if taskArray does NOT exsits in local storage
    localStorage.setItem('taskArray', JSON.stringify(taskArray)); //Local store new
  }

  displayTasks(); //update the showed taskes

  //reset the input overlay
  $('#new-task-text').val('');
  $('#new-task-date').val('');
  $('.input-overlay').hide();

  //console.log(task);
})


/*
███████  ██████  ██████  ████████     ████████  █████  ███████ ██   ██ ███████ 
██      ██    ██ ██   ██    ██           ██    ██   ██ ██      ██  ██  ██      
███████ ██    ██ ██████     ██           ██    ███████ ███████ █████   ███████ 
     ██ ██    ██ ██   ██    ██           ██    ██   ██      ██ ██  ██       ██ 
███████  ██████  ██   ██    ██           ██    ██   ██ ███████ ██   ██ ███████ 
*/
$('#sort-tasks-form').submit(function (e) {
  let taskJSON = JSON.parse(localStorage.getItem('taskArray'));
  e.preventDefault();

  //adjust the header to reflect target date
  focusedDate = new Date($('#sort-task-date').val().replace(/-/g, ',')); //replace hyphens with commas to get the zero hour of the day.
  focusedDayHeader.innerHTML = `${focusedDate.toLocaleString('default', { weekday: 'long' })},<br>${focusedDate.toLocaleString('default', { month: 'long' })} ${focusedDate.getDate()}, ${focusedDate.getFullYear()}`;

  //clear 
  $(".main").empty();

  // //filter by date
  taskJSON.forEach(task => {
    if (new Date(task.date) >= focusedDate) {
      makeTasks(task);
    } else {
      console.log(`task.id: ${task.id} has been filtered out.`);
    }
  });
})



/*
 ██████ ██   ██ ███████  ██████ ██   ██ ██████   ██████  ██   ██ ███████ ███████ 
██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██  ██ ██  ██      ██      
██      ███████ █████   ██      █████   ██████  ██    ██   ███   █████   ███████ 
██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██  ██ ██  ██           ██ 
 ██████ ██   ██ ███████  ██████ ██   ██ ██████   ██████  ██   ██ ███████ ███████  
*/
function syncCheckbox() {
  //get Local storage + local to JSON
  let taskJSON = JSON.parse(localStorage.getItem('taskArray'));

  

  //update checkboxes
  taskJSON.forEach(task => {
    if (task.checked == true) {                                       //if checked
      document.getElementById(task.id).checked = true;
      document.getElementById(`${task.id}-checkmark`).classList.add("checkmark-shown"); 
      document.getElementById(`${task.id}-task`).style.textDecoration = 'line-through';
    } else if (task.checked == false) {                               //if NOT checked
      document.getElementById(task.id).checked = false;
      document.getElementById(`${task.id}-checkmark`).classList.remove("checkmark-shown"); 
      document.getElementById(`${task.id}-task`).style.textDecoration = 'none';
    } else {
      console.log('checkmark error')
    }
  })

  //JSON to string + Store tasksJSON
  localStorage.setItem('taskArray', JSON.stringify(taskJSON));
}




/*
███████ ██    ██ ███████ ███    ██ ████████ ███████ 
██      ██    ██ ██      ████   ██    ██    ██      
█████   ██    ██ █████   ██ ██  ██    ██    ███████ 
██       ██  ██  ██      ██  ██ ██    ██         ██ 
███████   ████   ███████ ██   ████    ██    ███████ 
*/
//checkbox handler
$('.display-tasks').click(function (event) {
  let taskID = event.target.id;
  let taskJSON = JSON.parse(localStorage.getItem('taskArray'));

  if (event.target.type === 'checkbox') {
    taskJSON.forEach(task => {
      if (taskID === task.id) {
        task.checked = !task.checked;
      }
    })
    localStorage.setItem('taskArray', JSON.stringify(taskJSON));
    syncCheckbox();
  }


  //delete handler
  if (event.target.classList.contains('delete') === true) { //if delete is clicked
    taskJSON = JSON.parse(localStorage.getItem('taskArray')); //<---- this was the fix
    taskJSON.splice(event.target.id, 1) //delete task

    localStorage.setItem('taskArray', JSON.stringify(taskJSON)); //update local storage

    $(".main").empty(); //clear main
    displayTasks(); //update main
  }
})






/*
          TODO
-strike through task text
-more sort options?
-animated checkbox
-task completed counter
-calc how much time till do date
-writing this here was better than using the app.
-editable text? 
-mobile layout
-


<svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="checkmark"" d="M25.0758 8.30399C25.827 8.93722 26.6648 9.58963 27.3692 10.118C24.1914 11.5368 20.8117 14.6902 17.8464 18.0765C14.8155 21.5379 12.1556 25.3159 10.5042 27.9403C8.12938 25.4623 5.96601 23.7974 4.19667 22.7182C2.92469 21.9424 1.84331 21.4614 1.02558 21.2035C1.33723 20.8766 1.71493 20.4575 2.10891 20.0093C2.80609 19.2162 3.56376 18.3207 4.11531 17.6582C4.39204 17.7629 4.73935 17.9606 5.14572 18.2538C5.6803 18.6395 6.26604 19.152 6.8527 19.7192C8.02532 20.8528 9.16672 22.1703 9.85713 23.0352L10.3373 23.6367L10.6917 22.9535C15.7952 13.1166 20.4889 8.30802 23.2299 6.52032C23.3587 6.68805 23.5212 6.86874 23.7034 7.05502C24.0763 7.43616 24.5596 7.86886 25.0758 8.30399Z" stroke="#2EC97F"/>
</svg>
*/


//length of checkmark stroke: 77.05200958251953







//create a division system to split the task by day in the main
// ----------02-23-93-------------
// task task
// task
// ----------02-24-93-------------
// task task
// ----------02-25-93-------------
// task
// task task task task
// task task