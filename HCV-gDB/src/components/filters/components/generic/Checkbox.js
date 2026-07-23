export default function Checkbox( {checked, node, onChecked, square=true }) {

  return (
    <label
        style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        }}
    >
      <input
          type="checkbox"
          checked={checked}
          onChange={() => onChecked(node.name)}
          style={{
              appearance: "none",
              padding: "4px",
              transform: "scale(0.8)",
              width: "16px",
              height: "16px",
              border: "2px solid var(--primary)",
              borderRadius: square ? "3px" : "50%",
              boxShadow: checked
                ? "inset 0 0 0 2px white"
                : "none",
              backgroundColor: checked
                ? "var(--primary)"
                : "white",
              cursor: "pointer",
          }}

      />
      <span style={{ fontSize:"12px" }}>{node.text}</span>
    </label>
  );
}