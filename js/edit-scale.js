const STEP = 25;

const uploadImg = document.querySelector('.img-upload');
const uploadPreview = uploadImg.querySelector('.img-upload__preview');

const editScale = () => {
  const controlSmaller = uploadImg.querySelector('.scale__control--smaller');
  const controlBigger = uploadImg.querySelector('.scale__control--bigger');
  const controlValue = uploadImg.querySelector('.scale__control--value');

  controlSmaller.addEventListener('click', () => {
    const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);
    if ((number - STEP) > STEP) {
      controlValue.value = `${number - STEP}%`;
      uploadPreview.style.transform = `scale(${(number - STEP) / 100})`;
    }
  });

  controlBigger.addEventListener('click', () => {
    const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);
    if ((number + STEP) <= 100) {
      controlValue.value = `${number + STEP}%`;
      uploadPreview.style.transform = `scale(${(number + STEP) / 100})`;
    }
  });
};

export {editScale};
