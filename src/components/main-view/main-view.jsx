import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieView from './MovieView';
import LoginView from './LoginView';
import SignupView from './SignupView';

function MainView() {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://jacksons-movie-api.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("movies from api: ", data)
                const moviesFromAPI = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        image: movie.ImagePath,
                        description: movie.Description,
                        actors: movie.Actors,
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description,
                        },
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio,
                        },
                    };
                });
                setMovies(moviesFromAPI);
            })
            .catch((error) => {
                console.error("error fetching movies: ", error);
            });
        }, [token]);

        
    if (!user) {
        return (
            <>
            <LoginView
            onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }}
        />
        or
        <SignupView />
        </>
        );
    }

	if (selectedMovie) {
        return (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
      }
    
      if (movie.length === 0) {
        return <div>The list is empty!</div>;
      }
    
      return (
        <div>
             <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
          {movie.map((movie) => (
            <MovieCard
              key={movie._id.$oid}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
      );
    };

export default MainView;