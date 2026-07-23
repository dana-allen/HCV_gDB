import { useState, useRef, useEffect } from "react";
import SearchAutocomplete from "./SearchAutocomplete";

import FilterWrapper from "./FilterWrapper";


import 'assets/styles/filters.css';

export default function SearchDropdown({label, id, url, handleParams, reset}) {

  const [exclude, setExclude] = useState(false);
  const autocompleteRef = useRef(null);

  const [selectedValue, setSelectedValue ] = useState()
  const [preSelected, setPreselected] = useState()

  const handleExclude = (value) => {
    setExclude(value)
    handleParams(preSelected, value) 
  }

  const handleIds = (value) => { 
    value.length > 0 ? setSelectedValue(value.length) : setSelectedValue(false)
    setPreselected(value)
    handleParams(value, exclude) 

  };
  useEffect(() => {
    setPreselected()
    setExclude(false)
    setSelectedValue(false)
  }, [reset])

  return (

    <FilterWrapper
      label={label}
      selectedCount={selectedValue}
      reset={reset}
      onExclude = {(e) => handleExclude(e)}
      excludeLabel = {label}
    >

      <SearchAutocomplete
        ref={autocompleteRef}
        url={url}
        idKey={id}
        handleId={handleIds}
        label={label}
        preSelected={preSelected}
      />

    </FilterWrapper>
  );
}