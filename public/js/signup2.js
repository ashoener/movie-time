const signUp = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordConfirm = document
    .querySelector("#password-confirm-signup")
    .value.trim();

  if (password !== passwordConfirm) {
    return renderErrors(["Passwords must match"]);
  }

  if (username && password) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json " },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace("/timeline");
      }, 500);
    } else {
      const data = await response.json();
      renderErrors(data.errors);
    }
  }
};

document.querySelector(".signup-form").addEventListener("submit", signUp);
