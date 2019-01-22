import schedule from "../src";

const playground = document.getElementById('playground')
const elementInput = document.getElementById('elements')
const defaultButton = document.getElementById('default')
const buduButton = document.getElementById('budu')

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
  const elements = Array.from(document.querySelectorAll('#playground div'))
  elements.forEach(el => {
    const size = el.getBoundingClientRect().width

    el.style.setProperty('--size', `${size * 1.5}px`)
  })
}

function updateBudu () {
  const elements = Array.from(document.querySelectorAll('#playground div'))
  elements.forEach(el => {
    schedule({
      measure: () => el.getBoundingClientRect().width,
      update: size =>  el.style.setProperty('--size', `${size * 1.5}px`)
    })
  })
}

defaultButton.addEventListener('click', updateDefault)

buduButton.addEventListener('click', updateBudu)


