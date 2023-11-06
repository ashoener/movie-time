let timeline;
const newFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/timeline/2023?genres=Action,Comedy");

  if (response.ok) {
    const data = await response.json();
    timeline = new TL.Timeline("timeline", data);
    // document.location.replace("/");
  } else {
    alert("Failed to load timeline");
  }
};

document.querySelector(".timeline-form");
document.addEventListener("submit", newFormHandler);
