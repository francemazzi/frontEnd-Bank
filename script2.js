'use strict';

const cards = document.querySelectorAll('.card');
//Per rendere il codice performanete usiakmo observer e criamo una nuova interessazione
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
});

//Ora osserviamo le interesazioni di un elemnto nel nostro schermo.

cards.forEach(card => {
  observer.observe(card);
});
