const cloudName = "de4wim22n"; // Cloudinary cloud name lo
const unsignedUploadPreset = "MikuVerse"; // Upload preset lo yang udah di-set di Cloudinary

const uploadForm = document.getElementById("uploadForm");
const fanartImage = document.getElementById("fanartImage");
const uploaderName = document.getElementById("uploaderName");
const gallery = document.getElementById("fanartGallery");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!fanartImage.files[0]) {
    alert("Please select an image file.");
    return;
  }
  if (!uploaderName.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  const file = fanartImage.files[0];
  const name = uploaderName.value.trim();

  // Prepare form data sesuai Cloudinary requirements
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);
  formData.append("folder", "MikuVerseFolder");
  formData.append("context", `caption=${name}`); // Optional, simpen nama uploader sebagai caption

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();

    // Data.secure_url is the URL of the uploaded image
    alert("Upload successful!");

    // Tambahin gambar ke gallery langsung
    const img = document.createElement("img");
    img.src = data.secure_url;
    img.alt = `Fan Art by ${name}`;
    img.style.borderRadius = "8px";
    img.style.width = "200px";
    img.style.margin = "5px";
    gallery.appendChild(img);

    // Reset form
    uploadForm.reset();
  } catch (error) {
    alert("Upload error: " + error.message);
  }
});
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fanartImage');
  const uploaderName = document.getElementById('uploaderName').value.trim();

  if (!fileInput.files[0] || !uploaderName) return alert('Lengkapi semua field!');

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('upload_preset', 'MikuVerse'); // nama upload preset
  formData.append('folder', 'MikuVerseFolder'); // folder tujuan

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dpl5z2n8h/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.secure_url) {
      const gallery = document.getElementById('fanartGallery');
      const img = document.createElement('img');
      img.src = data.secure_url;
      img.alt = uploaderName;
      gallery.appendChild(img);

      // reset form
      fileInput.value = '';
      document.getElementById('uploaderName').value = '';
    } else {
      console.error('Upload gagal:', data);
      alert('Upload gagal!');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Terjadi kesalahan saat upload.');
  }
});

