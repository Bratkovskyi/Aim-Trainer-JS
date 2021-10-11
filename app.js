const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['rgb(255,51,0)', 'rgb(153,0,51)', 'rgb(255,251,10)', 'rgb(204,51,51)', 'rgb(255,0,255)', 'rgb(102,51,102)', 'rgb(0,51,225)', 'rgb(51,255,255)', 'rgb(0,102,51)', 'rgb(51,255,51)']


let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[2].classList.remove('down')
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<div id="divCount"><h1>Cчёт: <span class="primary">${score}</span></h1> <p><a href="#" class="start" id="restart">Заново</a></p></div>`
    const restartBtn = document.querySelector('#restart')
    const divCount = document.querySelector('#divCount')
    restartBtn.addEventListener('click', (event) => {
        // event.preventDefault()
        // screens[1].classList.remove('up')
        // screens[2].classList.add('down')
        location.reload()
    })

    timeEl.parentNode.classList.add("hide")
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = `${color}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}