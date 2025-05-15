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
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // cegah reload form

  const imageFile = document.getElementById("fanartImage").files[0];
  const uploaderName = document.getElementById("uploaderName").value;

  if (!imageFile || !uploaderName) {
    alert("Lengkapi semua field dulu, ya!");
    return;
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "MikuVerse"); // nama preset
  formData.append("folder", "MikuVerseFolder"); // nama folder di Cloudinary
  formData.append("context", `alt=${uploaderName}`); // buat alt text

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dwnbhfq4l/image/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    alert("Upload berhasil!");

    const img = document.createElement("img");
    img.src = data.secure_url;
    img.alt = uploaderName;

    document.getElementById("fanartGallery").appendChild(img);
  } catch (err) {
    console.error(err);
    alert("Upload gagal. Coba lagi ya!");
  }
});
