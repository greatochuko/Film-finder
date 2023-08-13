export default function WatchedList({ watched, setWatched, setCurrImdbId }) {
  function handleDelete(imdbID) {
    setWatched((curr) => curr.filter((m) => m.imdbID !== imdbID));
  }

  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime}</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(movie.imdbID)}
            >
              x
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
