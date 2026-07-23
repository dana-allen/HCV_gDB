import { useState } from "react";
import Checkbox from "../generic/Checkbox";
import { Typography } from "@mui/material";

const SelectSubRegion = ({onRegionChange}) => {
    
    const options = [{name:"nucleotide", text:'Nucleotide'}, {name:"codon", text:'Codon'}]
    
    const [mode, setMode] = useState("nucleotide");

    const handleModeChange = (value) => {
        setMode(value);
        onRegionChange(value) && onRegionChange({});
    };

    return (

        <div style={{marginTop:'5px'}}>

            <Typography
                variant="subtitle1"
                sx={{
                    mb: 1,
                    fontWeight: 600,
                }}
                >
                Select Sub-region Coordinates:
            </Typography>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        flexWrap: "wrap", 
                        marginLeft:"15px"
                    }}
                >
                    {options.map((option) => (
                        <Checkbox
                            key={option.name}
                            checked={mode === option.name}
                            node={option}
                            onChecked={handleModeChange}
                            square={false}
                        />
                    ))}
                </div>
        
        </div>

    );
};

export default SelectSubRegion;
