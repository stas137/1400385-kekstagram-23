import {getData} from './api.js';
import {pictureShowFull} from './picture-show-full.js';

const ALERT_SHOW_TIME = 4000;

const bodyElement = document.body;
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');
const picturesList = bodyElement.querySelector('.pictures');

const addEventHandler = (evt, picture) => {
  evt.preventDefault();
  pictureShowFull(picture);
};

const renderData = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', (evt) => { addEventHandler(evt, picture); });

    pictureListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(pictureListFragment);
};

const renderError = (err) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 999;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = `${bodyElement.clientWidth / 2 - 150}px`;
  alertContainer.style.top = `${bodyElement.clientHeight / 3}px`;

  alertContainer.style.padding = '30px 30px';

  alertContainer.style.width = '300px';
  alertContainer.style.height = '120px';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.innerHTML = `Ошибка!<br/>${err}`;

  bodyElement.append(alertContainer);

  setTimeout(() => { alertContainer.remove(); }, ALERT_SHOW_TIME);
};

getData(renderData, renderError);
