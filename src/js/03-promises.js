import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  amount: document.querySelector('input[name=amount]'),
  step: document.querySelector('input[name=step]'),
  submitBtn: document.querySelector('button'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const amount = +refs.amount.value;
  const delay = +refs.delay.value;
  const step = +refs.step.value;
  let plusDelay = delay;

  createPromise(1, plusDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  for (let i = 2; i <= amount; i += 1) {
    plusDelay += step;
    createPromise(i, plusDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
