const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type' : 'application/json '},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Login failed.');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginForm);
