const tabsContent = document.querySelectorAll('.main__gaming-content--main');
const tabsButtons = document.querySelectorAll(
  '.main__gaming-content--header__button'
);
const tabsContainer = document.querySelector('.main__gaming-content--header');

tabsContainer.addEventListener('click', (e) => {
  e.preventDefault();
  const clicked = e.target.closest('.main__gaming-content--header__button');
  if (!clicked) return;
  console.log(clicked.dataset.tab);
  tabsButtons.forEach((btn) => {
    btn.classList.remove('main__gaming-content--header__button-active');
  });
  clicked.classList.add('main__gaming-content--header__button-active');

  tabsContent.forEach((content) =>
    content.classList.remove('main__gaming-content--main__active')
  );
  document
    .querySelector(`.main__gaming-content--main__${clicked.dataset.tab}`)
    .classList.add('main__gaming-content--main__active');
});

//slider-image

const slider = function () {
  const slides = document.querySelectorAll('.main__slider-slider-slide');
  const btnLeft = document.querySelector('.main__slider-slider--btn__left');
  const btnRight = document.querySelector('.main__slider-slider--btn__right');
  const dotContainer = document.querySelector('.main__slider-slider--dots');
  let currentSlide = 0;

  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "main__slider-slider--dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.main__slider-slider--dots__dot')
      .forEach((dot) =>
        dot.classList.remove('main__slider-slider--dots__dot--active')
      );

    document
      .querySelector(`.main__slider-slider--dots__dot[data-slide="${slide}"]`)
      .classList.add(`main__slider-slider--dots__dot--active`);
  };

  const goToSlide = (slide) => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('main__slider-slider--dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

//---------------modal window -----------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((modal) => {
  modal.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const navSticky = document.querySelector('.header__center');
const header = document.querySelector('.header');
const navHeight = navSticky.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) navSticky.classList.add('sticky');
  else navSticky.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const btnTop = document.querySelector('.btn-top');
window.onscroll = () => {
  if (document.documentElement.scrollTop > 500) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
};
function toTop() {
  document.documentElement.scrollTop = 0;
}

btnTop.addEventListener('click', toTop);
