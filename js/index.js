'use strict';
(function() {
  const menu = document.querySelector('.main-header nav');
  function showMenu() {
    document.body.classList.toggle('body-lock');
    menu.classList.toggle('burger-active');
  }
  function hideMenu() {
    if (menu.classList.contains('burger-active')) {
      document.body.classList.remove('body-lock');
      menu.classList.remove('burger-active');
    }
  }
  const menuButton = document.querySelector('.burger-button');
  menuButton.addEventListener('click', showMenu);
  menuButton.addEventListener('keypress', (event) => {
          if(event.key === ' ' || event.key === 'Enter') {
              event.preventDefault();
              showMenu();
          }
      });

  const menuLinks = document.querySelectorAll('.main-header .menu-link');
  menuLinks.forEach((link) => link.addEventListener('click', hideMenu));
  window.addEventListener('resize', () => {if (window.innerWidth > 991) hideMenu();});

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
  function carousel (carouselTarget, slides, dots) {
    let currentSlide = 0;
    return function (step, slideToShow) {
      if (currentSlide === 0 && step < 0) return;
      if (currentSlide === slideToShow) return;

      const slideWidth = slides[0].clientWidth;
      const carouselWidth = carouselTarget.clientWidth;
      const slidesOnScreen = Math.round(carouselWidth / slideWidth);
      const maxIndex = slides.length - slidesOnScreen;
      currentSlide = slideToShow ?? currentSlide + step;

      if (currentSlide > maxIndex) currentSlide = maxIndex;
      
      carouselTarget.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      if (dots && !dots[currentSlide].classList.contains('active-slider-dot')) {
        dots.forEach((elem) => elem.classList.remove('active-slider-dot'));
        dots[currentSlide].classList.add('active-slider-dot');
      }
    }
  }
  // brandsCarousel
  const brands = document.querySelector('.brands');
  const brandsItems = document.querySelectorAll('.brands .brand-img');
  const brandsCarousel = carousel(brands, brandsItems);
  document.querySelector('.brands-wrapper .prev-btn').addEventListener('click', () => brandsCarousel(-1));
  document.querySelector('.brands-wrapper .next-btn').addEventListener('click', () => {
    brandsCarousel(1);
  });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      brandsCarousel(0);
    }, 100);
  });
  // brandsCarousel end

  // testimonialsCarousel
  const testimonials = document.querySelector('.reviews');
  const testimonialsItems = document.querySelectorAll('.reviews .review-wrapper');
  const testimonialsDots = document.querySelectorAll('#testimonials .slider-dot')
  const testimonialsCarousel = carousel(testimonials, testimonialsItems, testimonialsDots);

  testimonialsDots.forEach((element, index) => {
    element.addEventListener('click', () => {
      testimonialsCarousel(null, index);
    })
  })

  document.querySelector('.reviews-wrapper .prev-btn').addEventListener('click', () => {
    testimonialsCarousel(-1);
  });
  document.querySelector('.reviews-wrapper .next-btn').addEventListener('click', () => {
    testimonialsCarousel(1);
  });
  let resizeTimerTestimonials;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimerTestimonials);
    resizeTimer = setTimeout(() => {
      testimonialsCarousel(0);
    }, 100);
  });
  // testimonialsCarousel end

  const detailsTitles = document.querySelectorAll('.about-us .detail h3');
  detailsTitles.forEach((item) => item.addEventListener('click', showDetail));
  function showDetail() {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      hideContent(this);
      return;
    }
    for (const title of detailsTitles) {
      if (title.classList.contains('active')) {
        title.classList.remove('active');
        hideContent(title);
      }
    }
    this.classList.add('active');
    showContent(this);
    function hideContent(element) {
      const content = element.nextElementSibling;
      content.style.marginTop = null;
      content.style.maxHeight = null;
    }
    function showContent(element) {
      const content = element.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.marginTop = '25' + 'px';
    }
  }

  const videoControls = document.getElementById('video-controls');
  videoControls.setAttribute('data-state', 'visible');

  function changeButtonState(type) {
    // Play/Pause button
    if (type == 'playpause') {
       if (video.paused || video.ended) {
          playpause.setAttribute('data-state', 'play');
       }
       else {
          playpause.setAttribute('data-state', 'pause');
       }
    }
  }
  const video = document.querySelector('.video video')
  video.addEventListener('play', function() {
    changeButtonState('playpause');
  }, false);
  video.addEventListener('pause', function() {
    changeButtonState('playpause');
  }, false);
  video.addEventListener('ended', function() {
    video.currentTime = 0;
    changeButtonState('playpause');
  }, false);

  const playpause = document.getElementById('playpause');
  playpause.addEventListener('click', function(e) {
    if (video.paused || video.ended) video.play();
    else video.pause();
  });

}());
