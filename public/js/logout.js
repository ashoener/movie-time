const logoutButton = document.querySelector('a[href="/logout"]');

logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/user/logout", { method: "GET" });
  if (res.ok) {
    // if the response is ok, redirect to the home page
    location.href = "/";
  } else {
    // if the response is not ok, render the errors
    const error = await res.json();
    renderErrors(error.errors);
  }
});
