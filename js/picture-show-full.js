import {isEscEvent} from './utils.js';

const COMMENT_COUNT_SHOW = 5;
let partComments = 1;

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

const pictureCloseFull = () => {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  bigPictureCancel.removeEventListener('click', pictureCloseFull);
};

const onEscKeyDown = (evt) => {
  if (isEscEvent(evt.code)) {
    evt.preventDefault();
    pictureCloseFull();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const getListItem = (index, comments) => `<li class="social__comment">
<img
  class="social__picture"
  src="${comments[index].avatar}"
  alt="${comments[index].name}"
  width="35" height="35">
<p class="social__text">${comments[index].message}</p>
</li>`;

const loadCommentsEventHandler = (picture, eventHandler) => {

  if (COMMENT_COUNT_SHOW * partComments <= picture.comments.length) {
    for (let index = COMMENT_COUNT_SHOW * (partComments - 1); index < COMMENT_COUNT_SHOW * partComments; index++) {
      socialComments.insertAdjacentHTML('beforeend', getListItem(index, picture.comments));
    }
    socialCommentCount.innerHTML = `${COMMENT_COUNT_SHOW * partComments} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
    partComments++;
  } else {
    for (let index = COMMENT_COUNT_SHOW * (partComments - 1); index < picture.comments.length; index++) {
      socialComments.insertAdjacentHTML('beforeend', getListItem(index, picture.comments));
    }
    socialCommentCount.innerHTML = `${picture.comments.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', eventHandler);
  }

};

const pictureShowFull = (picture) => {
  partComments = 1;
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
  const loadComments = () => loadCommentsEventHandler(picture, loadComments);
  loadComments();

  commentsLoader.addEventListener('click', loadComments);
  bigPictureCancel.addEventListener('click', pictureCloseFull);
  document.addEventListener('keydown', onEscKeyDown);
};

export {pictureShowFull};
