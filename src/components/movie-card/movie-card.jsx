import PropTypes from 'prop-types';
import { Card, CardImg } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick}) => {
    return <>
    <Card className='movieCard' onClick={() => {
        onMovieClick(movie);
    }}>
        <CardImg src={movie.image} width={150} height={180} alt="ImgMovie"></CardImg>
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
        </Card.Body>
    </Card>
</>
}

MovieCard.propTypes = {
movie: PropTypes.shape({
    title: PropTypes.string,
}).isRequired,
onMovieClick: PropTypes.func.isRequired
};

