import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieView from './MovieView';
import LoginView from '../login/login';
import SignInView from '../signIn/signIn';
import { Row, Col, Container, Navbar, Button, Image } from 'react-bootstrap';
import "../../index.scss"


function MainView() {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
	  const [movies, setMovies] = useState([]);
	  const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    const LoginSignInView = ({ onLoggedIn }) => {
      return (
          <>
              <div className="wrapper">
                  <Image src={cover} className="mt-3" height="80" />
                  <Row className="justify-content-center" >
                      <Col> <SignInView /></Col>
                      <Col><LoginView onLoggedIn={onLoggedIn} /></Col>
                  </Row>
              </div>
          </>
      );
  };

  
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location.reload();
};

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
              <LoginSignInView
                  onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                  }}
              />
          );
      }

      if (selectedMovie) {
        return (
            <> <Navbar fluid className="color-nav mb-4" expand="lg">
                <Container fluid className='justify-content-start'>
                    <Button variant="warning" size="sm" onClick={() => setSelectedMovie(null)}>Back</Button>
                    <Navbar.Text className="text-nav">Movie</Navbar.Text>
                </Container>
            </Navbar>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <MovieView
                            selectedMovie={selectedMovie}
                        />
                    </Col>
                </Row>
            </>
        );
    }

    return (
        <>
            <Navbar className="color-nav mb-4" expand="lg">
                <Container fluid>
                    <Navbar.Text className="text-nav">Movie</Navbar.Text>
                    <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
                </Container>
            </Navbar>
            <Row className="justify-content-md-center">
                {movies.map((movie) => (

                    <Col className="mb-5" key={movie.id} md="auto">
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );

};

export default MainView;