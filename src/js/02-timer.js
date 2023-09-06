import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};

const currentDate = Date.now();
let selectedDate = null;

const btnStop = document.createElement('button');
btnStop.textContent = 'Reset';
btnStop.classList.add('timer-btn');
btnStop.style.marginLeft = '10px';
refs.startBtn.after(btnStop);
btnStop.setAttribute('disabled', false);

refs.startBtn.classList.add('timer-btn');
refs.startBtn.style.marginLeft = '10px';
refs.startBtn.setAttribute('disabled', false);

const fl = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
    if (currentDate > selectedDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = String(days).padStart(2, 0);
  refs.hours.textContent = String(hours).padStart(2, 0);
  refs.minutes.textContent = String(minutes).padStart(2, 0);
  refs.seconds.textContent = String(seconds).padStart(2, 0);
}
let intervalId = null;
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', false);
  btnStop.removeAttribute('disabled');
  intervalId = setInterval(() => {
    let diferentTime = selectedDate - Date.now();
    addLeadingZero(convertMs(diferentTime));
  }, 1000);
});

btnStop.addEventListener('click', () => {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  clearInterval(intervalId);
  btnStop.setAttribute('disabled', false);
});
