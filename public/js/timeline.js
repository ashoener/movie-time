let timeline;
const loadingSpinner = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
const yearElem = document.getElementById("year");
const genreElem = document.getElementById("genre");
const submitButton = document.querySelector(".timeline-form button");
const newFormHandler = async (event) => {
  event.preventDefault();
  const prevHtml = submitButton.innerHTML;
  submitButton.innerHTML = loadingSpinner;
  const response = await fetch(
    `/api/timeline/${yearElem.value}?genres=${encodeURIComponent(
      genreElem.value
    )}`
  );

  if (response.ok) {
    const data = await response.json();
    timeline = new TL.Timeline("timeline", data);
    submitButton.innerHTML = prevHtml;
    // document.location.replace("/");
  } else {
    submitButton.innerHTML = prevHtml;
    renderErrors(["Failed to load timeline"]);
  }
};

document
  .querySelector(".timeline-form")
  .addEventListener("submit", newFormHandler);

document.addEventListener("click", async (e) => {
  if (!e.target.matches(".save-movies-btn")) return;
  const prevHtml = e.target.innerHTML;
  e.target.innerHTML = loadingSpinner;
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
    e.target.innerText = "Saved to list";
    renderSuccess();
  } else {
    e.target.innerHTML = prevHtml;
    const data = await response.json();
    renderErrors(data.errors);
  }
});
