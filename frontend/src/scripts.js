document.addEventListener('DOMContentLoaded', () => {
    showHomePage();
});

function showHomePage() {
    document.getElementById('main-content').innerHTML = `
        <h2>Home</h2>
        <div class="movie-list" id="movie-list">
            <!-- Movies will be loaded here -->
        </div>
    `;
    loadMovies();
}

function showTitleView(id) {
    fetch(`http://www.omdbapi.com/?apikey=ccf56e50&i=${id}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('main-content').innerHTML = `
                <h2>${movie.Title}</h2>
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <p>${movie.Plot}</p>
                <p><strong>Rating:</strong> ${movie.imdbRating}</p>
                <button onclick="showHomePage()">Back to Home</button>
            `;
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function showUserProfile() {
    document.getElementById('main-content').innerHTML = `
        <h2>User Profile</h2>
        <p>Account information and user preferences go here.</p>
    `;
}

function loadMovies() {
    fetch('http://www.omdbapi.com/?apikey=ccf56e50&s=movie')
        .then(response => response.json())
        .then(data => {
            const movies = data.Search;
            let movieListHtml = '';
            movies.forEach(movie => {
                movieListHtml += `
                    <div class="movie-item" data-id="${movie.imdbID}">
                        <img src="${movie.Poster}" alt="${movie.Title}" />
                        <h3>${movie.Title}</h3>
                    </div>
                `;
            });
            document.getElementById('movie-list').innerHTML = movieListHtml;
            attachMovieItemEventListeners();
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function attachMovieItemEventListeners() {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            showTitleView(id);
        });
    });
}
