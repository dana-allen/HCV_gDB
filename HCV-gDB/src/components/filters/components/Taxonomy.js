import { useState, useRef, useEffect } from "react";


import IdsAutocomplete from "./generic/IdsAutocomplete"
import FilterWrapper from "./generic/FilterWrapper";
import Checkbox from "./generic/Checkbox";
import 'assets/styles/filters.css';

export default function Taxonomy({label, handleParams, reset}) {

    const [exclude, setExclude] = useState(false)

    const autocompleteRef = useRef(null);

    const [selectedValue, setSelectedValue ] = useState()


    const [taxonomySelections, setTaxonomySelections] = useState({})
    const [selected, setSelected] = useState([])

    const taxonomyTree = [
                            {name:'phylum', nodes:null, parent:null, text:'Phylum'},
                            {name:'class', nodes:null, parent:null, text:'Class'},
                            {name:'order_category', nodes:null, parent:null, text:'Order'},
                            {name:'family', nodes:null, parent:null, text:'Family'},
                            {name:'genus', nodes:null, parent:null, text:'Genus'},
                            // {name:'species', nodes:null, parent:null, text:'Species'}
    ]


    const handleCheckboxChange = (name) => {

      const wasSelected = selected.includes(name)

      setSelected(prev =>
        wasSelected
            ? prev.filter(item => item !== name)
            : [...prev, name]                      
      )

      if (wasSelected) {
        setTaxonomySelections(prev => {
            const copy = { ...prev }
            delete copy[name]
            return copy
        })
      }

    }

    const handleNodeIds = (nodeName) => (ids) => {
      setTaxonomySelections(prev => {
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
      setTaxonomySelections({})
      setSelected([])
      setSelectedValue(false)
      setExclude(false)
    };



    useEffect(() => {
      Object.keys(taxonomySelections).length > 0 ? setSelectedValue(Object.keys(taxonomySelections).length) : setSelectedValue(false)
      handleParams(taxonomySelections, exclude)
    }, [taxonomySelections, exclude]);

    useEffect(() => {
      clearInputs()

    }, [reset])

  return (

    <FilterWrapper
      label={label}
      selectedCount={selectedValue}
      reset={reset}
      onExclude = {(e) => setExclude(e)}
      excludeLabel = 'taxonomy'
    >
      {taxonomyTree.map(node => (
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
                                params={taxonomySelections[node.name]} 
                                url={`/api/taxonomy/${node.name}`}
                                handleId={handleNodeIds(node.name)} 
                                valueKey={node.name}
                                labelKey={node.name}
                                l
                />

            </div>
          )}

        </div>
      ))}

    </FilterWrapper>

  );
}