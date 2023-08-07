import PropTypes from 'prop-types';

function MovieView({ movie, onBackClick }) {
	return (
		<div>
			<div>
				<img src={movie.image} className='movie-img' />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre.name}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.director.name}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
}

// Define the prop types this component should have
MovieView.propTypes = {
	movie: PropTypes.shape({
		image: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string.isRequired,
		genre: PropTypes.shape({
			name: PropTypes.string,
		}),
		director: PropTypes.shape({
			name: PropTypes.string,
		}),
	}).isRequired,
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;