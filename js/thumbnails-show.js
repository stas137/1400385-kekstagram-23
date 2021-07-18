import {getData} from './api.js';
import {compareCountComments, getRandomIntegerFromRange, debounce} from './utils.js';
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

const clearThumbnails = () => {
  const firstPicture = picturesList.querySelector('.picture');

  if (firstPicture) {
    for (let index = picturesList.children.length - 1; index >= 0; index--) {
      if (picturesList.children[index] === firstPicture) {
        picturesList.children[index].remove();
        break;
      }
      picturesList.children[index].remove();
    }
  }
};

const renderThumbnails = (pictures) => {

  clearThumbnails();

  if (pictures) {
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
  }
};

const sortThumbnails = (data) => {
  const result = data.slice();
  return result.sort(compareCountComments);
};

const getRandomThumbnails = (data) => {
  const randomThumbnails = [];
  const setIndexs = new Set();

  let thumbnailsCount = 0;
  let randomIndex = null;
  while (thumbnailsCount < RANDOM_COUNT_THUMBNAILS) {
    do {
      randomIndex = getRandomIntegerFromRange(0, data.length - 1);
    } while (setIndexs.has(randomIndex));
    setIndexs.add(randomIndex);
    randomThumbnails.push(data[randomIndex]);
    thumbnailsCount++;
  }
  return randomThumbnails;
};

const setClassButtonActive = (element) => {
  const elements = element.parentElement.children;
  for (let index = 0; index < elements.length; index ++) {
    elements[index].classList.remove('img-filters__button--active');
  }

  element.classList.add('img-filters__button--active');
};

const handleClickFilter = (evt, pictures, cb) => {
  if (!(evt.target.classList.contains('img-filters__button--active')) && (evt.target.closest('button'))) {

    setClassButtonActive(evt.target);

    switch (evt.target) {
      case filterDefault:
        cb(pictures);
        break;
      case filterDiscussed:
        cb(sortThumbnails(pictures));
        break;
      case filterRandom:
        cb(getRandomThumbnails(pictures));
        break;
      default:
        cb(pictures);
        break;
    }
  }
};

const showSortedList = (data) => {
  renderThumbnails(data);
  const showSortedListDelay = debounce(renderThumbnails, RERENDER_DELAY);
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', (evt) => { handleClickFilter(evt, data, showSortedListDelay); });
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
  alertContainer.append(document.createTextNode('Ошибка!'));
  alertContainer.append(document.createElement('<br>'));
  alertContainer.append(document.createTextNode(err.toString()));

  bodyElement.append(alertContainer);

  setTimeout(() => { alertContainer.remove(); }, ALERT_SHOW_TIME);
};

getData(showSortedList, renderError);
