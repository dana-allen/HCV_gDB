import { useState, useEffect } from "react";
import 'assets/styles/filters.css';
import Checkbox from "./generic/Checkbox";
import FilterWrapper from "./generic/FilterWrapper";

export default function RadioButtons({label, reset, options, onChange}) {

  useEffect(() => { setMode(false) }, [reset])

  const [mode, setMode] = useState("");
  const [selectedValue, setSelectedValue ] = useState()

  const handleModeChange = (value) => {
    if (value == "1"){ setSelectedValue(1)} else {setSelectedValue()}
    setMode(value);
    onChange(value) && onChange({});
  };

  
  return (

    <FilterWrapper
      label={label}
      selectedCount={selectedValue}
      reset={reset}
      keepExclude={false}
    >
      {options.map(option => (

        <Checkbox checked={mode === option.name} 
                node={option} 
                onChecked={handleModeChange}
                square={false}
      />


      ))}
    </FilterWrapper>

  );
}