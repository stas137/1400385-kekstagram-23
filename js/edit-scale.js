const STEP = 25;
const MAX_SCALE_VALUE = 100;

const uploadImg = document.querySelector('.img-upload');
const uploadPreview = uploadImg.querySelector('.img-upload__preview');
const uploadScale = uploadImg.querySelector('.img-upload__scale');
const controlSmaller = uploadScale.querySelector('.scale__control--smaller');
const controlBigger = uploadScale.querySelector('.scale__control--bigger');
const controlValue = uploadScale.querySelector('.scale__control--value');

const setScale = (evt) => {

  const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);
  let directionScale = null;

  if ((evt.target === controlSmaller) && ((number - STEP) > STEP)) {
    directionScale = -1;
  } else if ((evt.target === controlBigger) && ((number + STEP) <= MAX_SCALE_VALUE)) {
    directionScale = 1;
  }

  if (directionScale) {
    controlValue.value = `${number + STEP * directionScale}%`;
    uploadPreview.style.transform = `scale(${(number + STEP * directionScale) / MAX_SCALE_VALUE})`;
  }
};

const editScale = () => {
  uploadScale.addEventListener('click', (evt) => { setScale(evt); });
};

export {editScale};
