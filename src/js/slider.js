import MoviesApiService from './api/api';
// import { URL_TRENDING_FILMS } from '../api/baseUrls';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const moviesApiService = new MoviesApiService();
const sliderContainerRef = document.querySelector('.swiper-wrapper');

const sliderFetch = moviesApiService.fetchTrendingMovies().then((results) => {
  renderSlider(results);
});

function renderSlider() {
  const markup = moviesApiService.sliderFilms
    .map(
      ({ id, poster_path, title }) =>
        `<div class="swiper-slider__wrapper swiper-slide">
              <img class="slide-img"
              src="https://image.tmdb.org/t/p/w200${poster_path}" 
              alt="${title}" "id=${id}" 
              width=""
              />

          </div>`
    )
    .join('');
    
    sliderContainerRef.innerHTML = markup;

  const swiper = new Swiper('.swiper', {
    disableOnInteraction: true,
    slidesPerView: 7,
    slidesPerGroup: 1,
    spaceBetween: 65,
    speed: 3500,
    // centralSlides: true,
    loop: true,

    grabCursor: true,
    effect: 'coverflow',
    coverflowEffect: {
      //modifier:5, //для mobile
      depth: 70,
      rotate: 8,
      stretch: 50,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 100,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    // freeMode: true,

    breakpoints: {
      768: {
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 60,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1200: {
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 65,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
      1500: {
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 58,
        disableOnInteraction: true,
        navigation: {
          enabled: true,
        },
      },
    },
  });
}
