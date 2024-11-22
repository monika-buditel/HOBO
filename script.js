// Select all sliders
const sliders = document.querySelectorAll('.category-slider');

// Add event listener to each slider for basic drag-to-scroll functionality
sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadSeasons();
    loadEpisodes(0); // Load the first season's episodes by default
});

// Function to load the season buttons
function loadSeasons() {
    const seasonButtonsContainer = document.getElementById('season-buttons');
    seasonButtonsContainer.innerHTML = ''; // Clear existing buttons

    seriesData.seasons.forEach((season, index) => {
        const button = document.createElement('button');
        button.textContent = `Season ${season.seasonNumber}`;
        button.classList.add('season-button');
        button.onclick = () => loadEpisodes(index); // Load episodes for the selected season
        seasonButtonsContainer.appendChild(button);
    });
}

// Function to load episodes for a specific season
function loadEpisodes(seasonIndex) {
    const episodesList = document.getElementById('episodes-list');
    episodesList.innerHTML = ''; // Clear current episodes

    const selectedSeason = seriesData.seasons[seasonIndex];

    selectedSeason.episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.classList.add('episode');

        // Episode thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = episode.thumbnail;
        thumbnail.alt = episode.title;
        thumbnail.classList.add('episode-thumbnail');

        // Episode details
        const episodeInfo = document.createElement('div');
        episodeInfo.classList.add('episode-info');

        const title = document.createElement('h4');
        title.textContent = episode.title;

        const description = document.createElement('p');
        description.textContent = episode.description;

        episodeInfo.appendChild(title);
        episodeInfo.appendChild(description);
        episodeElement.appendChild(thumbnail);
        episodeElement.appendChild(episodeInfo);

        episodesList.appendChild(episodeElement);
    });
}

// Series Data: Store episodes organized by seasons
const seriesData = {
    title: "Series Title",
    seasons: [
        {
            seasonNumber: 1,
            episodes: [
                {
                    title: "Episode 1",
                    description: "The beginning of an epic journey.",
                    thumbnail: "Series/Young Sheldon/ep1.jpg"
                },
                {
                    title: "Episode 2",
                    description: "Things get more interesting as challenges arise.",
                    thumbnail: "Series/Young Sheldon/ep2.jpg"
                },
                // Add more episodes as needed
            ]
        },
        {
            seasonNumber: 2,
            episodes: [
                {
                    title: "Episode 1",
                    description: "New season, new conflicts and friendships.",
                    thumbnail: "Series/Young Sheldon/ep1.jpg"
                },
                {
                    title: "Episode 2",
                    description: "An unexpected twist changes everything.",
                    thumbnail: "Series/Young Sheldon/ep2.jpg"
                },
                // Add more episodes as needed
            ]
        }
        // Add more seasons as needed
    ]
};
