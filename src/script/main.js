import "./components/modal-detail.js";

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

  const cardContent = (movie) => {
    return `
    <div class="col-md-4 mb-5 mr-3 d-flex justify-content-center">
    <div class="card" style="width: 18rem;">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          ${movie.overview}
        </p>
        <a href="#" class="btn btn-primary btn_detail" id="btn_detail">Movie Detail</a>
      </div>
      </div>
    </div>
  
    `;
  };

  const showDetailMovie = () => {
    document.addEventListener("click", (e) => {
      const buttonDetail = e.target;

      if (e.target.classList.contains("btn_detail")) {
        buttonDetail.addEventListener("click", () => {
          const modal = document.createElement("modal-component");
          document.appendChild(modal);
        });
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    searchMovie();
    getTrendingMovies();
    getTopRatedMovies();
    showDetailMovie();
  });
};

export default main;
