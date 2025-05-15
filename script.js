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

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);
  formData.append("folder", "MikuVerseFolder");
  formData.append("context", `caption=${name}`);

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

    alert("Upload successful!");

    const img = document.createElement("img");
    img.src = data.secure_url;
    img.alt = `Fan Art by ${name}`;
    img.style.borderRadius = "8px";
    img.style.width = "200px";
    img.style.margin = "5px";
    gallery.appendChild(img);

    uploadForm.reset();
  } catch (error) {
    alert("Upload error: " + error.message);
  }
});
