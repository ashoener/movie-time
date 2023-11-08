const remove = document.querySelector('.footer');

remove.addEventListener('click', (e) => {
    const endpoint = '/api/user/saved-movies';
    fetch(endpoint, {
        method: 'DELETE'
    })
    .then((response) => response.json()) 
    .then((data => console.log(data)))
    .catch(err => console.log(err));
});