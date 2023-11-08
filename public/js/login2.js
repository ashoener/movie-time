const loadingSpinner = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
const loginButton = document.querySelector(".login-form button");

function addButtonBurstAnimation(button) {
  button.classList.add("button-burst");

  setTimeout(() => {
    button.classList.remove("button-burst")
  }, 200);
}

const loginForm = async (event) => {
  event.preventDefault();

  const prevHtml = loginButton.innerHTML;
  loginButton.innerHTML = loadingSpinner;

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json " },
    });

    loginButton.innerHTML = prevHtml;

    if (response.ok) {
      
      addButtonBurstAnimation(loginButton);
      
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
