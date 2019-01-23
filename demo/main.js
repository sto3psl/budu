import schedule from "../src";

const reflow = document.querySelector('.reflow')

const playground = reflow.querySelector('.playground')
const elementInput = reflow.querySelector('#elements')
const defaultButton = reflow.querySelector('.default')
const buduButton = reflow.querySelector('.budu')

playground.innerHTML = ''
for (let index = 0; index <= elementInput.value; index++) {
  playground.appendChild(document.createElement('div'))
}

elementInput.addEventListener('blur', e => {
  playground.innerHTML = ''
  for (let index = 0; index <= e.target.value; index++) {
    playground.appendChild(document.createElement('div'))
  }
})

function updateDefault () {
  const elements = Array.from(reflow.querySelectorAll('.playground div'))
  elements.forEach(el => {
    const size = el.getBoundingClientRect().width

    el.style.setProperty('--size', `${size * 1.5}px`)
  })
}

function updateBudu () {
  const elements = Array.from(reflow.querySelectorAll('.playground div'))
  elements.forEach(el => {

    schedule({
      measure: () => el.getBoundingClientRect().width,
      update: size =>  el.style.setProperty('--size', `${size * 1.5}px`)
    })

  })
}

defaultButton.addEventListener('click', updateDefault)
buduButton.addEventListener('click', updateBudu)

/**
 * Animation example
 */

const animate = document.querySelector('.animate')
const animationPlayground = animate.querySelector('.playground')
const animDefaultButton = animate.querySelector('.default')
const animBuduButton = animate.querySelector('.budu')

 animationPlayground.innerHTML = ''
for (let index = 0; index <= 200; index++) {
  animationPlayground.appendChild(document.createElement('div'))
}

let mode = 'default'

const elements = Array.from(animationPlayground.querySelectorAll('.playground div'))
const offset = animationPlayground.offsetTop
elements.forEach((el, i) => {
  el.style.top = offset + i * 7 + 'px'
})

function animation () {
  elements.forEach((el, i) => {
    if (mode === 'default') {
      let x = el.style.left ? +getComputedStyle(el).left.slice(0, -2) : 0
      x = x < 500 ? x + Math.random() * 2 : 0

      el.style.left = x + 'px'
    } else {
      schedule({
        measure: () => {
          return el.style.left ? +getComputedStyle(el).left.slice(0, -2) : 0
        },
        update: (val) => {
          const x = val < 500 ? val + Math.random() * 2 : 0

          el.style.left = x + 'px'
        }
      })
    }
  })
  requestAnimationFrame(() => animation())
}

animDefaultButton.addEventListener('click', () => {
  mode = 'default'
})

animBuduButton.addEventListener('click', () => {
  mode = 'budu'
})

animation()


