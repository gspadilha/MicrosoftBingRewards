/**
 * A single search button.
 *
 * Props:
 *  - label      {string}   Button text / identifier.
 *  - clicked    {boolean}  Whether it has been manually/auto clicked.
 *  - autoCycled {boolean}  Whether triggered by the auto-cycle (currently active).
 *  - onClick    {() => void}
 */
export default function SearchButton({ label, clicked, autoCycled, onClick }) {
  const base =
    "w-full px-4 py-3 text-sm font-mono font-medium rounded-lg border-0 transition-colors duration-150 cursor-pointer focus:outline-none select-none tracking-wide";

  const state = autoCycled
    ? "bg-[#3d0f0f] text-[#f85149] shadow-inner"
    : clicked
      ? "bg-[#0d2117] text-[#3fb950]"
      : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d] hover:text-[#e6edf3]";

  return (
    <button type="button" className={`${base} ${state}`} onClick={onClick}>
      {label}
    </button>
  );
}
