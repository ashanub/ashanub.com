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

  //Changing navbar background color on scroll
  document.addEventListener('scroll', event => {
    if (window.scrollY > 100) {
      siteNavBar[0].classList.add('is-scrolled')
    } else {
      siteNavBar[0].classList.remove('is-scrolled')
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

  const workTabs = document.querySelectorAll('#work > div > div > div.column.is-one-third.tabs-column > div > ul > li')
  workTabs.forEach((element) => {
    element.addEventListener('click', resizeWorkCard)
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