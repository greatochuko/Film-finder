import Navbar from "./navbar";
import MyBox from "./my-box";
import MovieList from "./movie-list";
import Box from "./box";
import Details from "./details";
import Summary from "./summary";
import WatchedList from "./watched-list";
import { useEffect, useState } from "react";

// import mongoose, { Schema } from "mongoose";

// const watchedSchema = new Schema({});

const myApiKey = "e9e9bdef";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [currImdbId, setCurrImdbId] = useState("");
  const [detailsIsOpen, setDetailIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function search() {
        setError("");
        setIsLoading(true);
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&s=${query}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to load movies");
        }
        const data = await res.json();
        if (!data.Search) {
          setError(data.Error);
          return;
        }
        setMovies(data.Search);
        setIsLoading(false);
      }
      if (query.length < 3) {
        setMovies([]);
      }
      if (query.length >= 3) {
        search();
      }
    },
    [query]
  );

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />

      <main className="main">
        <Box
          isOpen={isOpen1}
          setIsOpen={setIsOpen1}
          movies={movies}
          isLoading={isLoading}
          error={error}
        >
          {movies.map((movie) => (
            <MovieList
              movie={movie}
              key={movie.imdbID}
              setCurrImdbId={setCurrImdbId}
              setDetailIsOpen={setDetailIsOpen}
              currImdbId={currImdbId}
            />
          ))}
        </Box>
        <MyBox isOpen={isOpen2} setIsOpen={setIsOpen2} watched={watched}>
          {detailsIsOpen ? (
            <Details
              imdbID={currImdbId}
              setWatched={setWatched}
              setDetailIsOpen={setDetailIsOpen}
              watched={watched}
              setCurrImdbId={setCurrImdbId}
            />
          ) : (
            isOpen2 && (
              <>
                <Summary watched={watched} />{" "}
                <WatchedList
                  watched={watched}
                  setWatched={setWatched}
                  setCurrImdbId={setCurrImdbId}
                />
              </>
            )
          )}
        </MyBox>
      </main>
    </>
  );
}
