import Swiper from 'swiper';

const slides = new Swiper('.swiper-container', {
  loop: false,
  updateOnWindowResize: true,
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 10
    },

    960: {
      slidesPerView: 3,
      spaceBetween: 10
    },

    1200: {
      slidesPerView: 4,
      spaceBetween: 10
    }



  }
});

export default slides;