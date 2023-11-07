let saved;
const newFormHandler = async (event) => {
    event.preventDefault();
    const save = await fetch(`/api/savedmovies`);

    
};
document.querySelector(".card-text")