import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { useFetch } from 'hooks'
import 'assets/styles/filters.css';

const IdsAutocomplete = ({
    ref,
    url,
    label,
    params,
    handleId,
    labelKey,
    valueKey
  }) => {

  const [ids, setIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { data, loading, error } = useFetch(url);

  // load options
  useEffect(() => {
    if (data) { setIds(data);}
  }, [data]);


  // sync preselected values when params change
  useEffect(() => {
    if (ids.length && params) {
      const preselectedObjects = ids.filter( item => params.includes(item[valueKey]) );
      setSelectedOptions(preselectedObjects);
    }
  }, [ids, params]);

  const handleChange = (event, value) => {
    setSelectedOptions(value);
    handleId(value.map(v => v[valueKey]));
  };

  return (
    <div ref={ref}>
      <Autocomplete
        disablePortal
        multiple
        size="small"
        options={ids}
        value={selectedOptions}
        onChange={handleChange}
        getOptionLabel={(option) => option[labelKey] || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`Find ${label}`}
            size="small"
          />
        )}
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
      />
    </div>
  );
};

export default IdsAutocomplete;