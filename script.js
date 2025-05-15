// Inisialisasi Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-storage.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBaXfRiUj2kjyHhf9uukPCAP6ArrCq_mIo",
  authDomain: "miku-gallery-art.firebaseapp.com",
  projectId: "miku-gallery-art",
  storageBucket: "miku-gallery-art.appspot.com",
  messagingSenderId: "453781034645",
  appId: "1:453781034645:web:824110b3ea93c24a43ed9c"
};

// Inisialisasi App & Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Smooth scroll untuk anchor
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

// Upload Form logic
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
      // Progress bar bisa ditambahkan di sini
    },
    (error) => {
      alert("Upload failed: " + error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        alert("Upload successful!");

        const gallery = document.getElementById("fanartGallery");
        const img = document.createElement("img");
        img.src = downloadURL;
        img.alt = `Fan Art by ${uploaderName}`;
        gallery.appendChild(img);
      });
    }
  );
});
