import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const MovieView = ({ selectedMovie }) => {
    return (
        <>
            <Card style={{ maxWidth: "50rem" }}>
                <Card.Img className="img-fluid" src={selectedMovie.image} alt="movieImg" />
            </Card>
            <div className='movieDescriptionHeader'><span>Title: </span>{selectedMovie.title}</div>
            <div className='movieDescriptionHeader'><span>Director: </span > {selectedMovie.director}</div >
            <div className='movieDescriptionHeader'>{selectedMovie.directorBio}</div>
            <div className='movieDescriptionHeader'><span>Description: </span > {selectedMovie.genreDescription}</div >
            <div className='movieDescriptionHeader'>{selectedMovie.description}</div>
        </>
    )
}

MovieView.propTypes = {
    selectedMovie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string
    }).isRequired,
    onBackButtonClick: PropTypes.func.isRequired
}