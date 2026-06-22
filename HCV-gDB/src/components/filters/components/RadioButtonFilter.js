import { Radio, RadioGroup, FormControl, FormControlLabel, Box } from '@mui/material';


import 'assets/styles/filters.css'

const RadioButtonFilter = ({label, label_values, value, handleId}) => {

    const handleChange = (value) => {
        handleId(`${value}`)
    }

    return (
        <div className='filter-container'>
              <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'white',
                  }}
                  >
                    {label && <div className='col-3 radio'><h6 >{label} </h6></div>}
                    <div className='col-9'>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={e => handleChange(e.target.value)}  
                            >
                                <FormControlLabel value={value[0]} 
                                sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.25,
                                "& .MuiFormControlLabel-label": {
                                  fontSize: "12px",
                                  lineHeight: 1.2,
                                },
                              }}
                                control={
                                    <Radio size="small" 
                                        sx={{
                                            padding: "4px",
                                            transform: "scale(0.8)",
                                            color: "var(--primary)",
                                            "&.Mui-checked": {
                                            color: "var(--primary)",
                                            },
                                        }}
                                    />
                                } 
                                    label={label_values[0]} />
                                <FormControlLabel value={value[1]} 
                                sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.25,
                                "& .MuiFormControlLabel-label": {
                                  fontSize: "12px",
                                  lineHeight: 1.2,
                                },
                              }}
                                                    control={<Radio size="small" 
                                                                    sx={{
                                    padding: "4px",
                                    transform: "scale(0.8)",
                                    color: "var(--primary)",
                                    "&.Mui-checked": {
                                      color: "var(--primary)",
                                    },
                                  }}/>}  label={label_values[1]} />
                            </RadioGroup>
                        </FormControl>
                      </div>
                  </Box>
              </div>
  );
};

export default RadioButtonFilter;
