import {isEscEvent} from './utils.js';

const bodyElement = document.body;
const bigPicture = bodyElement.querySelector('.big-picture');
const bigPictureImg = bodyElement.querySelector('.big-picture__img');
const bigPictureCancel = bodyElement.querySelector('.big-picture__cancel');
const socialCommentCount = bodyElement.querySelector('.social__comment-count');
const likesCount = bodyElement.querySelector('.likes-count');
const commentsCount = bodyElement.querySelector('.comments-count');
const socialCaption = bodyElement.querySelector('.social__caption');
const socialComments = bodyElement.querySelector('.social__comments');

const pictureCloseFull = () => {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
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

const increasePartComments = (() => {
  let part = 0;
  return function (start) {
    if (start !== undefined) {
      part = 0;
    }
    return part++;
  };
})();

const loadCommentsEventHandler = (picture, commentsLoader) => {

  const COMMENT_COUNT_SHOW = 5;
  const partComments = increasePartComments();

  const addSocialComments = (count, start) => {
    for (let index = start; index < count + start; index++) {
      socialComments.insertAdjacentHTML('beforeend', getListItem(index, picture.comments));
    }
  };

  if (COMMENT_COUNT_SHOW * partComments < picture.comments.length) {
    const index = COMMENT_COUNT_SHOW * (partComments - 1);
    addSocialComments(COMMENT_COUNT_SHOW, index);
    socialCommentCount.innerHTML = `${COMMENT_COUNT_SHOW * partComments} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  } else {
    const index = COMMENT_COUNT_SHOW * (partComments - 1);
    const countCommentsShow = picture.comments.length - COMMENT_COUNT_SHOW * (partComments - 1);
    addSocialComments(countCommentsShow, index);
    socialCommentCount.innerHTML = `${picture.comments.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
    commentsLoader.classList.add('hidden');
    const commentsLoaderClone = commentsLoader.cloneNode(true);
    commentsLoader.replaceWith(commentsLoaderClone);
  }
};

const pictureShowFull = (picture) => {
  const commentsLoader = bodyElement.querySelector('.comments-loader');
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

  commentsLoader.classList.remove('hidden');
  increasePartComments(0);
  loadCommentsEventHandler(picture, commentsLoader);
  if (!commentsLoader.classList.contains('hidden')) {
    commentsLoader.addEventListener('click', () => { loadCommentsEventHandler(picture, commentsLoader); });
  }

  bigPictureCancel.addEventListener('click', pictureCloseFull);
  document.addEventListener('keydown', onEscKeyDown);
};

export {pictureShowFull};
