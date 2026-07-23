import { useState, useRef, useEffect } from "react";
import IdsAutocomplete from "./generic/IdsAutocomplete"
import FilterWrapper from "./generic/FilterWrapper";

import Checkbox from "./generic/Checkbox";
import 'assets/styles/filters.css';





export default function Region({label, handleParams, reset}) {

    

    const autocompleteRef = useRef(null);
    const [selectedValue, setSelectedValue ] = useState()
    const [exclude, setExclude] = useState(false)
    


    const [regionSelections, setRegionSelections] = useState({})
    const [selected, setSelected] = useState([])
    

    const regionTree = [
                            {name:'m49_region_id', display_name: 'Region', nodes:null, parent:null, text:'Global Region', label:'display_name'},
                            {name:'m49_intermediate_region_id', display_name: 'Intermediate region', nodes:null, parent:null, text:'Intermediate Region', label:'display_name'},
                            {name:'m49_sub_region_id', display_name: "Sub-region", nodes:null, parent:null, text:'Sub Region', label:'display_name'},
                            {name:'m49_code', display_name: "Country", nodes:null, parent:null, text:'Country', label:'display_name'}
    ]



  const handleCheckboxChange = (name) => {

    const wasSelected = selected.includes(name)

    setSelected(prev => wasSelected ? prev.filter(item => item !== name) : [...prev, name] )

    if (wasSelected) {
      setRegionSelections(prev => {
          const copy = { ...prev }
          delete copy[name]
          return copy
      })
    }

  }

    const handleNodeIds = (nodeName) => (ids) => {
      setRegionSelections(prev => {
          if (!ids || ids.length === 0) {
              const copy = { ...prev }
              delete copy[nodeName]
              return copy
          }
          return {
              ...prev,
              [nodeName]: ids
          }
      })   
    }

    const clearInputs = () => {
      setRegionSelections({})
      setSelected([])
      setSelectedValue(false)
      setExclude(false)
    };



    useEffect(() => {
      Object.keys(regionSelections).length > 0 ? setSelectedValue(Object.keys(regionSelections).length) : setSelectedValue(false)
      handleParams(regionSelections, exclude)
    }, [regionSelections, exclude]);

    useEffect(() => {
      clearInputs()

    }, [reset])

  return (
    <FilterWrapper
      label={label}
      selectedCount={selectedValue}
      reset={reset}
      onExclude = {(e) => setExclude(e)}
      excludeLabel = 'regions'
    >
      {regionTree.map(node => (
        <div key={node.name} style={{ marginBottom: '5px' }}>
          <Checkbox checked={selected.includes(node.name)} 
                    node={node} 
                    onChecked={handleCheckboxChange}
          />

          {selected.includes(node.name) && (
            <div style={{padding: '5px 0px 0px 20px'}}>
              <IdsAutocomplete ref={autocompleteRef}
                                label={node.display_name}
                                idKey={node.label} 
                                params={regionSelections[node.name]} 
                                url={`/api/filters/search_${node.name}`}
                                handleId={handleNodeIds(node.name)} 
                                valueKey={"id"}
                                labelKey={"display_name"}
                />

            </div>
          )}

        </div>
      ))}

    </FilterWrapper>
  );
}