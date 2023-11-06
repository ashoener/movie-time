const newFormHandler = async (event) => {
    event.preventDefault();
}

if (username && password) {
    let timeline;
        await fetch("/api/timeline/2023?genres=Action,Comedy")
        .then((res) => res.json)
        .then((data) => {
            timeline = new TouchList.Timeline("div-id", data);
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to load timeline');
        }
};

document.querySelector('.timeline-form');
document.addEventListener('submit', newFormHandler);