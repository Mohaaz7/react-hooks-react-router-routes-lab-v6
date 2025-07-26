import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

function Directors() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/directors')
      .then((r) => r.json())
      .then(setDirectors);
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Directors Page</h1>
      {directors.map((director) => (
        <article key={director.name}>
          <h2>{director.name}</h2>
          <ul>
            {director.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default Directors;
