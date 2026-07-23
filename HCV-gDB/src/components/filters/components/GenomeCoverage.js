import { useState, useEffect } from "react";
import { TextField } from '@mui/material';

import Checkbox from "./generic/Checkbox";
import FilterWrapper from "./generic/FilterWrapper";

import 'assets/styles/filters.css';

export default function GenomeCoverage({label, handleParams, reset }) {

    const [exclude, setExclude] = useState(false)

    const [selectedValue, setSelectedValue ] = useState()


    const [genomeSelections, setGenomeSelections] = useState({})
    const [selected, setSelected] = useState(null)

    const genomeTree = [
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

  const handleCheckboxChange = (name) => {

    const alreadySelected = selected === name

    setSelected(alreadySelected ? null : name)

    if (alreadySelected) {
      setGenomeSelections({})
    } else {
      setGenomeSelections({})
    }
  }

    const clearInputs = () => {
      setGenomeSelections({})
      setSelected([])
      setSelectedValue(false)
      setExclude(false)
    };

    const handleInputChange = (type, value) => {

      setGenomeSelections(prev => {
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

      setSelectedValue( Object.keys(genomeSelections).length > 0 ? 1 : false )
      handleParams(genomeSelections, exclude)

    }, [genomeSelections, exclude])

    useEffect(() => { clearInputs() }, [reset])

  return (


    <FilterWrapper
          label={label}
          selectedCount={selectedValue}
          reset={reset}
          onExclude = {(e) => setExclude(e)}
          excludeLabel={'coverage'}
          keepExclude={false}
        >
          {genomeTree.map(node => (
            <div key={node.name} style={{ marginBottom: '5px' }}>
                <Checkbox checked={selected === node.name} 
                          node={node} 
                          onChecked={handleCheckboxChange}
                          square={false}
                />

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
                      
                    />
                  </div>
                )}

            </div>
          ))}
    </FilterWrapper>
  );
}