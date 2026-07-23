import { useState } from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// Stylesheets
import 'assets/styles/filters.css';

import Dropdown from './components/generic/DropDown';
import SearchDropdown from './components/generic/SearchDropdown';
import RadioButtons from './components/RadioButtons';

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


  const handleGenesId = (value, exclude) => updateFilterKey("protein_name", value, exclude);
  const handlePolymorphismId = (value, exclude) => updateFilterKey("signature_id", value, exclude);
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

        <SearchDropdown
          label={'Polymorphism'}
          id={'polymorphism'}
          url={'/api/filters/search_polymorphism_ids/'}
          handleParams={handlePolymorphismId}
          reset={reset}
        />

        <Dropdown
          label={'Drug'}
          id={'drug'}
          url={'/api/filters/search_drug/'}
          handleParams={handleDrug}
          reset={reset}
        />

        <RadioButtons
          label={'Type'}
          id={'signature_kind'}
          options={[
              { text: "Single", name: 'single' },
              { text: "Combintation", name: 'combination' }
            ]}
          onChange={handleSignatureKind}
          reset={reset}
        />

        <div style={{ display: "flex", gap: "5px"}}>
          <Button size="sm" className="btn-main-filled" onClick={updateFilters}>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
          </Button>
          <Button size="sm" className="btn-main-no-outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>

      <div className='size-12-font'>
        <ul>
          <li>click on various filters to view the different options</li>
          <li>options will show in drop-down once you start entering search</li>
        </ul>
      </div>
    </div>
  );
};

export default DRFilter;