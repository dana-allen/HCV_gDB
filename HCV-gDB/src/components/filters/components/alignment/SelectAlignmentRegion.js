import { useState } from "react";
import Checkbox from "../generic/Checkbox";
import { Typography } from "@mui/material";

const SelectAlignmentRegion = ({onRegionChange}) => {
    
    const options = [{name:"entirety", text:'Entirety'}, {name:"subregion", text:'Sub-region'}]
    
    const [mode, setMode] = useState("");

    const handleModeChange = (value) => {
        setMode(value);
        onRegionChange(value) && onRegionChange({});
    };

    return (

        <div>

            <Typography
                variant="subtitle1"
                sx={{
                    mb: 1,
                    fontWeight: 600,
                }}
            >
                Select Alignment Region:
            </Typography>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    flexWrap: "wrap", // optional
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

export default SelectAlignmentRegion;
