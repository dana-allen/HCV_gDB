import { useState, useRef, useEffect } from "react";

import FilterWrapper from "./FilterWrapper";
import IdsAutocomplete from "./IdsAutocomplete"

import 'assets/styles/filters.css';

export default function Dropdown({label, id, url, handleParams, reset}) {

  const [exclude, setExclude] = useState(false);
  const autocompleteRef = useRef(null);

  const [selectedValue, setSelectedValue ] = useState()
  const [preSelected, setPreselected] = useState()

  const handleExclude = (value) => {
    setExclude(value)
    handleParams(preSelected, value) 
  }

  const handleIds = (value) => {
    setPreselected(value);
    handleParams(value, exclude);

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
      excludeLabel = 'hosts'
    >

      <IdsAutocomplete
                ref={autocompleteRef}
                url={url}
                idKey={id}
                params={preSelected}
                handleId={handleIds}
                label={label}
                preSelected={preSelected}
                valueKey={id}
                labelKey={id}
              />

    </FilterWrapper>
  );
}