import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState ([
        {
            id: 1,
            Title: 'The Shawshank Redemption',
            Description: 'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didnt commit the crimes. ',
            Genre: 'Drama',
            Director: 'Frank Darabont',
            ImageURL: 'https://www.themoviedb.org/t/p/original/tNf2OIGrOfHh4j3VvMvKceIDoix.jpg',
            Year: '1994'
        },
        {
            id: 2,
            Title: 'Fight Club',
            Description: 'A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed.',
            Genre: 'Drama',
            Director: 'David Fincher',
            ImageURL: 'https://www.themoviedb.org/t/p/original/wlmGPHDbnOK4AwL37m6tegxO8A3.jpg',
            Year: '1999'
        },
        {
            id: 3,
            Title: 'The Lord of the Rings: The Fellowship of the Ring',
            Description: 'The first adventure in The Lord of the Rings trilogy!',
            Genre: 'Adventure',
            Director: 'Peter Jackson',
            ImageURL: 'https://www.themoviedb.org/t/p/original/mm1NV8GdBvlzI1xI590p3CvJMOJ.jpg',
            Year: '2001'
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};