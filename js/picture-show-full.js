import {isEscEvent} from './utils.js';

const bodyElement = document.body;
const bigPicture = bodyElement.querySelector('.big-picture');
const bigPictureImg = bodyElement.querySelector('.big-picture__img');
const bigPictureCancel = bodyElement.querySelector('.big-picture__cancel');
const socialCommentCount = bodyElement.querySelector('.social__comment-count');
const commentsLoader = bodyElement.querySelector('.comments-loader');
const likesCount = bodyElement.querySelector('.likes-count');
const commentsCount = bodyElement.querySelector('.comments-count');
const socialCaption = bodyElement.querySelector('.social__caption');
const socialComments = bodyElement.querySelector('.social__comments');

const listEventHandler = [];

const pictureCloseFull = () => {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  while (listEventHandler.length) {
    (listEventHandler.pop())();
  }
};

const onEscKeyDown = (evt) => {
  if (isEscEvent(evt.code)) {
    evt.preventDefault();
    pictureCloseFull();
  }
};

const pictureShowFull = (picture) => {
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.children[0].src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  if (socialComments.children.length > 0) {
    for (let index = socialComments.children.length - 1; index >= 0; index--) {
      socialComments.children[index].remove();
    }
  }

  const getListItem = (index) => `<li class="social__comment">
  <img
      class="social__picture"
      src="${picture.comments[index].avatar}"
      alt="${picture.comments[index].name}"
      width="35" height="35">
  <p class="social__text">${picture.comments[index].message}</p>
</li>`;

  for (let index = 0; index < picture.comments.length; index++) {
    socialComments.insertAdjacentHTML('beforeend', getListItem(index));
  }

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureCancel.addEventListener('click', pictureCloseFull);
  document.addEventListener('keydown', onEscKeyDown);

  const bigPictureCancelRemoveEvent = () => bigPictureCancel.removeEventListener('click', pictureCloseFull);
  const documentRemoveEvent = () => document.removeEventListener('keydown', onEscKeyDown);

  listEventHandler.push(bigPictureCancelRemoveEvent);
  listEventHandler.push(documentRemoveEvent);
};

export {pictureShowFull};
