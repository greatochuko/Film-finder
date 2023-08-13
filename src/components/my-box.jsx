export default function MyBox({ isOpen, setIsOpen, children }) {
  return (
    <div className="my-box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {children}
    </div>
  );
}
