function openfeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullelem')
    var fullElemPagebackbtn = document.querySelectorAll('.fullelem .back')



    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            // console.log(elem.id);

            fullElemPage[elem.id].style.display = 'block'

        })
    })
    fullElemPagebackbtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'

        })

    })
}
openfeatures();


function todoList() {
    var currenttask = []

    if (localStorage.getItem('currenttask')) {
        currenttask = JSON.parse(localStorage.getItem('currenttask'))
    }
    else {
        console.log('Task list is empty');

    }



    function rendertask() {

        let alltask = document.querySelector('.alltask')
        let sum = ''
        currenttask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                        <button id =${idx}>Mark as completed</button>
                    </div>`
        })
        alltask.innerHTML = sum;

        localStorage.setItem('currenttask', JSON.stringify(currenttask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currenttask.splice(btn.id, 1)
                rendertask();
            })
        })

    }

    rendertask();


    let form = document.querySelector('.addtask form')
    let taskinput = document.querySelector('.addtask form #task-input')
    let taskDetailsinput = document.querySelector('.addtask form textarea')
    let taskCheckbox = document.querySelector('.addtask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()


        currenttask.push(
            {

                task: taskinput.value,
                details: taskDetailsinput.value,
                imp: taskCheckbox.checked
            }
        )
        rendertask();

        taskCheckbox.checked = false;
        taskinput.value = ''
        taskDetailsinput.value = ''

    })

}
todoList();

function dailyplanner() {

    var dayplandata = JSON.parse(localStorage.getItem('dayplandata')) || {}

    var dayplanner = document.querySelector('.day-planner')


    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)




    var wholedaysum = ''
    hours.forEach(function (elem, idx) {
        var saveddata = dayplandata[idx] || ''
        wholedaysum = wholedaysum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type ="text" placeholder="..." value=${saveddata}>
                </div>`
    })

    dayplanner.innerHTML = wholedaysum;

    var dayplannerinput = document.querySelectorAll('.day-planner input')


    dayplannerinput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayplandata[elem.id] = elem.value

            localStorage.setItem('dayplandata', JSON.stringify(dayplandata))

        })
    })

}
dailyplanner();

function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')


    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes/random')
        let data = await response.json();

        motivationQuoteContent.innerHTML = data.quote
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote();
}
motivationalQuote();


function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    let startBtn = document.querySelector('.pomo-timer .start-timer')
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    let resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkedSession = true

    let totalSeconds = 25 * 60;
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkedSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }
                else {
                    isWorkedSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60

                }
            }, 1000)
        } else {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                }
                else {
                    isWorkedSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60

                }

            }, 1000)
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {

        clearInterval(timerInterval)
        totalSeconds = 25 * 60;
        updateTimer()


    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)

}
pomodoroTimer()

function weatherFunctionality() {

    var city = 'Chandigarh'
    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector(' .header2  h2')
    var header2Condition = document.querySelector(' .header2  h4')
    var precipitaion = document.querySelector(' .header2  .precipitaion')
    var humidity = document.querySelector(' .header2  .humidity')
    var wind = document.querySelector(' .header2  .wind')



    var data = null;

    const apiKey = '617931bebc5840a4938171048262010';
    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = ` Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitaion.innerHTML = `Heat Index: ${data.current.heatindex_c}%`

    }

    weatherAPICall()

    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarikh = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarikh} ${month}, ${year}`


        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
        }
        else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`

        }
    }
    setInterval(() => {
        timeDate()
    }, 1000);
}
weatherFunctionality()

function changeTheme(){
    var theme = document.querySelector('.theme')
var rootElement = document.documentElement

var flag = 0;
theme.addEventListener('click', function () {
    
    if (flag == 0) {
        rootElement.style.setProperty('--pri', '#D99B7F')
        rootElement.style.setProperty('--sec', '#0F3040')
        rootElement.style.setProperty('--tri1', '#A56F63')
        rootElement.style.setProperty('--tri2', '#464858')
        flag = 1
    } else if (flag == 1) {
        rootElement.style.setProperty('--pri', '#5E244E')
        rootElement.style.setProperty('--sec', '#FFE8B4')
        rootElement.style.setProperty('--tri1', '#AA1C41')
        rootElement.style.setProperty('--tri2', '#E68457')
        flag = 2
    } else if (flag == 2) {
        rootElement.style.setProperty('--pri', '#FCDEC0')
        rootElement.style.setProperty('--sec', '#381c0a')
        rootElement.style.setProperty('--tri1', '#E5B299')
        rootElement.style.setProperty('--tri2', '#B4846C')
        flag == 0
    }



})

}
changeTheme();

// Pehle elements ko select kar lete hain
const input = document.getElementById('goalInput');
const list = document.getElementById('goalList');

// Naya goal add karne ka function
function addGoal() {
  const text = input.value;

  // Agar khali input hai toh aage mat badho
  if (text === '') {
    alert('Bhai pehle kuch likho toh!');
    return;
  }

  // Naya <li> tag banana
  const li = document.createElement('li');

  // Text aur Delete button daalna
  li.innerHTML = `
    <span onclick="markDone(this)">${text}</span>
    <button class="del-btn" onclick="deleteGoal(this)">Delete</button>
  `;

  // List mein jodna
  list.appendChild(li);

  // Input clear kar do
  input.value = '';
}

// Complete / Line-through karne ke liye
function markDone(element) {
  element.classList.toggle('done');
}

// Goal hatane ke liye
function deleteGoal(button) {
  button.parentElement.remove();
}
