import {generateData} from './generate-data.js';

const bodyElement = document.body;
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');
const picturesList = bodyElement.querySelector('.pictures');

const picturesGenerate = generateData();
const pictureListFragment = document.createDocumentFragment();

picturesGenerate.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureListFragment.appendChild(pictureElement);
});

picturesList.appendChild(pictureListFragment);
