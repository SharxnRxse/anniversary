// =======================
// 💕 DAYS TOGETHER COUNTER
// =======================
// =======================
// 💕 YEARS, MONTHS & DAYS TOGETHER (Separate Boxes)
// =======================
const startDate = new Date(2022, 3, 29); // (YYYY, MM - 1, DD) → April = 3

function calculateTogetherTime() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function updateTogetherBoxes() {
  const { years, months, days } = calculateTogetherTime();

  const yearsEl = document.getElementById("years");
  const monthsEl = document.getElementById("months");
  const daysEl = document.getElementById("days");

  if (yearsEl) yearsEl.textContent = years;
  if (monthsEl) monthsEl.textContent = months;
  if (daysEl) daysEl.textContent = days;
}

document.addEventListener("DOMContentLoaded", () => {
  updateTogetherBoxes();
  setInterval(updateTogetherBoxes, 1000 * 60 * 60 * 24); // update daily
});

// =======================
// 🔊 AUTOBOTS ROLL OUT BUTTON
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const rolloutBtn = document.getElementById("rollout-btn");
  if (!rolloutBtn) return;

  const rolloutSound = new Audio("photos/rollout.mp3");
  rolloutBtn.addEventListener("click", () => {
    rolloutSound.currentTime = 0; // restart if clicked again
    rolloutSound.play().catch(err => console.log("Rollout sound blocked:", err));
  });
});

// =======================
// 🎵 BACKGROUND MUSIC + MUTE / UNMUTE
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  if (!bgMusic || !musicToggle) return;

  // Autoplay after first user click (browsers block audio)
  document.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
    }
  }, { once: true });

  // Toggle mute/unmute
  musicToggle.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted;
    musicToggle.textContent = bgMusic.muted ? "🔊 Unmute" : "🔇 Mute";
  });
});

// =======================
// CAROUSEL – ONE IMAGE AT A TIME + SMOOTH INFINITE LOOP
// =======================
let currentIndex = 0;
const track = document.getElementById("carouselTrack");

if (track) {
  const items = track.querySelectorAll(".gallery-item");
  const totalItems = items.length;

  function updateCarousel(instant = false) {
    if (instant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.10s ease-in-out';
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Force browser to apply the none transition immediately
    void track.offsetWidth;

    // Restore smooth transition right after
    if (instant) {
      setTimeout(() => {
        track.style.transition = 'transform 0.10s ease-in-out';
      }, 10);
    }
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalItems) {
      currentIndex = 0;
      updateCarousel(true);     // instant reset
    } else {
      updateCarousel();
    }
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalItems - 1;
      updateCarousel(true);     // instant reset
    } else {
      updateCarousel();
    }
  }

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  // Auto-slide every 10 seconds
  let autoTimer = setInterval(nextSlide, 10000);

  // Pause on hover
  const container = document.querySelector(".carousel-container");
  if (container) {
    container.addEventListener("mouseenter", () => clearInterval(autoTimer));
    container.addEventListener("mouseleave", () => {
      autoTimer = setInterval(nextSlide, 10000);
    });
  }

  // Reset timer after manual navigation
  document.querySelector(".prev")?.addEventListener("click", () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 10000);
  });
  document.querySelector(".next")?.addEventListener("click", () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 10000);
  });

  // Initial position (no animation)
  updateCarousel(true);
}
// =======================
// 📝 NOTES SECTION
// =======================
const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("loveNotes")) || [];
  notesList.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

addNoteBtn.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (text) {
    const notes = JSON.parse(localStorage.getItem("loveNotes")) || [];
    notes.push(text);
    localStorage.setItem("loveNotes", JSON.stringify(notes));
    noteText.value = "";
    loadNotes();
  }
});

document.addEventListener("DOMContentLoaded", loadNotes);