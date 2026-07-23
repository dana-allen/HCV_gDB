import { useState, useEffect } from "react";

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

import FilterWrapper from "./generic/FilterWrapper";
import Checkbox from "./generic/Checkbox";

import 'assets/styles/filters.css';

export default function ComparisonSelector({label, options, reset, onChange}) {


  const [selectedValue, setSelectedValue ] = useState()

  useEffect(() => { setSelectedValue(false) }, [reset])

  const [mode, setMode] = useState(""); // 'gt', 'lt', 'between'
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleModeChange = (value) => {
    setMode(value);
    setMin("");
    setMax("");
    onChange && onChange({});
  };

  const handleInputChange = (type, value) => {
    let newMin = min;
    let newMax = max;

    if (type === "min") {
      newMin = value;
      setMin(value);
    }

    if (type === "max") {
      newMax = value;
      setMax(value);
    }

    let filter = {};

    if (mode === "gt" && newMin) { filter = { min: Number(newMin) }; }

    if (mode === "lt" && newMax) { filter = { max: Number(newMax) }; }

    if (mode === "between" && newMin && newMax) {
      filter = { min: Number(newMin), max: Number(newMax) };
    }
    if (newMin && newMax) {
     setSelectedValue(2) 
    } else if (newMin || newMax){
      setSelectedValue(1)
    } else {
      setSelectedValue(false)
    }

    onChange && onChange(filter);
  };

  const clearInputs = () => {
    setMode("");
    setMin("");
    setMax("");
    setSelectedValue(false);

    onChange && onChange({});
  };

  useEffect(() => {
      clearInputs()

    }, [reset])

  return (
    <FilterWrapper
      label={label}
      selectedCount={selectedValue}
      reset={reset}
      keepExclude={false}
    >



    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {options.map(option => (
      
          <Checkbox checked={mode === option.name} 
                  node={option} 
                  onChecked={handleModeChange}
                  square={false}
        />
      ))}
    </div>

    {(mode === "gt" || mode === "lt") && (
                  <TextField
      placeholder={`Enter length`}
      value={mode === "gt" ? min : max}
      size="small"
      sx={{
          width: 220,
          "& .MuiOutlinedInput-root": {
            minHeight: 25,
            fontSize: "0.75rem",
          },
          "& .MuiAutocomplete-tag": {
            height: 20,
            fontSize: "0.75rem",
          },
        }}
      onChange={(e) =>
      handleInputChange(mode === "gt" ? "min" : "max", e.target.value)
      }
      InputProps={{

        startAdornment: (
          <>
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          </>
        ),
        endAdornment: (
          <>
            
          </>
        ),
      }}
    />
    )}

              {mode === "between" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <TextField
                placeholder={`Enter lower length`}
                size="small"
                value={max}
                onChange={(e) => handleInputChange("max", e.target.value)}
                sx={{
                  width: 220,
                  "& .MuiOutlinedInput-root": {
                    minHeight: 25,
                    fontSize: "0.75rem",
                  },
                  "& .MuiAutocomplete-tag": {
                    height: 20,
                    fontSize: "0.75rem",
                  },
                }}
                InputProps={{

                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    </>
                  ),
                  endAdornment: (
                    <>
                      
                    </>
                  ),
                }}
                
              />
              <TextField
                placeholder={`Enter upper length`}
                size="small"
                value={min}
                onChange={(e) => handleInputChange("min", e.target.value)}
                sx={{
                  width: 220,
                  "& .MuiOutlinedInput-root": {
                    minHeight: 25,
                    fontSize: "0.75rem",
                  },
                  "& .MuiAutocomplete-tag": {
                    height: 20,
                    fontSize: "0.75rem",
                  },
                }}
                InputProps={{

                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    </>
                  ),
                  endAdornment: (
                    <>
                      
                    </>
                  ),
                }}
              />
                </div>
              )}
       </FilterWrapper>   
  );
}