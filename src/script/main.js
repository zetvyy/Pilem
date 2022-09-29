const main = () => {
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "3145fdc7c5e2c3d105249fb378be348d";

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/trending/movie/day?api_key=${apiKey}`
      );
      const responseJson = await response.json();

      if (responseJson.error) {
        showResponseMessage();
      } else {
        renderTrendingMovies(responseJson.results);
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/movie/top_rated?api_key=${apiKey}`
      );
      const responseJson = await response.json();

      if (responseJson.error) {
        showResponseMessage();
      } else {
        renderTopMovies(responseJson.results);
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const searchMovie = () => {
    const searchButton = document.querySelector(".btn_search");
    searchButton.addEventListener("click", async () => {
      try {
        const inputValue = document.querySelector(".search_input").value;

        const response = await fetch(
          `${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}`
        );
        const responseJson = await response.json();

        if (responseJson.error) {
          showResponseMessage();
        } else {
          renderSearchedMovies(responseJson.results);
        }
      } catch (error) {
        showResponseMessage(error);
      }
    });
  };

  const getDetailMovie = () => {
    document.addEventListener("click", async (e) => {
      try {
        if (e.target.classList.contains("btn_detail")) {
          const movieId = e.target.id;
          const response = await fetch(
            `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
          );
          const responseJson = await response.json();

          if (responseJson.error) {
            showResponseMessage();
          } else {
            renderModalDetail(responseJson);
          }
        }
      } catch (error) {
        showResponseMessage(error);
      }
    });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  const renderSearchedMovies = (movies) => {
    const listMovies = document.querySelector("#listSearchedMovie");
    listMovies.innerHTML = "";

    movies.forEach((movie) => {
      listMovies.innerHTML += cardContent(movie);
    });
  };

  const renderTrendingMovies = (movies) => {
    const listMovies = document.querySelector("#listMovie");
    listMovies.innerHTML = "";

    movies.forEach((movie) => {
      listMovies.innerHTML += cardContent(movie);
    });
  };

  const renderTopMovies = (movies) => {
    const listMovies = document.querySelector("#listTopMovie");
    listMovies.innerHTML = "";

    movies.forEach((movie) => {
      listMovies.innerHTML += cardContent(movie);
    });
  };

  const renderModalDetail = (movies) => {
    const movieDetail = modalContent(movies);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = movieDetail;
  };

  const cardContent = (movie) => {
    return `
    <div class="col-md-4 mb-5 mr-3 d-flex justify-content-center">
    <div class="card" style="width: 18rem;">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <strong>Release : </strong>${movie.release_date}
        </p>
        <button type="button" class="btn btn-primary btn_detail" data-bs-toggle="modal" 
        data-bs-target="#movieDetailModal" id=${movie.id}>Movie Detail</button>
      </div>
      </div>
    </div>
  
    `;
  };

  const modalContent = (movies) => {
    return `
    <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/w500${movies.poster_path}" class="img-fluid" />
                    </div>
                    <div class="col">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${movies.title}</h4></li>
                        <li class="list-group-item"><h5>${movies.tagline}</h5></li>
                        <li class="list-group-item"><strong>Release Date : </strong>${movies.release_date}</li>
                        <li class="list-group-item"><strong>Runtime : </strong>${movies.runtime} minutes</li>
                        <li class="list-group-item"><strong>Plot : </strong><br />${movies.overview}</li>
                        </ul>
                    </div>
                </div>
            </div>
    `;
  };

  document.addEventListener("DOMContentLoaded", () => {
    searchMovie();
    getTrendingMovies();
    getTopRatedMovies();
    getDetailMovie();
  });
};

export default main;
