import {getData} from './api.js';
import {compareCountComments, getRandomIntegerFromRange} from './utils.js';
import {pictureShowFull} from './picture-show-full.js';

const ALERT_SHOW_TIME = 4000;
const RANDOM_COUNT_THUMBNAILS = 10;
const RERENDER_DELAY = 500;

const bodyElement = document.body;
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');
const picturesList = bodyElement.querySelector('.pictures');

const imgFilters= bodyElement.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const addEventHandler = (evt, picture) => {
  evt.preventDefault();
  pictureShowFull(picture);
};

const renderThumbnail = (pictures) => {
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

const reRenderData = (pictures) => {

  const firstPicture = picturesList.querySelector('.picture');

  for (let index = picturesList.children.length - 1; index >= 0; index--) {
    if (picturesList.children[index] === firstPicture) {
      picturesList.children[index].remove();
      break;
    }
    picturesList.children[index].remove();
  }

  renderThumbnail(pictures);
};

const sortData = (data) => {
  const result = data.slice();
  result.sort(compareCountComments);
  return result;
};

const randomData = (data) => {
  const result = [];
  const setIndexs = new Set();

  let thumbnailsCount = 0;
  let randomIndex = null;
  while (thumbnailsCount < RANDOM_COUNT_THUMBNAILS) {
    do {
      randomIndex = getRandomIntegerFromRange(0, data.length - 1);
    } while (setIndexs.has(randomIndex));
    setIndexs.add(randomIndex);
    result.push(data[randomIndex]);
    thumbnailsCount++;
  }
  return result;
};

let timeId = null;
const debounce = (cb, timeout) => {
  clearTimeout(timeId);
  timeId = setTimeout(cb, timeout);
};

const eventHandlerFilter = (evt, pictures) => {
  if ((!evt.target.classList.contains('img-filters__button--active')) && (evt.target.closest('button'))) {

    const elements = evt.target.parentElement.children;
    for (let index = 0; index < elements.length; index ++) {
      elements[index].classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');

    switch (evt.target) {
      case filterDefault:
        debounce(() => reRenderData(pictures), RERENDER_DELAY);
        break;
      case filterDiscussed:
        debounce(() => reRenderData(sortData(pictures)), RERENDER_DELAY);
        break;
      case filterRandom:
        debounce(() => reRenderData(randomData(pictures)), RERENDER_DELAY);
        break;
      default:
        debounce(() => reRenderData(pictures), RERENDER_DELAY);
        break;
    }
  }
};

const renderData = (data) => {
  renderThumbnail(data);

  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.classList.add('img-filters--active');
  imgFilters.addEventListener('click', (evt) => { eventHandlerFilter(evt, data); });
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
