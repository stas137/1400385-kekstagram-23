const randomInteger = function (min, max) {
  if (min >= max) {
    return;
  }
  const rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

const checkLength = function (str, maxLen) {
  if (str.length <= maxLen) {
    return true;
  }
  return false;
};

randomInteger(1, 3);
checkLength('Keks', 4);
