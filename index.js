document.addEventListener("DOMContentLoaded", function () {
  const photoContainer = document.getElementById("photoContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const toggleSwitch = document.getElementById("toggleSwitch");

  function fetchPhotos() {
    // Clear the existing content of the photo container
    photoContainer.innerHTML = "";

    // Fetch 4 random photos from the API
    for (let i = 0; i < 4; i++) {
      fetch("https://picsum.photos/375/375")
        .then((response) => {
          if (response.ok) {
            return response.url;
          } else {
            throw new Error("Failed to fetch photo");
          }
        })
        .then((photoUrl) => {
          // Create an image element
          const img = document.createElement("img");
          img.src = photoUrl;
          img.alt = "Random Photo";

          // Append the image to the container
          photoContainer.appendChild(img);
        })
        .catch((error) => console.error(error));
    }
  }

  function applyGrayscale() {
    // Apply grayscale class to all images if the toggle switch is enabled
    const images = photoContainer.querySelectorAll("img");
    images.forEach((img) => {
      if (toggleSwitch.checked) {
        img.classList.add("grayscale");
      } else {
        img.classList.remove("grayscale");
      }
    });
  }

  // Initial load of photos
  fetchPhotos();

  // Load more photos when the button is clicked
  loadMoreBtn.addEventListener("click", function () {
    fetchPhotos();
    applyGrayscale(); // Apply grayscale after fetching new photos
  });

  // Apply grayscale effect when the switch is changed
  toggleSwitch.addEventListener("change", function () {
    applyGrayscale();
  });
});
