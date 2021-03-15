const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const picPreview = document.querySelector('.ad-form-header__pic-preview');

const imagesChooser = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

imagesChooser.addEventListener('change', () => {
  const file = imagesChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagesPreview.style.backgroundImage = `url(${reader.result})`;
      imagesPreview.style.backgroundSize =  '70px 70px';
    });

    reader.readAsDataURL(file);
  }
});