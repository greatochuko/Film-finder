import Error from "./error";

export default function Box({ setIsOpen, isOpen, isLoading, error, children }) {
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen ? (
        error ? (
          <Error message={error} />
        ) : isOpen && isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <ul className="list list-movies">{children}</ul>
        )
      ) : null}
    </div>
  );
}
