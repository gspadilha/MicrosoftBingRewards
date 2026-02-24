/**
 * A single search button.
 *
 * Props:
 *  - label     {string}   Button text / identifier.
 *  - clicked   {boolean}  Whether it has been manually/auto clicked (green class).
 *  - autoCycled {boolean} Whether triggered by the auto-cycle (red border override).
 *  - onClick   {() => void}
 */
export default function SearchButton({ label, clicked, autoCycled, onClick }) {
  const className = ["buttonNormal", clicked ? "buttonClick" : ""]
    .filter(Boolean)
    .join(" ");
  const style = autoCycled ? { border: "2px solid red" } : undefined;

  return (
    <button type="button" className={className} style={style} onClick={onClick}>
      {label}
    </button>
  );
}
