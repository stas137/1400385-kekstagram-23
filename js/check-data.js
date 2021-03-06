const HASHTAGS_LENGTH = 100;
const HASHTAGS_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MIN_LENGTH = 2;
const REG_EXP = '[^A-Za-zА-Яа-я0-9]';

const getHashtags = (value) => (value.split(' '));

const getHashtagsLowerCase = (value) => {
  const hashtagsLowerCase = value.map((item) => item.toLowerCase());
  return hashtagsLowerCase;
};

const isHashtagsCorrect = (value) => {
  const hashtagsWithoutSharp = value.map((item) => {
    if (item[0] === '#') {
      return item.slice(1, item.length);
    }
    return item;
  });

  for (let index = 0; index < hashtagsWithoutSharp.length; index++) {
    if (hashtagsWithoutSharp[index].match(REG_EXP)) {
      return false;
    }
  }
  return true;
};

const checkHashtagsMaxLength = (value) => {
  for (let index = 0; index < value.length; index++) {
    if (value[index].length > HASHTAG_MAX_LENGTH) {
      return true;
    }
  }
  return false;
};

const checkHashtagsMinLength = (value) => {
  for (let index = 0; index < value.length; index++) {
    if (value[index].length < HASHTAG_MIN_LENGTH) {
      return true;
    }
  }
  return false;
};

const checkHashtagsFirstChar = (value) => {
  for (let index = 0; index < value.length; index++) {
    if (value[index][0] !== '#') {
      return true;
    }
  }
  return false;
};

const checkHashtagsCharSharp = (value) => {
  for (let index = 0; index < value.length; index++) {
    if ((value[index][0] === '#') && (value[index].length === 1)) {
      return true;
    }
  }
  return false;
};

const checkHashtagsValidity = (value) => {
  const listErrors = [];
  const hashtags = getHashtags(value);
  const listUniqueHashtags = [...new Set(getHashtagsLowerCase(hashtags))];

  if (!value) {
    return listErrors;
  }

  if (value.length >= HASHTAGS_LENGTH) {
    listErrors.push('Превышена максимальная длина всех хэштегов');
  }

  if (hashtags.length > HASHTAGS_COUNT) {
    listErrors.push(`Количество хэштегов не должно превышать ${HASHTAGS_COUNT}`);
  }

  if (hashtags.length !== listUniqueHashtags.length) {
    listErrors.push('Есть повторяющиеся хэштеги');
  }

  if (checkHashtagsMaxLength(hashtags)) {
    listErrors.push(`Есть хэштеги с длиной больше, чем ${HASHTAG_MAX_LENGTH} символов`);
  }

  if (checkHashtagsMinLength(hashtags)) {
    listErrors.push(`Есть хэштеги с длиной меньше, чем ${HASHTAG_MIN_LENGTH} символа`);
  }

  if (checkHashtagsFirstChar(hashtags)) {
    listErrors.push('Есть хэштеги начинающиеся не с символа "#"');
  }

  if (checkHashtagsCharSharp(hashtags)) {
    listErrors.push('Есть хэштеги состоящие только из символа "#"');
  }

  if (!isHashtagsCorrect(hashtags)) {
    listErrors.push('Есть хэштеги состоящие не только из символов букв и цифр');
  }

  return listErrors;
};

const itemSetCustomValidity = (item, message) => {
  item.setCustomValidity(message);
  item.style.outlineColor = 'red';
};

const checkData = () => {
  const uploadImg = document.querySelector('.img-upload');
  const textHashtags = uploadImg.querySelector('.text__hashtags');
  const customHashtagsValidityMessage = checkHashtagsValidity(textHashtags.value).join('\n');

  return customHashtagsValidityMessage.length > 0 ? itemSetCustomValidity(textHashtags, customHashtagsValidityMessage) : true;
};

export {checkData};
