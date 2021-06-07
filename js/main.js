const getRandomIntegerRange = function (min, max) {
  if (min >= max) {
    return false;
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

getRandomIntegerRange(1, 3);
checkMaxLength('Keks', 4);
