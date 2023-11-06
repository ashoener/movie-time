let timeline;
const yearElem = document.getElementById("year");
const genreElem = document.getElementById("genre");
const newFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch(
    `/api/timeline/${yearElem.value}?genres=${encodeURIComponent(
      genreElem.value
    )}`
  );

  if (response.ok) {
    const data = await response.json();
    timeline = new TL.Timeline("timeline", data);
    // document.location.replace("/");
  } else {
    alert("Failed to load timeline");
  }
};

document.querySelector(".timeline-form");
document.addEventListener("submit", newFormHandler);
