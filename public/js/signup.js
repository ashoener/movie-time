const signUp = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json '},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Sign up failed.');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signUp);