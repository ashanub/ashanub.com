/*
* Front end scripts
* */

document.addEventListener('DOMContentLoaded', event => {
  const siteNavBarMenu = document.getElementById('navbarSiteTop')
  const siteNavBar = document.getElementsByClassName('navbar')

  //adding is-mobile class to the navigation bar on resize
  toggleIsMobile(siteNavBarMenu)
  window.addEventListener('resize', () => {
    toggleIsMobile(siteNavBarMenu)
  })

//Handling the hamburger on click
  const hamburgerButton = document.getElementById('hamburger')
  const mobileNavBar = document.getElementsByClassName('navbar-menu is-mobile')
  hamburgerButton.addEventListener('click', event => {
    hamburgerButton.classList.toggle('is-active')
    mobileNavBar[0].classList.toggle('is-active')
  })

  //Changing navbar background color on scroll & arranging the social media icons
  document.addEventListener('scroll', event => {
    if (window.scrollY > 100) {
      siteNavBar[0].classList.add('is-scrolled')
      makeSocialVertical()
    } else {
      siteNavBar[0].classList.remove('is-scrolled')
      makeSocialHorizontal()
    }

    if (((window.innerHeight + window.scrollY)) >=
      document.body.offsetHeight - 300) {
      showFooterSocial()
    }
  })

  //Handling the tab click actions for the work section
  const tabs = document.querySelectorAll('.tabs li')
  const tabContent = document.querySelectorAll('#tab-content > .content-box')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.remove('is-active'))
      tab.classList.add('is-active')

      const contentTarget = tab.dataset.target
      tabContent.forEach(content => {
        if (content.getAttribute('id') === contentTarget) {
          content.classList.remove('is-hidden')
        } else {
          content.classList.add('is-hidden')
        }
      })
    })
  })
  resizeWorkCard()

  const workTabs = document.querySelectorAll(
    '#work > div > div > div.column.is-one-third.tabs-column > div > ul > li')
  workTabs.forEach((element) => {
    element.addEventListener('click', resizeWorkCard)
  })

  //Handling contact form
  const contactForm = document.getElementById('contact-form')
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    //form data
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    const notification = document.getElementById('form-notification')

    const data = {
      name: name,
      email: email,
      message: message,
    }

    fetch('/submit', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(res => {
      notification.classList.toggle('is-hidden')
      console.log(res)
    })

  })
})

//Add remove is-mobile class to elements
function toggleIsMobile (elementName) {
  let windowWidth = window.innerWidth
  if (windowWidth < 1024) {
    elementName.classList.add('is-mobile')
  } else {
    elementName.classList.remove('is-mobile')
  }

}

function resizeWorkCard () {
//Work details card height adjustment
  const workCards = document.querySelectorAll('.work-details-card')

  workCards.forEach((element) => {
    const fullHeight = element.offsetHeight
    const imageHeight = element.getElementsByTagName('img')[0].offsetHeight
    const cardContent = element.getElementsByClassName('card-content')[0]
    const contentSectionHeight = fullHeight - imageHeight
    cardContent.style.height = contentSectionHeight + 'px'

  })
}

function makeSocialVertical () {
  const socialIcons = document.getElementById('social-links-desktop')
  const socialContainer = socialIcons.getElementsByClassName('container')[0]
  if (socialContainer !== undefined) {
    // socialIcons.classList.remove('is-hidden')
    socialContainer.classList.remove('container')
    socialContainer.classList.remove('social-horizontal')
    socialContainer.classList.add('social-vertical')
  }
}

function makeSocialHorizontal () {
  const socialIcons = document.getElementById('social-links-desktop')
  const socialContainer = socialIcons.getElementsByClassName(
    'social-vertical')[0]
  if (socialContainer !== undefined) {
    socialContainer.classList.add('container')
    socialContainer.classList.remove('social-vertical')
    socialContainer.classList.add('social-horizontal')
  }
}

function showFooterSocial () {
  const socialIcons = document.getElementById('social-links-desktop')
  const footerSocial = document.getElementById('footer-social-links-wrap')
  socialIcons.classList.add('is-hidden')
  footerSocial.classList.remove('is-hidden-desktop')
  footerSocial.classList.add('is-shown')
}