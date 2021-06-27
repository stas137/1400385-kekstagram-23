import {generateData} from './generate-data.js';
import {pictureShowFull} from './picture-show-full.js';

const bodyElement = document.body;
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');
const picturesList = bodyElement.querySelector('.pictures');

const picturesGenerate = generateData();
const pictureListFragment = document.createDocumentFragment();

const addEventHandler = (evt, picture) => {
  evt.preventDefault();
  pictureShowFull(picture);
};

picturesGenerate.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', (evt) => { addEventHandler(evt, picture);} );

  pictureListFragment.appendChild(pictureElement);
});

picturesList.appendChild(pictureListFragment);
