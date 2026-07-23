import { useState, useEffect } from "react";

import FilterWrapper from "./generic/FilterWrapper";
import Checkboxes from "./generic/Checkboxes";
import { useLineage } from "hooks";

import 'assets/styles/filters.css';

export default function Clades({label, handleParams, reset}) {

  const { lineageTree = [], loading, error } = useLineage();

  const [exclude, setExclude] = useState(false);
  const [selectedValue, setSelectedValue ] = useState()
  const [preSelected, setPreselected] = useState()


  const handleIds = (value) => {
    
    const totalCount = value.reduce((total, item) => { return total + 1 + item.children.length;}, 0);
    
    totalCount > 0 ? setSelectedValue(totalCount) : setSelectedValue(false);

    setPreselected(value);
    handleParams(value, exclude);

  };

  useEffect(() => {
    handleParams(preSelected || [], exclude);
  }, [preSelected, exclude]);

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
      onExclude = {(e) => setExclude(e)}
      excludeLabel={'clades'}
    >
      <Checkboxes
        data={lineageTree}
        onCheckboxChange={handleIds}
        preSelected={preSelected}
      />

    </FilterWrapper>
  );
}