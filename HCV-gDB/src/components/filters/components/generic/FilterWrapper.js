import { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

import 'assets/styles/filters.css';

export default function FilterWrapper({ label, selectedCount, reset, children, onExclude, excludeLabel, keepExclude=true }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [exclude, setExclude] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [reset]);

  const handleExclude = (value) => {
    setExclude(value)
    onExclude(value)
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
      className='filter-box'
    >
      <Button
        size="sm"
        className={selectedCount ? "btn-filter-active" : "btn-filter"}
        onClick={() => setOpen(prev => !prev)}
      >
        {label}

        {selectedCount && (
          <span className="filter-count">
            {selectedCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="dropdown-box">
          <label
            style={{
              fontSize: "12px",
              fontWeight: "bold"
            }}
          >
            Find {label}
          </label>

          {children}

          {keepExclude &&
            <div>
              <hr className="exclude-hr" />
              <label className='exclude-label'>
                <input
                    className='exclude-checkbox'
                    type="checkbox"
                    checked={exclude}
                    onChange={ (e) => handleExclude(e.target.checked) }
                  />
                Exclude selected {excludeLabel}
              </label>
            </div>
          }
        </div>
      )}
    </div>
  );
}