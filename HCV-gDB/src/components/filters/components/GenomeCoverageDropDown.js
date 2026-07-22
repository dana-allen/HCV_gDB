import { useState, useRef, useEffect } from "react";
import { Button } from 'react-bootstrap';
import RegionFilter from "../RegionFilter";
import 'assets/styles/filters.css';
import { Box, TextField, InputAdornment, MenuItem } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
export default function GenomeCoverageDropdown({label, handleParams, reset, alwaysOpen=false}) {

    const [open, setOpen] = useState(alwaysOpen);
    const [exclude, setExclude] = useState(false)
    const containerRef = useRef(null);
    const autocompleteRef = useRef(null);

    const [selectedValue, setSelectedValue ] = useState()

    useEffect(() => {
      function handleClickOutside(event) {
        const inDropdown = containerRef.current?.contains(event.target);
        const inAutocomplete = autocompleteRef.current?.contains(event.target);

        if (!inDropdown && !inAutocomplete) {
        setOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [regionSelections, setRegionSelections] = useState({})
    const [selected, setSelected] = useState(null)

    const regionTree = [
                          // {name:'full_genome', display_name: 'full genome', nodes:null, parent:null, text:'Full genome', label:'display_name'},
                          {name:'coreprotein', display_name: 'Core protein', nodes:null, parent:null, text:'core protein', label:'display_name'},
                          {name:'envelope_protein_E1', display_name: 'Envelope protein E1', nodes:null, parent:null, text:'envelope protein E1', label:'display_name'},
                          {name:'envelope_protein_E2', display_name: 'Envelope protein E2', nodes:null, parent:null, text:'envelope protein E2', label:'display_name'},
                          {name:'protein_p7', display_name: "Protein p7", nodes:null, parent:null, text:'protein p7', label:'display_name'},
                          {name:'NS2', display_name: "NS2", nodes:null, parent:null, text:'nonstructural protein NS2', label:'display_name'},
                          {name:'NS3', display_name: "NS3", nodes:null, parent:null, text:'protease/helicase protein NS3', label:'display_name'},
                          {name:'NS4A', display_name: "NS4A", nodes:null, parent:null, text:'nonstructural protein NS4A', label:'display_name'},
                          {name:'NS4B', display_name: "NS4B", nodes:null, parent:null, text:'nonstructural protein NS4B', label:'display_name'},
                          {name:'NS5B', display_name: "NS5B", nodes:null, parent:null, text:'RNA-dependent RNA polymerase NS5B', label:'display_name'},
                        ]

  const handleChange = (name) => {

    const alreadySelected = selected === name

    setSelected(alreadySelected ? null : name)

    if (alreadySelected) {
      setRegionSelections({})
    } else {
      setRegionSelections({})
    }
  }

    const clearInputs = () => {
      setRegionSelections({})
      setSelected([])
      setSelectedValue(false)
      setExclude(false)
    };

    const handleInputChange = (type, value) => {

      setRegionSelections(prev => {
          if (!value || value === 0) {
              const copy = { ...prev }
              delete copy[type]
              return copy
          }
          return {
              ...prev,
              [type]: value
          }
      })   
    };

    useEffect(() => {
      setSelectedValue(
        Object.keys(regionSelections).length > 0 ? 1 : false
      )
      handleParams(regionSelections, exclude)
    }, [regionSelections, exclude])

    useEffect(() => {
      clearInputs()

    }, [reset])

  return (
    <div ref={containerRef} className='filter-box'>

      <Button
        size="sm"
        className={`${selectedValue ? "btn-filter-active" : "btn-filter"}`}
        onClick={() => setOpen((prev) => !prev)}> 
        {label} {selectedValue && ( <span className='filter-count'> {selectedValue} </span> )}
      </Button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            marginTop: "6px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "12px",
            width: "260px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          <button
            onClick={clearInputs}
            style={{
              position: "absolute",
              top: "6px",
              right: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#888"
            }}
          >
            ×
          </button>


          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Find {label}
            </label>
            {regionTree.map(node => (
              <div key={node.name} style={{ marginBottom: '5px' }}>
                  <label
                      style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      }}
                  >
                    <input
                        type="radio"
                        name="coverage-region"
                        checked={selected === node.name}
                        onChange={() => handleChange(node.name)}
                        style={{
                          appearance: "none",
                          width: "16px",
                          height: "16px",
                          border: "1px solid #767676",
                          borderRadius: "50%",
                          backgroundColor: selected === node.name
                              ? "var(--primary)"
                              : "white",
                          cursor: "pointer",
                      }}
                    />
                    <span style={{ fontSize:"12px" }}>{node.display_name}</span>
                  </label>

                  {selected === node.name && (
                    <div style={{padding: '5px 0px 0px 20px'}}>
                      <TextField
                        placeholder={`Enter minimum coverage (%)`}
                        size="small"
                        // value={max}
                        onChange={(e) => handleInputChange(node.name, e.target.value)}
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
                        InputProps={{

                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                              </InputAdornment>
                            </>
                          ),
                          endAdornment: (
                            <>
                              
                            </>
                          ),
                        }}
                      />
                    </div>
                  )}

              </div>
            ))}
          </div>
          {/* <hr className='exclude-hr'/>
          <div style={{ marginBottom: "10px" }}>
            <label className='exclude-label'>
              <input
                className='exclude-checkbox'
                type="checkbox"
                checked={exclude}
                onChange={(e) => setExclude(e.target.checked)}
              />
              Exclude selected coverage
            </label>            
          </div> */}
        </div>
      )}
    </div>
  );
}