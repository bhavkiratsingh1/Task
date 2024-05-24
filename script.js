document.addEventListener('DOMContentLoaded', (event) => {
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  const recentsContainer = document.getElementById("recents-container");

  document.getElementById("add-task-btn").addEventListener("click", addTask);

  function addTask() {
      if (inputBox.value === '') {
          alert("You must write something!");
      } else {
          let li = document.createElement("li");
          li.innerHTML = inputBox.value;
          const button = document.createElement("button");
          button.setAttribute("class", "buttons delete-button");
          button.innerHTML = "delete";
          button.addEventListener("click", deleteTask);
          const editButton = document.createElement("button");
          editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
          editButton.addEventListener("click", editTask);
          editButton.setAttribute("class", "buttons edit-button");
          var buttonsContainer = document.createElement('div');
          buttonsContainer.setAttribute("class", "buttons");
          buttonsContainer.appendChild(button);
          buttonsContainer.appendChild(editButton);
          li.appendChild(buttonsContainer);
          listContainer.appendChild(li);
          savedata();
      }
      inputBox.value = "";
  }

  listContainer.addEventListener("click", function(e){ 
      if(e.target.tagName === "LI") { 
          e.target.classList.toggle("checked");
          if (e.target.classList.contains("checked")) {
              transferToRecents(e.target);
          }
          savedata();
      } else if(e.target.classList.contains("delete-button")) { 
          e.target.parentElement.parentElement.remove();
          savedata();
      }  
  }, false);

  recentsContainer.addEventListener("click", function(e){ 
      if(e.target.tagName === "LI") { 
          e.target.classList.toggle("checked");
          savedata();
      } else if(e.target.classList.contains("delete-button")) { 
          e.target.parentElement.parentElement.remove();
          saveRecents();
      }  
  }, false);

  function transferToRecents(task) {
      const newTask = task.cloneNode(true);
      newTask.classList.remove("checked");
      recentsContainer.appendChild(newTask);
      task.remove();
      saveRecents();
  }

  function editTask() {
      var li = this.parentNode.parentNode;
      var taskText = li.firstChild;
      var editText = prompt('Edit the task:', taskText.textContent);
      if (editText !== null && editText.trim() !== '') {
          taskText.textContent = editText.trim();
          recreateButtons(li);
          savedata();
      }
  }

  function recreateButtons(li) {
      var buttonsContainer = li.querySelector('.buttons');
      buttonsContainer.remove();
      const button = document.createElement("button");
      button.setAttribute("class", "buttons delete-button");
      button.innerHTML = "delete";
      button.addEventListener("click", deleteTask);
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
      editButton.addEventListener("click", editTask);
      editButton.setAttribute("class", "buttons edit-button");
      buttonsContainer = document.createElement('div');
      buttonsContainer.setAttribute("class", "buttons");
      buttonsContainer.appendChild(button);
      buttonsContainer.appendChild(editButton);
      li.appendChild(buttonsContainer);
  }

  function deleteTask() {
      this.parentElement.parentElement.remove();
      savedata();
  }

  function savedata() {
      localStorage.setItem("tasks", listContainer.innerHTML);
      saveRecents();
  }

  function saveRecents() {
      localStorage.setItem("recents", recentsContainer.innerHTML);
  }

  function showtask() {
      listContainer.innerHTML = localStorage.getItem("tasks") || "";
      recentsContainer.innerHTML = localStorage.getItem("recents") || "";
  }

  showtask();
});

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
  const li = item.parentElement;

  item.addEventListener('click', function () {
    allSideMenu.forEach(i => {
      i.parentElement.classList.remove('active');
    })
    li.classList.add('active');
  })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');
})

// DARK MODE TOGGLE
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
  if(this.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});
// Function to update the clock time
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  
  // Format the time with leading zeros if necessary
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  // Display the time in the 'clock' element
  document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

// Call the updateClock function every second to update the time
setInterval(updateClock, 1000);

// Initial call to display the time immediately
updateClock();
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new calendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth', // Set initial view to month
      // Add more options as needed
  });

  calendar.render(); // Render the calendar

  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  const recentsContainer = document.getElementById("recents-container");

  document.getElementById("add-task-btn").addEventListener("click", addTask);});
  document.addEventListener('DOMContentLoaded', function() {
    // Select the search form
    const searchForm = document.querySelector('form[action="#"]');

    // Add an event listener for form submission
    searchForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the input value from the search box
        const searchInput = this.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Perform search logic (You can customize this logic based on your requirements)
        const taskListItems = document.querySelectorAll('#list-container li');
        taskListItems.forEach(function(item) {
            const taskText = item.textContent.trim().toLowerCase();
            if (taskText.includes(searchTerm)) {
                item.style.display = 'block'; // Show the task item if it matches the search term
            } else {
                item.style.display = 'none'; // Hide the task item if it doesn't match the search term
            }
        });
    });
});
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);


  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function() {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);