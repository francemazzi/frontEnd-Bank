'use strict';

const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');
//Per rendere il codice performanete usiakmo observer e criamo una nuova interessazione
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('show', entry.isIntersecting);
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 1,
  }
);

const obsLastCard = new IntersectionObserver(
  entries => {
    const lastcard = entries[0];
    if (!lastcard.isIntersecting) return;
    loadNewCard();
    obsLastCard.unobserve(lastcard.target);
    obsLastCard.observe(document.querySelector('.card:last-child'));
  },
  {
    //ottimo per inserire margini e caricare in anticipo immagini o contenuti
    rootMargin: '100px',
  }
);

obsLastCard.observe(document.querySelector('.card:last-child'));

//Ora osserviamo le interesazioni di un elemnto nel nostro schermo.

cards.forEach(card => {
  observer.observe(card);
});

function loadNewCard() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New Card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}
