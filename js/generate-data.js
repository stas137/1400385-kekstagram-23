import {getRandomIntegerFromRange} from './utils.js';

const PHOTO_DESCRIPTION_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const AVATAR_MIN_NUMBER = 1;
const AVATAR_MAX_NUMBER = 6;
const COMMENTS_MIN_COUNT = 3;
const COMMENTS_MAX_COUNT = 9;

const DESCRIPTION_TEXTS = [
  'Самая красивая фотография',
  'Лучшее фото',
  'Хорошая фотография',
  'Я могу лучше',
];

const MESSAGE_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR_NAMES = [
  'Иван',
  'Петр',
  'Антон',
  'Василий',
  'Руслан',
];

const getRandomArrayElement = (elements) => (elements[getRandomIntegerFromRange(0, elements.length-1)]);
const getIdDescription = (index) => (index + 1);
const getUrl = (index) => (`photos/${index + 1}.img`);
const getDescription = () => (getRandomArrayElement(DESCRIPTION_TEXTS));
const getRandomLikes = (min, max) => (getRandomIntegerFromRange(min, max));
const getAvatar = () => (`img/avatar-${getRandomIntegerFromRange(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER)}.svg`);
const getMessages = (count) => (new Array(count).fill(null).map(() => getRandomArrayElement(MESSAGE_TEXTS)));

const setIdComments = new Set();
const getIdComment = () => {
  if (setIdComments.size >= (LIKES_MAX_COUNT - LIKES_MIN_COUNT + 1)) {
    return new Error('Необходимо увеличить диапазон уникальных номеров для комментариев');
  }

  let id = getRandomIntegerFromRange(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
  while (setIdComments.has(id)) {
    id = getRandomIntegerFromRange(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
  }
  setIdComments.add(id);
  return id;
};

const createComment = () => (
  { id: getIdComment(),
    avatar: getAvatar(),
    message: getMessages(getRandomIntegerFromRange(1, 2)),
    name: getRandomArrayElement(AUTHOR_NAMES),
  }
);

const getComments = (count) => (new Array(count).fill(null).map(() => createComment()));

const createPhotoDescription = (index) => (
  { id: getIdDescription(index),
    url: getUrl(index),
    description: getDescription(),
    likes: getRandomLikes(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
    comments: getComments(getRandomIntegerFromRange(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT)),
  }
);

const photoDescriptions = () => (new Array(PHOTO_DESCRIPTION_COUNT).fill(null).map((currentValue, index) => createPhotoDescription(index)));

export {photoDescriptions as generateData};
