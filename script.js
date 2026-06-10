function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var allFullElem = document.querySelectorAll('.fullElem')
    var allFullElemBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElem[elem.id].style.display = "block"
        })
    })

    allFullElemBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullElem[back.id].style.display = "none"
        })
    })
}
openFeatures()


function todoList() {
    // localStorage.clear()
    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task List is empty.');
    }

    function renderTask() {

        let allTask = document.querySelector('.allTask')
        let sum = ''
        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
                <h5>${elem.task} <span class=${elem.imp}>imp</span> </h5>
                <button id=${idx}>Mark as Completed</button>
            </div>`

        })
        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckBox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        // console.log(taskInput.value, taskDetailsInput.value);
        // console.log(taskCheckBox.checked);

        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckBox.checked
            })
        renderTask()

        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckBox.checked = false
    })


}
todoList()


function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var saveData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${saveData}>
                </div>`

    })

    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))

        })
    })
}
dailyPlanner()


function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')
    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = data.quote
        motivationAuthor.innerHTML = "- " + data.author
    }

    fetchQuote()
}
motivationalQuote()


function pomodoroTimer() {

    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let timerInterval = null
    let totalSeconds = 25 * 60
    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
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
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}
pomodoroTimer()


function weatherFunctionality() {

    var city = 'Kendrapara'
    var apikey = "90a135fb154142c18b3110752260406";
    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var locationName = document.querySelector('.header1 h4')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')


    var data = null
    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
        var data = await response.json()
console.log(data);

        locationName.innerHTML = `<i class="ri-arrow-right-circle-fill"></i> ${data.location.name}`
        header2Temp.innerHTML = `${data.current.temp_c} °C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Feels Like: ${data.current.feelslike_c} °C`
    }

    weatherAPICall()

    function timeDate() {
        const totalDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const totalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var taarikh = date.getDate()
        var month = totalMonths[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${taarikh} ${month} ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }
    setInterval(() => {
        timeDate()
    }, 1000);

}
weatherFunctionality()


function changeTheme() {
    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#ffffff')
            rootElement.style.setProperty('--sec', '#111844')
            rootElement.style.setProperty('--tri1', '#7288AE')
            rootElement.style.setProperty('--tri2', '#4B5694')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#ffe5df')
            rootElement.style.setProperty('--sec', '#0C0C0C')
            rootElement.style.setProperty('--tri1', '#b8513a')
            rootElement.style.setProperty('--tri2', '#481E14')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#B0E4CC')
            rootElement.style.setProperty('--sec', '#091413')
            rootElement.style.setProperty('--tri1', '#408A71')
            rootElement.style.setProperty('--tri2', '#285A48')
            flag = 3
        } else if (flag == 3) {
            rootElement.style.setProperty('--pri', '#FEEC41')
            rootElement.style.setProperty('--sec', '#49001f')
            rootElement.style.setProperty('--tri1', '#ffa2a2')
            rootElement.style.setProperty('--tri2', '#c1102a')
            flag = 4
        } else if (flag == 4) {
            rootElement.style.setProperty('--pri', '#FCDEC0')
            rootElement.style.setProperty('--sec', '#2a1700')
            rootElement.style.setProperty('--tri1', '#ffab35')
            rootElement.style.setProperty('--tri2', '#64451f68')
            flag = 0
        }
    })
}
changeTheme()