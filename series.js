// Example Data Structure
const seriesData = {
    title: "Young Sheldon",
    seasons: [
        {
            season: 1,
            episodes: [
                { title: "Episode 1", description: "", thumbnail: "Series/Young Sheldon/ep1.jpg" },
                { title: "Episode 2", description: "", thumbnail: "Series/Young Sheldon/ep2.jpg" },
            ]
        },
        {
            season: 2,
            episodes: [
                { title: "Episode 1", description: "Episode 1 description", thumbnail: "ep3.jpg" },
                { title: "Episode 2", description: "Episode 2 description", thumbnail: "ep4.jpg" },
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadSeasons();
    loadEpisodes(0); // Load the first season's episodes by default
});

function loadSeasons() {
    const seasonButtonsContainer = document.getElementById('season-buttons');
    seasonButtonsContainer.innerHTML = ''; // Clear any existing buttons

    seriesData.seasons.forEach((seasonData, index) => {
        const button = document.createElement('button');
        button.textContent = `Season ${seasonData.season}`;
        button.onclick = () => loadEpisodes(index);
        if (index === 0) button.classList.add('active');
        seasonButtonsContainer.appendChild(button);
    });
}

// Function to load episodes for a specific season
function loadEpisodes(seasonIndex) {
    const episodesList = document.getElementById('episodes-list');
    episodesList.innerHTML = ''; // Clear current episodes

    const selectedSeason = seriesData.seasons[seasonIndex];

    selectedSeason.episodes.forEach((episode, episodeIndex) => {
        const episodeElement = document.createElement('div');
        episodeElement.classList.add('episode');

        // Episode link
        const episodeLink = document.createElement('a');
        episodeLink.href = `episode.html?season=${seasonIndex + 1}&episode=${episodeIndex + 1}`; // Link to episode page with query parameters

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

        // Append elements to link, then to episode element
        episodeLink.appendChild(thumbnail);
        episodeLink.appendChild(episodeInfo);
        episodeElement.appendChild(episodeLink);

        episodesList.appendChild(episodeElement);
    });
}



