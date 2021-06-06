const randomInteger = function (min, max) {
  if (min >= max) {
    return;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const checkMaxLength = function (str, maxLen) {
  if (str.length <= maxLen) {
    return true;
  }
  return false;
};

randomInteger(1, 3);
checkMaxLength('Keks', 4);
