const loginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
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

document.querySelector(".login-form").addEventListener("submit", loginForm);
