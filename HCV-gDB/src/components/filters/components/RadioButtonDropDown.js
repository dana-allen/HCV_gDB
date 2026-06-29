import { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import "assets/styles/filters.css";

export default function RadioButtonDropdown({
  label,
  reset,
  options = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const containerRef = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      const inDropdown = containerRef.current?.contains(event.target);
      const inMuiMenu = event.target.closest(".MuiMenu-paper");

      if (!inDropdown && !inMuiMenu) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // reset handler
  useEffect(() => {
    setSelectedValue(null);
  }, [reset]);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    onChange?.(option.value);
  };

  const selectedLabel = options.find((o) => o.value === selectedValue)? 1 : '';

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* BUTTON */}
      <Button
        size="sm"
        className={
          selectedValue !== null ? "btn-filter-active" : "btn-filter"
        }
        onClick={() => setOpen((prev) => !prev)}
        style={{ display: "flex", alignItems: "center", gap: "6px" }}
      >
        {label}

        {selectedLabel && (
          <span
            style={{
              background: "var(--primary)",
              color: "black",
              borderRadius: "4px",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "bold",
              minWidth: "18px",
              textAlign: "center",
              border: "1px solid var(--primary)",
            }}
          >
            {selectedLabel}
          </span>
        )}
      </Button>

      {/* DROPDOWN */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            marginTop: "6px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "12px",
            width: "240px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              {label}
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {options.map((option, index) => (
                <label
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={label}
                    value={
                      typeof option.value === "object"
                        ? JSON.stringify(option.value)
                        : option.value
                    }
                    checked={selectedValue === option.value}
                    onChange={() => handleSelect(option)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}