import { memo } from "react";

import SearchButton from "./SearchButton";

/**
 * Renders a grid of SearchButton elements.
 *
 * Props:
 *  - labels     {string[]}       Ordered list of button labels.
 *  - clicked    {Set<string>}    Labels that have been clicked.
 *  - autoCycled {Set<string>}    Labels triggered by auto-cycle.
 *  - onClick    {(label: string) => void}
 */
const ButtonGrid = memo(function ButtonGrid({ labels, clicked, autoCycled, onClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {labels.map((label) => (
        <SearchButton
          key={label}
          label={label}
          clicked={clicked.has(label)}
          autoCycled={autoCycled.has(label)}
          onClick={onClick}
        />
      ))}
    </div>
  );
});
export default ButtonGrid;
