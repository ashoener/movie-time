const errorsContainer = document.getElementById("errors");
const successContainer = document.getElementById("success");
function renderErrors(errors) {
  successContainer.classList.add("d-none");
  if (!errors.length) return;
  errorsContainer.innerHTML = ""; // clear the errors container
  errors.forEach((error) => {
    // for each error, create a new div and append it to the errors container
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.innerText = error;
    errorsContainer.appendChild(errorDiv);
  });
  errorsContainer.classList.remove("d-none");
  document.body.scrollTop = 0;
}

function renderSuccess(message) {
  errorsContainer.classList.add("d-none");
  if (!message || !message.length) return;
  successContainer.innerHTML = ""; // clear the success container
  const successDiv = document.createElement("div");
  successDiv.classList.add("alert", "alert-success");
  successDiv.innerText = message;
  successContainer.appendChild(successDiv);
  successContainer.classList.remove("d-none");
  document.body.scrollTop = 0;
}
