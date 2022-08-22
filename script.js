'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('header');
const allSelection = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const button = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Funzione scroll header iniziale learn more

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////
//Navigazione Pagina

document.querySelector('body').addEventListener('click', function (e) {
  //HEADER --> nav__link
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//Menu animazione fade

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Passare argomento nell'handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Navigazione sticky
//Otteniamo le  coordinate dell'area top della pagina
// const coordinateIniziali = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   //Mostra la dinstanza tra il top della pagina e il punto della pagina in alto in pratica ci da un riferimento verticale di dove siamo
//   console.log(window.scrollY);

//   if (window.scrollY > coordinateIniziali.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//Sticky navigation: interesction Observer API
// //IntersectionObserver() ci permette di osservare un certo target
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: 0.1, // --> abbiamo evento solo quando siamo interesseti cioè al 10%
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1);

//OBSERVER NAVIGATION
const hdr = document.querySelector('.header');
const navAltezza = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navAltezza}px`,
});
headerObs.observe(hdr);

//Reveal section
const allSelections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  entry.target.classList.remove('section--hidden');
};

const sectionObeserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSelections.forEach(function (section) {
  sectionObeserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////
///////////////////////////////////////////

//SELEZIONE DI ELEMENTI
//Se vogliamo selezionare una certa parte del codice document.

//Messaggio cookie
const messaggio = document.createElement('div');
messaggio.classList.add('cookie-message');

messaggio.innerHTML =
  'Ti piacciono i cookies? 🍪 <button class= " btn btn--close-cookie" >Si!</button><button class= " btn btn--close-cookie" >No</button>';

header.prepend(messaggio);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    messaggio.remove();
  });

//per modificare lo stile di un certo elemento bisogna invocarlo --> funziona solo per lo stile 'inline'
messaggio.style.backgroundColor = '#37383d';
messaggio.style.width = '120%';

messaggio.style.height =
  Number.parseFloat(getComputedStyle(messaggio).height, 10) + 40 + 'px';

//Tavola cliccabile

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //Clausola di guardia --> se non si clicca nulla la funzione finisce
  if (!clicked) return;

  //remove classi attive
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //tab attiva
  clicked.classList.add('operations__tab--active');

  //area contenuti attiva
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
