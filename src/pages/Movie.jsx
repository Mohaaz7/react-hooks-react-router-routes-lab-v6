import { useParams } from "react-router-dom";
import movies from "../data"; // or wherever your movie data comes from

function Movie() {
  const { id } = useParams();

  // Convert string to number if id is numeric
  const movie = movies.find((m) => String(m.id) === id);

  // Show a fallback if movie not found
  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.time} minutes</p>
      {/* Ensure genres exists before mapping */}
      {Array.isArray(movie.genres) && movie.genres.map((genre, index) => (
        <span key={index}>{genre} </span>
      ))}
    </div>
  );
}

export default Movie;
