'use strict'
function showMenu() {
  document.body.classList.toggle('lock');
  menu.classList.toggle('active');
}
const menu = document.querySelector('.main-header nav');

const menuButton = document.querySelector('.burger-button');
menuButton.addEventListener('click', showMenu);

const menuLinks = document.querySelectorAll('.main-header .menu a');
menuLinks.forEach((link) => link.addEventListener('click', onMenuClick));

function onMenuClick() {
  if (menu.classList.contains('active')) {
    document.body.classList.remove('lock');
    menu.classList.remove('active');
  }
}

const tabButtons = document.querySelectorAll('#products .tab-title');
const tabs = document.querySelectorAll('#products .tab-items');
let activeTabButton = document.querySelector('#products .tab-title.active');
let activeTab = document.querySelector('#products .tab-items.active');
tabButtons.forEach((button) => button.addEventListener('click', onTabChange));
function onTabChange(event) {
  if (activeTabButton === event.target) return;
  activeTabButton.classList.remove('active');
  activeTabButton = event.target;
  activeTabButton.classList.add('active');
  activeTab.classList.remove('active');
  for (const value of activeTabButton.classList) {
    for (const tab of tabs) {
      if (tab.classList.contains(value)) {
        tab.classList.add('active');
        activeTab = tab;
        return;
      }
    }
  }
}

// carousel
function carousel (carouselTarget, carouselItems, dots) {
  let slideToShow = 0;
  return function (event) {
    const slideWidth = carouselItems[0].clientWidth;
    const carouselWidth = carouselTarget.clientWidth;
    const slidesOnScreen = Math.round(carouselWidth / slideWidth);
    const lastIndexToShow = carouselItems.length - slidesOnScreen;
    
    if (event === 'resize') {
      if (slideToShow === 0) return;
      if (slideToShow > lastIndexToShow) {
        slideToShow = lastIndexToShow;
      }
      carouselTarget.style.transform = `translateX(-${slideToShow * slideWidth}px)`;
      if (dots) {
        dots.forEach((elem) => elem.classList.remove('active-slider-dot'));
        dots[slideToShow].classList.add('active-slider-dot');
      }
      return;
    }

    if (event === 'next' && slideToShow < lastIndexToShow) {
      slideToShow++;
    } else if (event === 'prev' && slideToShow > 0) {
      slideToShow--;
    }
    carouselTarget.style.transform = `translateX(-${slideToShow * slideWidth}px)`;
    if (dots) {
      dots.forEach((elem) => elem.classList.remove('active-slider-dot'));
      dots[slideToShow].classList.add('active-slider-dot');
    }
  }
}
// brandsCarousel
const brands = document.querySelector('.brands');
const brandsItems = document.querySelectorAll('.brands .brand-img');
const brandsCarousel = carousel(brands, brandsItems);
document.querySelector('.brands-wrapper .prev-btn').addEventListener('click', () => brandsCarousel('prev'));
document.querySelector('.brands-wrapper .next-btn').addEventListener('click', () => {
  brandsCarousel('next');
});
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    brandsCarousel('resize');
  }, 100);
});
// brandsCarousel end

// testimonialsCarousel
const testimonials = document.querySelector('.reviews');
const testimonialsItems = document.querySelectorAll('.reviews .review-wrapper');
const testimonialsDots = document.querySelectorAll('#testimonials .slider-dot')
console.log(testimonialsDots)
const testimonialsCarousel = carousel(testimonials, testimonialsItems, testimonialsDots);
document.querySelector('.reviews-wrapper .prev-btn').addEventListener('click', () => {
  testimonialsCarousel('prev');
});
document.querySelector('.reviews-wrapper .next-btn').addEventListener('click', () => {
  testimonialsCarousel('next');
});
let resizeTimerTestimonials;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimerTestimonials);
  resizeTimer = setTimeout(() => {
    testimonialsCarousel('resize');
  }, 100);
});
// testimonialsCarousel end

const detailsTitles = document.querySelectorAll('.about-us .detail h3');

detailsTitles.forEach((item) => item.addEventListener('click', showDetail));

function showDetail() {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
    hidePanelOfElement(this);
    return;
  }

  for (const title of detailsTitles) {
    if (title.classList.contains('active')) {
      title.classList.remove('active');
      hidePanelOfElement(title);
    }
  }

  this.classList.add('active');
  showPanelOfElement(this);

  function hidePanelOfElement(element) {
    const panel = element.nextElementSibling;
    panel.style.marginTop = null;
    panel.style.maxHeight = null;
  }
  function showPanelOfElement(element) {
    const panel = element.nextElementSibling;
    panel.style.marginTop = '25' + 'px';
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}


