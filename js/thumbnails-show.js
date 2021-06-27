import {generateData} from './generate-data.js';

const bodyElement = document.body;
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');
const pictureList = bodyElement.querySelector('.pictures');

const pictureGenerate = generateData();
const pictureListFragment = document.createDocumentFragment();

pictureGenerate.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureListFragment.appendChild(pictureElement);
});

pictureList.appendChild(pictureListFragment);
