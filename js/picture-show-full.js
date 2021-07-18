import {isEscEvent} from './utils.js';

const COMMENT_COUNT_SHOW = 5;

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

const getListItem = (index, comments) => {
  const listItem = document.createElement('li');
  const imgItem = document.createElement('img');
  const pItem = document.createElement('p');

  listItem.classList.add('social__comment');
  imgItem.classList.add('social__picture');
  pItem.classList.add('social__text');
  imgItem.src = comments[index].avatar;
  imgItem.alt = comments[index].name;
  imgItem.width = '35';
  imgItem.height = '35';
  pItem.textContent = comments[index].message;

  listItem.append(imgItem);
  listItem.append(pItem);
  return listItem;
};

const renderSocialComments = (picture, indexFrom, indexTo) => {
  for (let index = indexFrom; index < indexTo; index++) {
    socialComments.append(getListItem(index, picture.comments));
  }
};

const loadComments = (picture, indexFrom = 0, indexTo = COMMENT_COUNT_SHOW) => {
  const commentsLoader = bodyElement.querySelector('.comments-loader');
  const commentsLoaderClone = commentsLoader.cloneNode(true);
  commentsLoader.replaceWith(commentsLoaderClone);

  if (picture.comments.length > indexTo) {
    renderSocialComments(picture, indexFrom, indexTo);
    socialCommentCount.innerHTML = `${indexTo} из <span class="comments-count">${picture.comments.length}</span> комментариев`;

    const onCommentLoaderClick = () => {
      const indexFromNew = indexTo;
      const indexToNew = indexTo + COMMENT_COUNT_SHOW;

      loadComments(picture, indexFromNew, indexToNew);
    };

    commentsLoaderClone.classList.remove('hidden');
    commentsLoaderClone.addEventListener('click', onCommentLoaderClick);
  } else {
    renderSocialComments(picture, indexFrom, picture.comments.length);
    socialCommentCount.innerHTML = `${picture.comments.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;

    commentsLoaderClone.classList.add('hidden');
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

  loadComments(picture);

  bigPictureCancel.addEventListener('click', pictureCloseFull);
  document.addEventListener('keydown', onEscKeyDown);
};

export {pictureShowFull};
