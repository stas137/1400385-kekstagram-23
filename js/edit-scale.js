const STEP = 25;
const MAX_SCALE_VALUE = 100;

const uploadImg = document.querySelector('.img-upload');
const uploadPreview = uploadImg.querySelector('.img-upload__preview');
const uploadScale = uploadImg.querySelector('.img-upload__scale');

const editScale = () => {
  const controlSmaller = uploadImg.querySelector('.scale__control--smaller');
  const controlBigger = uploadImg.querySelector('.scale__control--bigger');
  const controlValue = uploadImg.querySelector('.scale__control--value');

  uploadScale.addEventListener('click', (evt) => {
    const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);

    const setScale = (item, preview, directionScale) => {
      item.value = `${number + STEP * directionScale}%`;
      preview.style.transform = `scale(${(number + STEP * directionScale) / MAX_SCALE_VALUE})`;
    };

    if ((evt.target === controlSmaller) && ((number - STEP) > STEP)) {
      setScale(controlValue, uploadPreview, -1);
    } else if ((evt.target === controlBigger) && ((number + STEP) <= MAX_SCALE_VALUE)) {
      setScale(controlValue, uploadPreview, 1);
    }
  });
};

export {editScale};
