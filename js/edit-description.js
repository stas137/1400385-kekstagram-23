const uploadImg = document.querySelector('.img-upload');

const editDescription = () => {
  const textHashtags = uploadImg.querySelector('.text__hashtags');
  const textComment = uploadImg.querySelector('.text__description');

  const itemAddEventHandler = (item) => {
    const eventHandler = () => {
      if (item.validationMessage !== '') {
        item.setCustomValidity('');
        item.style.outlineColor = 'black';
      }
    };

    item.addEventListener('input', eventHandler);
  };

  itemAddEventHandler(textHashtags);
  itemAddEventHandler(textComment);
};

export {editDescription};
