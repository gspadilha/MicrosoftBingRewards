import SearchButton from "./SearchButton";

const COLUMNS = 6;

/**
 * Renders a grid of SearchButton elements.
 *
 * Props:
 *  - labels     {string[]}       Ordered list of button labels.
 *  - clicked    {Set<string>}    Labels that have been clicked.
 *  - autoCycled {Set<string>}    Labels triggered by auto-cycle.
 *  - onCLick    {(label: string) => void}
 */
export default function ButtonGrid({ labels, clicked, autoCycled, onClick }) {
  return (
    <div className="button-grid">
      {labels.map((label, i) => (
        <span key={label}>
          <SearchButton
            label={label}
            clicked={clicked.has(label)}
            autoCycled={autoCycled.has(label)}
            onClick={() => onClick(label)}
          />
          {(i + 1) % COLUMNS === 0 && <br />}
        </span>
      ))}
    </div>
  );
}
