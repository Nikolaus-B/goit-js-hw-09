import { Report } from 'notiflix/build/notiflix-report-aio';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startBTN: document.querySelector('[data-start]'),
  stopBTN: document.querySelector('[data-stop]'),
};

const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;
let isActive = false;
refs.stopBTN.setAttribute('disabled', false);

refs.startBTN.addEventListener('click', onBtnStartClick);
refs.stopBTN.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  if (isActive) {
    return;
  }
  console.log('click on start');

  Report.success('Hello', 'Your color swith is working', 'Super', {
    width: '360px',
    svgSize: '120px',
  });

  refs.stopBTN.removeAttribute('disabled');
  refs.startBTN.setAttribute('disabled', false);

  isActive = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function onBtnStopClick() {
  console.log('click on stop');
  clearInterval(intervalId);
  isActive = false;
  // document.body.style.backgroundColor = '#ffffff';
  refs.startBTN.removeAttribute('disabled');
  refs.stopBTN.setAttribute('disabled', false);

  Report.failure('', 'You stop color swither', 'I know', {
    width: '360px',
    svgSize: '120px',
  });
}

refs.startBTN.classList.add('change-color-btn');
refs.stopBTN.classList.add('change-color-btn');
