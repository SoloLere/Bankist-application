'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// class

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.currentTarget.getBoundingClientRect());
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('.nav__link')) {
    console.log('you');
    const target = e.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// new feature

const newFeature = function(){
  console.log('Welcome to the application')
};

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // guard clause
  if (!clicked) return;

  // style selected tab
  tabs.forEach(e => e.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // console.log(clicked.dataset.tab);
  const dataValue = clicked.dataset.tab;
  newFeature();
  // show Tab content in the content section 
  // tabsContent.forEach(e => {
  //   e.classList.remove('operations__content--active')
  //   if (e.classList.contains(`operations__content--${dataValue}`)) {
  //     e.classList.add('operations__content--active')
  //   }
  // });

  tabsContent.forEach(e => e.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${dataValue}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('nav').querySelectorAll('.nav__link');
    {
      siblings.forEach(el => {
        if (el !== e.target) {
          el.style.opacity = 0.5;
          // console.lo g('ok');
        }
      });
    }
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('nav').querySelectorAll('.nav__link');
    {
      siblings.forEach(el => {
        if (el !== e.target) {
          el.style.opacity = 1;
        }
      });
    }
  }
});
