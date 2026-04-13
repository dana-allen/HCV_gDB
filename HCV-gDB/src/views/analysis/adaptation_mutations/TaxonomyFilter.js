import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';


import { useTaxonomy } from 'hooks';

import 'assets/styles/filters.css'

const TaxonomyFilter = ({label, taxa_level, idKey, params, handleId}) => {

  const [ids, setIds] = useState([]) 

  const handleChange = (event, value) => {
    setSelectedOptions(value)
    handleId(`${value}`)
  }
  const { data, loading, error} = useTaxonomy(taxa_level, params)

  useEffect(() => {
    if (data){
      setIds(data)
    }
  }, [data]);


  const [selectedOptions, setSelectedOptions] = useState();

  return (
    <div className='filter-container'>
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}
      >
        <div className='col-12'>
          <Autocomplete
            // disablePortal
            defaultValue={[]} // Pre-filled options
            value={selectedOptions}
            multiple
            size="small"
            onChange={handleChange}
            options={[... new Set(ids.map(x => x[idKey]))]}
            // loading={isPending}
            renderInput={(params) => 
            <TextField variant="outlined"
              {...params}  
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {/* {isPending ? <CircularProgress color="inherit" size={20} /> : null} */}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
              placeholder={`Enter ${label}`} />}
            sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none", // Remove the border
                  "& fieldset": {
                    border: "none", // Remove the fieldset (underline/box)
                  },
                },
              }}
          />
        </div>
      </Box>
    </div>
  );
};

export default TaxonomyFilter;