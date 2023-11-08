const remove = document.querySelector(".saved-container");

remove.addEventListener("click", async (e) => {
  if (!e.target.matches(".footer button")) return;
  const endpoint = "/api/user/saved-movies/" + e.target.dataset.movie;
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.reload();
  } else {
    const data = await response.json();
    renderErrors(data.errors);
  }
});
