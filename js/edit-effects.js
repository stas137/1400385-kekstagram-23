const LEVEL_VALUE = 100;
const EFFECTS_LIST = {
  'effect-none': 'effects__preview--none',
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat',
};

const uploadImg = document.querySelector('.img-upload');
const uploadPreview = uploadImg.querySelector('.img-upload__preview');

const effectsRadioAddEventHandler = (item) => {
  const radioEventHandler = () => {
    const effectsItemChildren = item.children;
    const uploadEffectLevel = uploadImg.querySelector('.img-upload__effect-level');
    const effectLevelValue = uploadEffectLevel.querySelector('.effect-level__value');
    effectLevelValue.value = String(LEVEL_VALUE);

    if (effectsItemChildren[0].id === 'effect-none') {
      uploadEffectLevel.classList.add('hidden');
      uploadPreview.style.filter = '';
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    if (uploadPreview.classList.contains(EFFECTS_LIST[effectsItemChildren[0].id])) {
      return;
    }

    for (const value of Object.values(EFFECTS_LIST)) {
      uploadPreview.classList.remove(value);
    }

    uploadPreview.classList.add(EFFECTS_LIST[effectsItemChildren[0].id]);
  };

  item.addEventListener('click', radioEventHandler);
};

const editEffects = () => {
  const effectsList = document.querySelector('.effects__list');
  const effectsItem = effectsList.children;

  for (let index = 0; index < effectsItem.length; index++){
    effectsRadioAddEventHandler(effectsItem[index]);
  }
};

export {editEffects};
