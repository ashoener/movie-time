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

document
  .querySelector(".timeline-form")
  .addEventListener("submit", newFormHandler);

document.addEventListener("click", async (e) => {
  if (!e.target.matches(".save-movies-btn")) return;
  const response = await fetch("/api/user/saved-movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie_id: e.target.dataset.movie,
    }),
  });
  if (response.ok) {
    alert("Successfully saved movie to list.");
  } else {
    const data = await response.json();
    alert(`Error: ${data.errors[0]}`);
  }
});
