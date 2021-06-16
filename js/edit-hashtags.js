const uploadImg = document.querySelector('.img-upload');

const editHashtags = () => {
  const textHashtags = uploadImg.querySelector('.text__hashtags');
  const textDescription = uploadImg.querySelector('.text__description');

  textHashtags.addEventListener('input', () => {
    if (textHashtags.validationMessage !== '') {
      textHashtags.setCustomValidity('');
      textHashtags.style.outlineColor = 'black';
    }
  });

  textDescription.addEventListener('input', () => {
    if (textDescription.validationMessage !== '') {
      textDescription.setCustomValidity('');
      textDescription.style.outlineColor = 'black';
    }
  });
};

export {editHashtags};
