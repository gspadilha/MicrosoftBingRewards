import { memo } from "react";

/**
 * Pause/Resume/Concluído control button.
 *
 * Props:
 *  - finished  {boolean}    Whether the cycle has completed.
 *  - paused    {boolean}    Whether auto-cycle is currently paused.
 *  - onToggle  {() => void} Called when the button is clicked.
 */
const ControlButton = memo(function ControlButton({ finished, paused, onToggle }) {
  return (
    <button
      onClick={onToggle}
      disabled={finished}
      className={`w-full mb-4 py-3 rounded-lg font-semibold text-sm transition-colors border ${
        finished
          ? "bg-[#1f2d1f] border-[#3fb950] text-[#3fb950] cursor-default opacity-75"
          : paused
          ? "bg-[#1f2d1f] border-[#3fb950] text-[#3fb950] hover:bg-[#243024]"
          : "bg-[#2d1f1f] border-[#f85149] text-[#f85149] hover:bg-[#3a2424]"
      }`}
    >
      {finished ? "✓ Execução concluída" : paused ? "▶ Retomar execução" : "⏸ Pausar execução"}
    </button>
  );
});
export default ControlButton;
