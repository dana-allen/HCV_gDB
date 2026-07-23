import { TextField } from '@mui/material';

const SelectSubRegionCoordinates = ({ onStartCoordinate, onEndCoordinate }) => {

    return (

        <div className='left-margin' style={{marginTop:'5px'}}>

            <TextField
                placeholder={`start`}
                size="small"
                onChange={e =>  onStartCoordinate(e.target.value)}
                sx={{
                  width: 220,
                  "& .MuiOutlinedInput-root": {
                    minHeight: 15,
                    fontSize: "0.75rem",
                  },
                  "& .MuiAutocomplete-tag": {
                    height: 15,
                    fontSize: "0.75rem",
                  },
                }}
                
                
              />&nbsp;

            <TextField
                placeholder={`end`}
                size="small"
                onChange={e =>  onEndCoordinate(e.target.value)}
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

export default SelectSubRegionCoordinates;
