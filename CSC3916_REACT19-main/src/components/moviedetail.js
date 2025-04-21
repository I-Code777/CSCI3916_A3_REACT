import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Spinner } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const { selectedMovie, loading, error } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  return <DetailInfo loading={loading} error={error} selectedMovie={selectedMovie} />;
};

const DetailInfo = ({ loading, error, selectedMovie }) => {
  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedMovie) {
    return <div>No movie data available.</div>;
  }

  return (
    <Card className="bg-dark text-dark p-4 rounded">
      <Card.Header>Movie Detail</Card.Header>
      <Card.Body>
        <Image
          className="image"
          src={selectedMovie.imageUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
          thumbnail
        />
      </Card.Body>
      <ListGroup>
        <ListGroupItem>{selectedMovie.title}</ListGroupItem>
        <ListGroupItem>
          {selectedMovie.actors && selectedMovie.actors.map((actor, i) => (
            <p key={i}>
              <b>{actor.actorName}</b> as {actor.characterName}
            </p>
          ))}
        </ListGroupItem>
        <ListGroupItem>
          <h4>
            <BsStarFill /> {selectedMovie.avgRating ? selectedMovie.avgRating.toFixed(1) : 'No ratings yet'}
          </h4>
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        {selectedMovie.reviews && selectedMovie.reviews.map((review, i) => (
          <p key={i}>
            <b>{review.username}</b> {review.review} <BsStarFill /> {review.rating}
          </p>
        ))}
      </Card.Body>
    </Card>
  );
};

export default MovieDetail;
