import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

import { useFetch } from 'hooks';

import 'assets/styles/filters.css'

const PhylogenyFilter = ({label, idKey, handleId}) => {

  const [ids, setIds] = useState([]) 
  // const newParams = params[idKey] && params[idKey].split(',')

  const handleChange = (event, value) => {
    setSelectedOptions(value)
    handleId(`${value}`)
  }

  const { data, error, loading } = useFetch(`/api/phylogeny/trees/`);
  console.log("trees", data)
  

  useEffect(() => {
    if (data){
      setIds(data["trees"])
    }
  }, [data]);

  const [selectedOptions, setSelectedOptions] = useState()

  return (
    <div>
    <Autocomplete
            disablePortal
            defaultValue={[]} // Pre-filled options
            value={selectedOptions}
            // multiple
            size="small"
            onChange={handleChange}
            options={[... new Set(ids.map(x => x[idKey]))]}
            // loading={isPending}
            renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`Select ${label}`}
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={16} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
              )}
              sx={{
                width: 400,
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

export default PhylogenyFilter;