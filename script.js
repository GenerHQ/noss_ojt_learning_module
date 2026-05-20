document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");
  const currentSlideSpan = document.getElementById("current-slide");
  const totalSlidesSpan = document.getElementById("total-slides");

  let currentIndex = 0;
  const totalSlides = slides.length;
  totalSlidesSpan.textContent = totalSlides;

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active-slide");
      } else {
        slide.classList.remove("active-slide");
      }
    });
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    currentSlideSpan.textContent = currentIndex + 1;
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;
    updateSlides();
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlides();
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  let touchStartX = 0;
  const wrapper = document.querySelector(".presentation-wrapper");
  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  wrapper.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].screenX;
    if (endX < touchStartX - 50) nextSlide();
    if (endX > touchStartX + 50) prevSlide();
  });

  createDots();
  updateSlides();

  console.log(`SSS NCD Presentation Ready — ${totalSlides} slides loaded`);
});

// Toggle description visibility when clicking on function card
function toggleDescription(element) {
  // Find the description div inside the clicked element
  const desc = element.querySelector(".func-desc");

  // Toggle the 'visible' class
  if (desc) {
    // Close any other open descriptions (optional - uncomment if you want only one open at a time)
    // document.querySelectorAll('.func-desc.visible').forEach(openDesc => {
    //     if (openDesc !== desc) {
    //         openDesc.classList.remove('visible');
    //     }
    // });

    desc.classList.toggle("visible");

    // Add a small visual feedback
    if (desc.classList.contains("visible")) {
      element.style.backgroundColor = "#1f5a6f";
    } else {
      element.style.backgroundColor = "";
    }
  }
}

// Optional: Add keyboard accessibility (Enter key)
document.querySelectorAll(".func-item").forEach((item) => {
  item.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDescription(item);
    }
  });
});