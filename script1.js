'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// nav coponent
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

///////////////////////////////////////
// EVENT LISTENERS
// Btn scrollTo
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log(s1coords);
  // console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //     'height/width viewport',
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  // )

  // old fashioned way of doing things
  // window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  // )

  // still old fashioned
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behaviour: 'smooth'
  //   });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
//   // This solution is not efficient because I'm adding the same funcition to a multitud of elements, this will impact performance. The best way to go about it will be to simply add the function to their parent element and let bubbling handle the matter
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log('Ori e pe');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// let yanDust = {
//   talk :`I dey feel lazy but I'm a man on a mission`,
//   action : function () {
//     console.log(this.talk + ` keep pushing`);
//   }
// }

// let yanDust2 = {
//   talk: `I dey feel lazy but I'm a man on a mission`,
//   action : function () {
//     console.log(this.talk + ` Don't give up`);
//   }
// }

// Menu fade animation
const handleHover = function (e) {
  // console.log(e, this, e.currentTarget)

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    // go up to its parent and make all children opacity smaller
    const parent = link.closest('.nav');
    const siblings = parent.querySelectorAll('.nav__link');
    const logo = parent.querySelector('img');
    siblings.forEach(sel => {
      // selects all siblings(excluding me)
      if (sel !== link) {
        sel.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// INTERSECTION OBSERVER
// Sticky navigation

// const initailCoords = section1.getBoundingClientRect()
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initailCoords.top)nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

// sticky navigation: Intersection observer API

// const obsCallback = function (entries) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root: null, // view port
//   threshold: [0.1, 0.2],
// };
// // const slider = document.querySelector('.slider')
// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // another guard clause
  // console.log(entry);
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allSection = document.querySelectorAll('.section');

allSection.forEach(sect => {
  // sect.classList.add('section--hidden');
  sectionObserver.observe(sect);
});

// Lazy loading
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider

const slider = function () {
  
  const slides = document.querySelectorAll('.slide');
  // const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.5) translateX(-1000px)';
// slider.style.overflow = 'visible';

// Functions
const createDots = function () {
  slides.forEach((undefined, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide='${i}'></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (curSlide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
};

// Next slide
const nextSlide = function () {
  // curSlide++;
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  // curSlide++;
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  createDots();
  activateDot(0);
  goToSlide(0);
  };
  
  init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  const dot = e.target;
  if (!dot.classList.contains('dots__dot')) return;
  const dataNum = dot.dataset.slide;
  // console.log(dot);
  goToSlide(dataNum);
  activateDot(dataNum);
});

}

slider();

// Life cycle DOM Events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
})

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
})

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })
///////////////////////////////////
//// LECTURE
// const goToSlide = function (slide) {
//   slides.forEach((s, i) => {
//     s.style.transform = `translateX(${100 * (i - slide)}%)`;
//   })
// }
// goToSlide(0);

// // next slide
// const nextSlide = function () {
//   // move to the next slide
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
//   goToSlide(curSlide)
// };

// const prevSlide = function () {
//   if (curSlide === 0) {
//     curSlide = maxSlide - 1
//   } else {
//   curSlide--;

//   }
//   goToSlide(curSlide)
// };

// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click',prevSlide)

/*
// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allsections = document.querySelectorAll('.section');
// console.log(allsections);

const allbuttons = document.getElementsByTagName('button');
// console.log(allbuttons);

// console.log(document.getElementById('section--1'));

// Creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics`;
message.innerHTML = `We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>`
header.append(message)
// header.prepend(message.cloneNode(true));

// header.before(message.cloneNode(true));
// header.after(message.cloneNode(true));
//.insertAdjacentHTML


// Delete elements
const popups = document.querySelectorAll('.cookie-message');
popups.forEach(pop => pop.addEventListener('click', function () {
    // pop.remove(); // use to remove elements
    pop.parentElement.removeChild(pop) // olden days way of doing things
}))


// Styles
// message.style.backgroundColor = '#37383D';
message.style.width = '120%'
console.log(message.style.alignSelf);
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).height);

message.style.height = parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

document.documentElement.style.setProperty('--color-primary', 'gold')
// header.insertAdjacentHTML('afterbegin',message.innerHTML)

document.querySelectorAll('h2').forEach(ele => {
  ele.style.fontSize = '8px'
})

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // returns absolute path
console.log(logo.id);
console.log(logo.className);
// non standard

console.log(logo.getAttribute('location'));
console.log(document.querySelector('.nav__logo').getAttribute('src')); // returns relative path
console.log(logo.setAttribute('company', 'Bankist'));

// Data Attributes  
console.log(logo.dataset.versionNumber);

// classes

console.log(logo.classList.contains('c')) //contains not includes like d one in array
logo.classList.add('c')
logo.classList.remove('c')
logo.classList.toggle('c')

// logo.className = "jonas"


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());
  console.log(s1coords);
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //     'height/width viewport',
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  // )

  // old fashioned way of doing things
  // window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  // )

  // still old fashioned 
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behaviour: 'smooth'
//   });
    
    // modern way
    section1.scrollIntoView({behavior:'smooth'})
});

const h1 = document.querySelector('h1');
const doThis = function (e) {
    alert('addEventlistener: Great! You are reading the heading :D');
    h1.removeEventListener('mouseenter', doThis)
}
h1.addEventListener('mouseenter', doThis)


setTimeout(() => h1.removeEventListener('mouseenter', doThis), 10000);

// h1.onclick  = function (e) {
//     alert('Onclick: Great! You are reading the heading :D');
// }

// h1.onmouseenter = function (e) {
//     alert('onMouseEnter: Great! You are reading the heading :D');
// }


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  e.stopPropagation()
})
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget)
}, true)
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('LINK', e.target, e.currentTarget)

})


const h1 = document.querySelector('h1');

// Going downwards: child

console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'cyan'
h1.lastElementChild.style.color = 'gold'
console.log(h1.lastElementChild);
console.log([...h1.childNodes]);

// Going Upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'))
h1.closest('.header').style.background = 'var(--color-tertiary-darker)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.color = 'white'
  }
})


const addVAT = value => {
  return rate => (value + value*rate);

}
const addVAT1 = addVAT(100)


console.log(addVAT1(0.2));
console.log(addVAT(200)(.2));

let dog = {
  sound: 'woof',
  talk: function() {
    console.log(this);
  }
}
let sound ='bark'
dog.talk();

let talkFunction = dog.talk;
talkFunction();
*/
