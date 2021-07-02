const ESCAPE_CODE = 'Escape';

const getRandomIntegerFromRange = function (min, max) {
  if (min >= max) {
    return new Error('Значение "от" должно быть меньше значения "до"');
  }
  const randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
};

const checkMaxLength = function (str, length) {
  if (str.length <= length) {
    return true;
  }
  return new Error('Длина строки превышает максимально допустимую длину');
};

const isEscEvent = (code) => code === ESCAPE_CODE;

export {getRandomIntegerFromRange, checkMaxLength, isEscEvent};
