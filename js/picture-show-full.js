const ESCAPE_CODE = 'Escape';

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

const pictureShowFull = (picture) => {
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.children[0].src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  for (let index = socialComments.children.length - 1; index >= 0; index--) {
    socialComments.children[index].remove();
  }

  for (let index = 0; index < picture.comments.length; index++) {
    const element = `<li class="social__comment">
    <img
        class="social__picture"
        src="${picture.comments[index].avatar}"
        alt="${picture.comments[index].name}"
        width="35" height="35">
    <p class="social__text">${picture.comments[index].message}</p>
  </li>`;
    socialComments.insertAdjacentHTML('beforeend', element);
  }

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

bigPictureCancel.addEventListener('click', () => {
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
});

bodyElement.addEventListener('keydown', (evt) => {
  if (evt.code === ESCAPE_CODE) {
    bodyElement.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }
});

export {pictureShowFull};
