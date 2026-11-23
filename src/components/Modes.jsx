// Selector tipo "píldora" (como en la web de ejemplo): la pastilla oscura se desliza a la opción activa.
export default function Modes({ options, value, onChange, label, className = "" }) {
  const n = options.length;
  const i = Math.max(0, options.findIndex(([k]) => k === value));
  return (
    <div className={`modes ${className}`} role="group" aria-label={label}>
      <span
        className="modes__pill"
        aria-hidden="true"
        style={{ width: `calc((100% - 6px) / ${n})`, transform: `translateX(${i * 100}%)` }}
      />
      {options.map(([k, l]) => (
        <button key={k} type="button" aria-pressed={value === k} onClick={() => onChange(k)}>
          {l}
        </button>
      ))}
    </div>
  );
}
