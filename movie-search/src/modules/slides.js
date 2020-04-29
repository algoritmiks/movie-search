import Swiper from 'swiper';

const slides = new Swiper('.swiper-container', {
  loop: true,
  updateOnWindowResize: true,
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default slides;