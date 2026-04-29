import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarFilter from 'components/filters/BarFilter';
// Hooks & Contexts
import { useSequences, useDrugResistance, useFetch } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler } from 'contexts'; 

// Custom Components
import DrugResistanceTable from "./components/DrugResistanceTable"

// Generic Components
import CladeTree from 'components/trees/CladeTree';
import PagingButtonsWithCursor from 'components/buttons/PagingButtonsWithCursor';

// Styling 
import 'assets/styles/sequences.css'

const DrugResistance = ({  } ) => {

    // const { triggerError } = useErrorHandler();
    // const { triggerLoadingWheel } = useLoadingWheelHandler();
    // const [filters, setFilters] = useState({"items_per_page":10, "accession_type":"reference"})

    // const [params, setParams] = useState({"items_per_page":10, "accession_type":"reference"});


    const { accessions, loading, error } = useDrugResistance();



    // const handleFiltersChange = useCallback((data) => {
    //     setFilters(data);

    //     const keysToRemove = ["items_per_page", "exclusion_status", "accession_type"];

    //     setParams((prev) => {
    //     // Keep only keys in keysToRemove
    //         const filteredPrev = Object.fromEntries(
    //         Object.entries(prev).filter(([key]) => keysToRemove.includes(key))
    //         );

    //         // If data is empty, just return filteredPrev (removes all other keys)
    //         if (!data || Object.keys(data).length === 0) {
    //             return filteredPrev;
    //         }

    //         // Otherwise merge new data with filteredPrev
    //         return {
    //             ...filteredPrev,
    //             ...data,
    //         };
    //     });

    // }, []);

    // useEffect(() => {

    //     triggerLoadingWheel(loading)
    //     if(error) triggerError(error);

    // }, [loading, error]);

    

    return (
        <div className="container">
            <h2>Drug Resistance</h2>
             <p className='tight-text'>
                This dataset contains all the {process.env.REACT_APP_VIRUS_NAME} virus reference sequences.
                View all sequences <Link className='custom-link' to='/sequences' >here</Link>.
            </p>
            <ul className='size-12-font tight-list'>
    
            </ul>

            {accessions && 
                <div>
                    <DrugResistanceTable accessions={accessions}/>
                </div>
            }
            
            <hr></hr>
        </div>
       
    );
};
 
export default DrugResistance;