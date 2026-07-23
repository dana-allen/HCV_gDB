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
              width: "16px",
              height: "16px",
              border: "1px solid #767676",
              borderRadius: square ? "3px" : "50%",
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