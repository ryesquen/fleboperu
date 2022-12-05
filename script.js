const sliderContainer = document.getElementById('slider-container')
const slider = document.getElementById('slider')
const buttonLeft = document.getElementById('button-left')
const buttonRight = document.getElementById('button-right')
const inicio = document.getElementById('_inicio')
const enlaces = document.getElementsByClassName('nav__link')

const sliderElements = document.querySelectorAll('.slider__element')

const nosotros_image1 = document.querySelector('.nosotros_image1')
const nosotros_texto1 = document.querySelector('.nosotros_texto1')
const nosotros_image2 = document.querySelector('.nosotros_image2')
const nosotros_texto2 = document.querySelector('.nosotros_texto2')

const catorceanios = document.querySelector('.section__adicional__parrafo')
const catorceaniosreserva = document.querySelector(
  '.section__adicional__reserva'
)

const videos = document.querySelectorAll('.play_hover')

videos.forEach((video) => {
  video.addEventListener('mouseover', (event) => {
    if (event.target.classList[0] === 'play_hover') {
      video.play()
    }
  })

  video.addEventListener('mouseout', (event) => {
    if (event.target.classList[0] === 'play_hover') {
      video.pause()
    }
  })
})

// const _inicio = document.getElementById('inicio')
// const _nosotros = document.querySelector('.section__adicional')
// const _servicios = document.getElementById('servicios')
// const _productos = document.getElementById('productos')
// const _informate = document.getElementById('informate')
// const _contacto = document.getElementById('contacto')

const options = {
  // rootMargin: '0px 0px 0px 0px',
  threshold: 0,
}

const rootStyles = document.documentElement.style

let slideCounter = 0
let isInTransition = false

const DIRECTION = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}

const getTransformValue = () =>
  Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ''))

const reorderSlide = () => {
  const transformValue = getTransformValue()
  rootStyles.setProperty('--transition', 'none')
  if (slideCounter === sliderElements.length - 1) {
    slider.appendChild(slider.firstElementChild)
    rootStyles.setProperty(
      '--slide-transform',
      `${transformValue + sliderElements[slideCounter].scrollWidth}px`
    )
    slideCounter--
  } else if (slideCounter === 0) {
    slider.prepend(slider.lastElementChild)
    rootStyles.setProperty(
      '--slide-transform',
      `${transformValue - sliderElements[slideCounter].scrollWidth}px`
    )
    slideCounter++
  }

  isInTransition = false
}

const moveSlide = (direction) => {
  if (isInTransition) return
  const transformValue = getTransformValue()
  rootStyles.setProperty('--transition', 'transform 1s')
  isInTransition = true
  if (direction === DIRECTION.LEFT) {
    rootStyles.setProperty(
      '--slide-transform',
      `${transformValue + sliderElements[slideCounter].scrollWidth}px`
    )
    slideCounter--
  } else if (direction === DIRECTION.RIGHT) {
    rootStyles.setProperty(
      '--slide-transform',
      `${transformValue - sliderElements[slideCounter].scrollWidth}px`
    )
    slideCounter++
  }
}

buttonRight.addEventListener('click', () => moveSlide(DIRECTION.RIGHT))
buttonLeft.addEventListener('click', () => moveSlide(DIRECTION.LEFT))

slider.addEventListener('transitionend', reorderSlide)

reorderSlide()

setInterval(() => {
  buttonRight.click()
}, 5000)

let links = [...enlaces]

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((link) => {
      link.classList.remove('nav-active')
    })
    link.classList.add('nav-active')
  })
})

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('return_position')
    } else {
      entry.target.classList.remove('return_position')
    }
  })
}, options)

observer.observe(nosotros_image1)
observer.observe(nosotros_texto1)
observer.observe(nosotros_image2)
observer.observe(nosotros_texto2)
observer.observe(catorceanios)
observer.observe(catorceaniosreserva)

// const observerMenu = new IntersectionObserver((entries, observer) => {
//   if (entries[0].isIntersecting) {
//     console.log()
//     if (entries[0].target.className !== 'section__adicional')
//       document
//         .getElementById(`_${entries[0].target.id}`)
//         .classList.add('nav-active')
//     else document.getElementById('_nosotros').classList.add('nav-active')
//   } else {
//     if (entries[0].target.className !== 'section__adicional')
//       document
//         .getElementById(`_${entries[0].target.id}`)
//         .classList.remove('nav-active')
//     else document.getElementById('_nosotros').classList.remove('nav-active')
//   }
// }, options)

// observerMenu.observe(_inicio)
// observerMenu.observe(_nosotros)
// observerMenu.observe(_servicios)
// observerMenu.observe(_productos)
// observerMenu.observe(_informate)
// observerMenu.observe(_contacto)
