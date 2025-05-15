const cloudName = 'de4wim22n'; // ganti dengan Cloudinary cloud name lo
const unsignedUploadPreset = 'MikuVerse'; // sesuai nama preset unsigned lo

const uploadForm = document.getElementById('uploadForm');
const fanartImage = document.getElementById('fanartImage');
const uploaderName = document.getElementById('uploaderName');
const fanartGallery = document.getElementById('fanartGallery');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = fanartImage.files[0];
  const name = uploaderName.value.trim();

  if (!file) {
    alert('Please select an image file!');
    return;
  }

  if (!name) {
    alert('Please enter your name!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', unsignedUploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed!');

    const data = await response.json();

    // Buat element gambar baru & info uploader
    const imgElem = document.createElement('img');
    imgElem.src = data.secure_url;
    imgElem.alt = `Fan Art by ${name}`;

    fanartGallery.prepend(imgElem);

    // Reset form
    uploadForm.reset();
    alert('Upload sukses! Fan art kamu sudah muncul di gallery.');

  } catch (error) {
    alert('Upload gagal. Coba lagi ya!');
    console.error(error);
  }
});
