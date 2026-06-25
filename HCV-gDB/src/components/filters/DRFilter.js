import { useState } from 'react';
import { Button } from 'react-bootstrap';

// Stylesheets
import 'assets/styles/filters.css';

import AccessionDropdown from './components/AccessionDropDown';
import HostDropdown from './components/HostDropDown';
import Dropdown from './components/DropDown';
import RadioButtonDropdown from './components/RadioButtonDropDown';

const DRFilter = ({ onApplyFilter, onClickReset }) => {

  const [filters, setFilters] = useState({});
  const [reset, setReset] = useState(false);

  const updateFilterKey = (key, value, exclude=false) => {
    setFilters((prev) => {
      const normalKey = key;
      const excludeKey = `exclude_${key}`;

      const updated = { ...prev };

      // remove both versions first
      delete updated[normalKey];
      delete updated[excludeKey];

      // add back the correct one if value exists
      if (value && value.length > 0) {
        updated[exclude ? excludeKey : normalKey] = value;
      }

      return updated;
    });

  };


  const handleGenesId = (value, exclude) => updateFilterKey("gene", value, exclude);
  const handlePolymorphismId = (value, exclude) => updateFilterKey("polymorphism", value, exclude);
  const handleDrug = (value, exclude) => updateFilterKey("drug", value, exclude);
  const handleSignatureKind = (value) => updateFilterKey("signature_kind", value); 


  const updateFilters = () => {
    onApplyFilter(filters);
  };

  const resetFilters = () => {
    setFilters({});
    setReset(prev => !prev);
    onApplyFilter();
    onClickReset(true)
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span><strong>FILTERS:</strong></span>

        <Dropdown
          label={'Gene'}
          id={'protein_name'}
          url={'/api/filters/search_protein_name/'}
          handleParams={handleGenesId}
          reset={reset}
        />

        <AccessionDropdown
          label={'Polymorphism'}
          id={'polymorphism'}
          url={'/api/filters/search_polymorphism_ids/'}
          handleParams={handlePolymorphismId}
          reset={reset}
        />

        <Dropdown
          label={'Drug'}
          id={'display_name'}
          url={'/api/filters/search_drug/'}
          handleParams={handleDrug}
          reset={reset}
        />

        <RadioButtonDropdown
          label={'Type'}
          id={'signature_kind'}
          options={['Single', 'Combination']}
          onChange={handleSignatureKind}
          reset={reset}
        />

        <div style={{ display: "flex", gap: "5px", marginLeft: "auto" }}>
          <Button size="sm" className="btn-main-no-outline" onClick={resetFilters}>
            Reset
          </Button>

          <Button size="sm" className="btn-main-filled" onClick={updateFilters}>
            Search
          </Button>
        </div>
      </div>

      <div className='size-12-font'>
        <ul>
          <li>click on various filters to view the different options</li>
          <li>options will show in drop-down once you start entering search</li>
          <li>click <em>Search</em> button to update sequences list with selected filters</li>
        </ul>
      </div>
    </div>
  );
};

export default DRFilter;