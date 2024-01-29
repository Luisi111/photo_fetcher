document.addEventListener("DOMContentLoaded", function () {
  const photoContainer = document.getElementById("photoContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const toggleSwitch = document.getElementById("toggleSwitch");

  function fetchPhotos() {
    photoContainer.innerHTML = "";
    let promises = [];

    for (let i = 0; i < 4; i++) {
      let promise = fetch("https://picsum.photos/367/367")
        .then((response) => {
          if (response.ok) {
            return response.url;
          } else {
            throw new Error("Failed to fetch photo");
          }
        })
        .then((photoUrl) => {
          const img = document.createElement("img");
          img.src = photoUrl;
          img.alt = "Random Photo";
          photoContainer.appendChild(img);
        })
        .catch((error) => console.error(error));

      promises.push(promise);
    }

    return Promise.all(promises);
  }

  function applyGrayscale() {
    const images = photoContainer.querySelectorAll("img");
    images.forEach((img) => {
      if (toggleSwitch.checked) {
        img.classList.add("grayscale");
      } else {
        img.classList.remove("grayscale");
      }
    });
  }

  fetchPhotos();

  loadMoreBtn.addEventListener("click", function () {
    fetchPhotos().then(() => {
      applyGrayscale();
    });
  });

  toggleSwitch.addEventListener("change", function () {
    applyGrayscale();
  });
});

