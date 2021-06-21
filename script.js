const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board')
      
let time = 0,
    score = 0

const colorList = ['red', 'yellow', 'green', 'blue', 'orange', 'white']

// Обработчик кнопки "Начать игру"
startBtn.addEventListener('click', e => {
    e.preventDefault()
    screens[0].classList.add('up')
})

// Обработчики кнопок выбора времени
timeList.addEventListener('click', e => {
    target = e.target
    if (target && target.classList.contains('time-btn')) {
        time = +target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', e => {
    target = e.target
    if (target && target.classList.contains('circle')) {
        ++score
        target.remove()
        createRandomCircle()
    }
})

// Генератор рандомного числа:
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}


// Генератор целей:
const createRandomCircle = () => {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    board.append(circle)
    const { width, height } = board.getBoundingClientRect()
    const size = getRandomNumber(5, 17)
    const colorNumber = getRandomNumber(0, colorList.length)
    const x = getRandomNumber(0, width - size),
          y = getRandomNumber(0, height - size)
    circle.style.cssText = `top: ${y}px; left: ${x}px`
    circle.style.padding = `${size}px`
    circle.style.background = `${colorList[colorNumber]}`
    
}

// Завершение игры:
const finishGame = () => {
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}<span/></h1>`
    timeEl.parentNode.classList.add('hide')
}

// Установка времени
const setTime = (value = time) => {
    timeEl.innerHTML = `00:${value < 10 ? `0${value}` : `${value}`}`
}

// Изменение времени
const decreaseTime = () => {
    if (time > 0) {
        time = --time
    } else {
        clearInterval(setInterval(decreaseTime, 1000))
        finishGame()
    }
    setTime()
}

// Старт игры:
const startGame = () => {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime()
}