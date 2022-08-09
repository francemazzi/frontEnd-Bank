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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////

//SELEZIONE DI ELEMENTI
//Se vogliamo selezionare una certa parte del codice document.
console.log(document.body);
const header = document.querySelector('header');
const allSelection = document.querySelectorAll('.section');

document.getElementById('section--1');
const button = document.getElementsByTagName('button');

//Messaggio cookie
const messaggio = document.createElement('div');
messaggio.classList.add('cookie-message');

messaggio.innerHTML =
  'Ti piacciono i cookies? 🍪 <button class= " btn btn--close-cookie" >Si!</button>';

header.prepend(messaggio);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    messaggio.remove();
  });
