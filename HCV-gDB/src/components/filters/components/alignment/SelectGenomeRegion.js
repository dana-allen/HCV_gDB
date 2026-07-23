import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';

const SelectGenomeRegion = ({onRegionChange}) => {
    
    const structural_features = [{name:'core protein', text:'Core protein'}, 
                    {name:'envelope protein E1', text:'Envelope protein E1'},
                    {name:'envelope protein E2', text:'Envelope protein E2'}
                ];

    const non_structural_features = [
                    {name:'protein p7', text:'Protein p7'},
                    {name:'nonstructural protein NS2', text:'NS2'},
                    {name:'protease/helicase protein NS3', text:'NS3'},
                    {name:'nonstructural protein NS4A', text:'NS4A'},
                    {name:'nonstructural protein NS4B', text:'NS4B'},
                    {name:'nonstructural protein NS5A', text:'NS5A'},
                    {name:'RNA-dependend RNA polymerase NS5B', text:'NS5B'}
                ];

    
    return (

        <div>
            <Typography
                variant="subtitle1"
                sx={{
                    mb: 1,
                    fontWeight: 600,
                }}
                >
                Select Genome Region:
            </Typography>
                            
            <div className="row" style={{marginLeft:"15px"}}>
                <div className="col-12">
                    <FormControl fullWidth>
                        <RadioGroup
                            name="protein-selection"
                            onChange={(e) => onRegionChange(e.target.value)}
                        >
                            <div className="row">
                                <div className="col-md-6">
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            mb: 1,
                                        }}
                                    >
                                        Non-Structural Proteins
                                    </Typography>

                                    {non_structural_features.map((feature) => (
                                    <FormControlLabel
                                        key={feature.name}
                                        value={feature.name}
                                            sx={{
                                                ml: 0.5, 
                                                "& .MuiFormControlLabel-label": {
                                                fontSize: "12px",
                                                lineHeight: 1.2,
                                                },
                                                "& .MuiRadio-root": {
                                                marginRight: "6px",
                                                },
                                            }}
                                            control={
                                                <Radio
                                                    size="small"
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
                                        label={feature.text}
                                    />
                                    ))}
                                </div>

                                {/* Structural */}
                                <div className="col-md-6">
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            mb: 1,
                                        }}
                                    >
                                        Structural Proteins
                                    </Typography>

                                    {structural_features.map((feature) => (

                                        <FormControlLabel
                                            key={feature.name}
                                            value={feature.name}
                                            sx={{
                                                ml: 0.5, 
                                                "& .MuiFormControlLabel-label": {
                                                fontSize: "12px",
                                                lineHeight: 1.2,
                                                },
                                                "& .MuiRadio-root": {
                                                marginRight: "6px", 
                                                },
                                            }}
                                            control={
                                                <Radio
                                                    size="small"
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
                                            label={feature.text}
                                        />
                                    ))}
                                </div>

                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>

        </div>

    );
};

export default SelectGenomeRegion;
