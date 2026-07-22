import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Hooks and Contexts
import { useSequences } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

// Specific Components
import SequencesTable from "./SequencesTable"

// Generic Components
import PagingButtonsWithCursor from 'components/buttons/PagingButtonsWithCursor';
import BarFilter from 'components/filters/BarFilter';

// Stylesheets
import 'assets/styles/sequences.css';


const Sequences = () => {

  const location = useLocation();
  const location_filters = location.state?.filters || {};

  const initialParams = {
    items_per_page: 10,
    exclusion_status: "0",
    ...location_filters
  };

  const [params, setParams] = useState(initialParams);

  const { triggerError } = useErrorHandler();
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  const [barFilters, setBarFilters] = useState({});

  const { sequences, nextCursor, prevCursor, totalCount, loading, error } = useSequences(params);

  const handleReset = useCallback((data) => { }, []);


  const handleBarFilters = useCallback((data) => { setBarFilters(data || {}); }, []);
  const [cursorReset, setCursorReset] = useState(false)
  const isFirstRender = useRef(true);


  const handleCursorChange = (newCursors) => {

    Object.keys(newCursors).forEach(key => {
      if (newCursors[key] === undefined) {
        delete newCursors[key];
      }
    });


    setParams(prev => {
      const next = { ...prev };
      if (newCursors.items_per_page ){
        delete next.items_per_page
      }
        
      delete next.next_cursor;
      delete next.prev_cursor;
      return {...newCursors, ...next};
    });

  }

  console.log(params)


  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setParams(prev => ({
      items_per_page: prev.items_per_page || 10,
      exclusion_status: prev.exclusion_status || "0",
      ...barFilters
    }));

    setCursorReset(!cursorReset)


  }, [barFilters]);

  useEffect(() => {
    triggerLoadingWheel(loading)
    if (error) triggerError(error);
    
  }, [loading, error]);


  return (
    <div className="container">
      <h2>Sequences</h2>
      <p className='tight-text'>
        This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus sequences from NCBI nucleotide.
        View the reference sequences used for alignments <Link className="custom-link" to="/references">here</Link>.
      </p>

      <ul className="size-12-font tight-list">
        <li>click on a clade to view the sequences within that clade.</li>
        <li>excluded sequences are automatically filtered out unless otherwise specified</li>
        <li>
          the meta-data download will contain the full{" "}
          <a className="custom-link" href="meta_data">meta-data available</a>
          {" "}beyond what is visible on the table below
        </li>
      </ul>
      
      <div className='col-3'>
      </div>
      <div>
        <BarFilter onApplyFilter={handleBarFilters} onClickReset={handleReset}/>
        <hr></hr>
        
      </div>

      {sequences && 
        <div className='padding-table'>

          <PagingButtonsWithCursor
            filters={{...barFilters}}
            totalCount={totalCount}
            nextCursor={nextCursor}
            prevCursor={prevCursor}
            onCursorChange={handleCursorChange}
            cursorReset={cursorReset}
          />

          {!loading && <SequencesTable data={sequences} type={'sequence'} />}

        </div>
      }

    </div>
  );
};
 
export default Sequences;


