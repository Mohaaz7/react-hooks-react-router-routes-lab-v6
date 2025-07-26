import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <h2>{movie.title}</h2>
      </Link>
    </div>
  );
}

export default MovieCard;
