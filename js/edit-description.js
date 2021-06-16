const uploadImg = document.querySelector('.img-upload');

const editDescription = () => {
  const textHashtags = uploadImg.querySelector('.text__hashtags');
  const textComment = uploadImg.querySelector('.text__description');

  textHashtags.addEventListener('input', () => {
    if (textHashtags.validationMessage !== '') {
      textHashtags.setCustomValidity('');
      textHashtags.style.outlineColor = 'black';
    }
  });

  textComment.addEventListener('input', () => {
    if (textComment.validationMessage !== '') {
      textComment.setCustomValidity('');
      textComment.style.outlineColor = 'black';
    }
  });
};

export {editDescription};
