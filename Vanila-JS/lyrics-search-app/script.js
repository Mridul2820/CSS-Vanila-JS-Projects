const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';


// Search by song or Artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// Show Song List in DOM
function showData(data) {

    result.innerHTML =  `
        <ul class="songs">
            ${data.data.map(song => `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>

                <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Get Lyrics</button>
            </li>
        ` )
        .join('')}
        </ul>
    `;

    if(data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class='btn' onClick="getMoreSongs('${data.prev}')">Prev</button>` : '' }
            ${data.next ? `<button class='btn' onClick="getMoreSongs('${data.next}')">Next</button>` : '' }
        `
    }

    else {
        more.innerHTML = '';
    }
}

// Get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); 
    const data = await res.json();

    showData(data);
}

// Event Listners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Type Something');
    }

    else {
        searchSongs(searchTerm);
    }
})

