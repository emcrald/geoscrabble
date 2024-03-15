sections = document.getElementsByClassName("section")

function switchSection(newSectionId) {

    for (var i = 0; i < sections.length; i++) {
        section = sections[i]
        if (section.id === newSectionId) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }
}
switchSection("main")


function startGame() {
    switchSection("game")
    fetchRandomImage()
}

function setRandomImage(countryName) {
    const randomImageElement = document.getElementById("countryImage");
    randomImageElement.src = `${countryName}`;
}

function fetchRandomImage() {
    fetch('https://geoscrabble.netlify.app/randomImage')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(countryName => setRandomImage(countryName))
        .catch(error => console.error('Error fetching random image:', error));
}