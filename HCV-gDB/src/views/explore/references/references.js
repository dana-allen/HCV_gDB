import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarFilter from 'components/filters/BarFilter';
// Hooks & Contexts
import { useSequences } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler } from 'contexts'; 

// Custom Components
import SequencesTable from "../sequences/SequencesTable"

// Generic Components
import CladeTree from 'components/trees/CladeTree';
import PagingButtonsWithCursor from 'components/buttons/PagingButtonsWithCursor';

// Styling 
import 'assets/styles/sequences.css'

const References = ({  } ) => {

    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const [filters, setFilters] = useState({"items_per_page":10, "accession_type":"reference"})

    const [params, setParams] = useState({"items_per_page":10, "accession_type":"reference"});

    const { sequences, nextCursor, prevCursor, totalCount, loading, error } = useSequences(params);



    const handleFiltersChange = useCallback((data) => {
        setFilters(data);

        const keysToRemove = ["items_per_page", "exclusion_status", "accession_type"];

        setParams((prev) => {
        // Keep only keys in keysToRemove
            const filteredPrev = Object.fromEntries(
            Object.entries(prev).filter(([key]) => keysToRemove.includes(key))
            );

            // If data is empty, just return filteredPrev (removes all other keys)
            if (!data || Object.keys(data).length === 0) {
                return filteredPrev;
            }

            // Otherwise merge new data with filteredPrev
            return {
                ...filteredPrev,
                ...data,
            };
        });

    }, []);

    useEffect(() => {

        triggerLoadingWheel(loading)
        if(error) triggerError(error);

    }, [loading, error]);

    return (
        <div className="container">
            <h2 >References</h2>
             <p className='tight-text'>
                This dataset contains all the {process.env.REACT_APP_VIRUS_NAME} virus reference sequences.
                View all sequences <Link className='custom-link' to='/sequences' >here</Link>.
            </p>
            <ul className='size-12-font tight-list'>
                <li>Click on a clade to view the references within that clade.</li>
                {/* <li>Use the <em>Filters</em> button to view advanced filtering options.</li> */}
    
            </ul>
            <div className='col-3'>
                <CladeTree onCladeSelect={handleFiltersChange}/>
            </div>
            {/* <FilterBar onApplyFilter={handleFiltersChange}/> */}
            <hr></hr>
        
            {sequences && 
            <div className='padding-table'>
                <PagingButtonsWithCursor
                filters={filters}
                totalCount={totalCount}
                nextCursor={nextCursor}
                prevCursor={prevCursor}
                setParams={setParams}
            />

              <SequencesTable data={sequences} type={'reference'} />
          </div>
        }
        </div>
       
    );
};
 
export default References;