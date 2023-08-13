export default function MovieList({
  movie,
  setCurrImdbId,
  setDetailIsOpen,
  currImdbId,
}) {
  function handleOnClick() {
    if (movie.imdbID === currImdbId) {
      setDetailIsOpen(false);
      setCurrImdbId("");
      return;
    }
    setCurrImdbId(movie.imdbID);
    setDetailIsOpen(true);
  }
  return (
    <li onClick={handleOnClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
