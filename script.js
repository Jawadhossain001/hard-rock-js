// selector ids:
const searchOpt = document.getElementById('search-opt');
const searchBtn = document.getElementById('search-btn');
const suggestSongList = document.getElementById('suggest-song-list');
const singleSongsLyrics = document.getElementById('single-song-lyrics');

searchBtn.addEventListener("click", getResult);

//get search result from api: 
function getResult() {
	const songsTitle = searchOpt.value;
	const api = `https://api.lyrics.ovh/suggest/${songsTitle}`;
	if (songsTitle) {
		fetch(api)
			.then((res) => res.json())
			.then((data) => {
				const apiData = data.data;
				const songsData = apiData.map((item) => item).slice(0, 10);
				if (!songsData.length) {
					suggestSongList.innerHTML = `<h3 class="text-center">Sorry! no songs found.</h3>`;
				}
				 else {
					suggestSongList.innerHTML = "";
					songsData.map((item) => {
						suggestSongList.innerHTML += `
                        <!-- single result -->
                        <div class="single-result d-flex align-items-center justify-content-between my-3 p-3">
                            <div>
                            <a href="${item.link}" target="_blank">
                                <img src="${item.album.cover}" alt="cover of ${item.album.title}">
                            </a>
                            </div>
                            <div>
                                <h3 class="lyrics-name">
                                    <a href="${item.link}" target="_blank">${item.title}</a>
                                </h3>
                                <p class="author lead">${item.album.title} by <span style="font-style: italic;" >${item.artist.name}</span>
                                </p>
                            </div>
                            <div class="text-md-right text-center">
                                <button class="btn btn-success" onclick="getLyrics('${item.artist.name}', '${item.title}', '${item.title}', '${item.artist.name}')">Get Lyrics </button>
                            </div>
                        </div>
                        <!-- ./ single result -->
                        `;
					});
				}

				searchOpt.value = "";
			});
	} 
}

// get song lyrics from api:
function getLyrics(artist, title, songsTitle, artistName) {
	const api = `https://api.lyrics.ovh/v1/${artist}/${title}`;

	fetch(api)
		.then((res) => res.json())
		.then((data) => {
            singleSongsLyrics.innerHTML = `
                <button class="btn go-back" onclick="goBack()">&lsaquo; go back</button>
                <h2 class="text-success mb-4">${artistName} - ${songsTitle}</h2>
                <pre class="lyric text-white">${!data.lyrics ? data.error : data.lyrics}</pre>`;
			suggestSongList.style.display = "none";
		});
}

// go back to search result:
function goBack() {
	suggestSongList.style.display = "block";
	singleSongsLyrics.innerHTML = "";
}