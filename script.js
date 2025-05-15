document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-storage.js";

const storage = getStorage(app);

const uploadForm = document.getElementById("uploadForm");
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("fanartImage").files[0];
  const uploaderName = document.getElementById("uploaderName").value.trim();

  if (!file || !uploaderName) return alert("Please fill all fields.");

  const storageRef = ref(storage, `fanart/${uploaderName}_${Date.now()}_${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Optional: update progress bar here
    },
    (error) => {
      alert("Upload failed: " + error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        alert("Upload successful!");
        // Optional: tampilkan gambar di gallery dengan menambah elemen <img>
        const gallery = document.getElementById("fanartGallery");
        const img = document.createElement("img");
        img.src = downloadURL;
        img.alt = `Fan Art by ${uploaderName}`;
        gallery.appendChild(img);
      });
    }
  );
});
