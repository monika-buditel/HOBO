const seriesData = {
    title: "Series Title",
    seasons: [
        {
            seasonNumber: 1,
            episodes: [
                { title: "Episode 1", description: "", thumbnail: "Series/Young Sheldon/ep1.jpg", videoUrl: "https://archive.org/embed/young.-sheldon.-s-01.-complete.-720p.-blu-ray.x-264-galaxy-tv-s-1" },
                { title: "Episode 2", description: "", thumbnail: "Series/Young Sheldon/ep2.jpg", videoUrl: "https://archive.org/embed/young.-sheldon.-s-01.-complete.-720p.-blu-ray.x-264-galaxy-tv-s-1" }
            ]
        }
    ]
};

function loadEpisodeDetails() {
    const params = new URLSearchParams(window.location.search);
    const seasonNumber = parseInt(params.get("season")) - 1;
    const episodeNumber = parseInt(params.get("episode")) - 1;

    const seasonData = seriesData.seasons[seasonNumber];
    const episodeData = seasonData.episodes[episodeNumber];

    if (episodeData) {
        // Set episode details
        document.getElementById("episode-title").textContent = episodeData.title;
        document.getElementById("episode-thumbnail").src = episodeData.thumbnail;
        document.getElementById("episode-thumbnail").alt = episodeData.title;
        document.getElementById("episode-description").textContent = episodeData.description;
        document.getElementById("episode-video").src = episodeData.videoUrl;

        // Load episode list
        loadEpisodeList(seasonData, episodeNumber);
    } else {
        document.getElementById("episode-title").textContent = "Episode not found";
        document.getElementById("episode-description").textContent = "Sorry, we couldn't find this episode.";
    }
}

function loadEpisodeList(seasonData, currentEpisodeIndex) {
    const episodeList = document.getElementById("episode-list");
    episodeList.innerHTML = ""; // Clear current list

    seasonData.episodes.forEach((episode, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = episode.title;
        listItem.classList.toggle("active", index === currentEpisodeIndex);

        listItem.addEventListener("click", () => {
            // Navigate to the new episode
            const url = `episode.html?season=${seasonData.seasonNumber}&episode=${index + 1}`;
            window.location.href = url;
        });

        episodeList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", loadEpisodeDetails);
