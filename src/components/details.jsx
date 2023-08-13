import React, { useState, useEffect } from "react";
import Star from "./star";
import Error from "./error";

const myApiKey = "e9e9bdef";

export default function Details({
  imdbID,
  setWatched,
  setDetailIsOpen,
  watched,
  setCurrImdbId,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const isWatched = watched.map((m) => m.imdbID).includes(movie.imdbID);
  const currentWatchedMovie = watched.find((mov) => mov.imdbID === imdbID);

  function handleAddWatched() {
    const newWatchedMovie = { ...movie, userRating: rating };
    setWatched((curr) => [...curr, newWatchedMovie]);
    setDetailIsOpen(false);
    setRating(0);
    setCurrImdbId("");
  }

  function handleClosseDetails() {
    setDetailIsOpen(false);
    setCurrImdbId("");
  }

  useEffect(
    function () {
      async function getMovie() {
        setError("");
        setIsLoading(true);
        try {
          const url = `http://www.omdbapi.com/?apikey=${myApiKey}&i=${imdbID}`;
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Failed to load movies");
          }
          const data = await res.json();
          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }
      getMovie();
    },
    [imdbID]
  );

  return (
    <div className="details loading-screen">
      {error ? (
        <Error message={error} />
      ) : isLoading ? (
        <>
          <header>
            <button className="btn-back" onClick={handleClosseDetails}>
              &larr;
            </button>
            <div className="img"></div>
            <div className="details-overview loading">
              <h2>""</h2>
              <p>.</p>
              <p>.</p>
              <p>.</p>
            </div>
          </header>
          <section className="loading">
            <div className="rating">
              {!isWatched ? (
                <>
                  <div className="loading"></div>
                  {rating !== 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie
                  <span style={{ marginLeft: "10px" }}>
                    {currentWatchedMovie?.userRating || ""} ⭐
                  </span>
                </p>
              )}
            </div>
            <p className="plot">""</p>
            <p>""</p>
            <p>""</p>
          </section>
        </>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClosseDetails}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} • {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Star handleSetState={setRating} />
                  {rating !== 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie
                  <span style={{ marginLeft: "10px" }}>
                    {currentWatchedMovie?.userRating || ""} ⭐
                  </span>
                </p>
              )}
            </div>
            <p>{movie.Plot}</p>
            <p>Starring {movie.Actors}</p>
            <p>{movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
