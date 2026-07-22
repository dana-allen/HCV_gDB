import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Hooks and Contexts
import { usePolymorphisms } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"
import { Button } from "react-bootstrap";
import PolymorphismsTable from './components/PolymorphismsTable';
import PolymorphismsVisual from './components/PolymorphismsVisual';
import PagingButtons from 'components/buttons/PagingButtons';

// Stylesheets
import 'assets/styles/sequences.css';
import 'assets/styles/genome_viewer.css'

import DRFilter from 'components/filters/DRFilter';

const Polymorphisms = () => {

    const [params, setParams] = useState('');
    const { polymorphisms, loading, error } = usePolymorphisms(params);

    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')
    const [currentItems, setCurrentItems] = useState([])
    const [viewType, setViewType] = useState('visual')
    const [barFilters, setBarFilters] = useState({});

    const handlePageChange = (items) => {
        setCurrentItems(items[0])
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    useEffect(() => {
    
        triggerLoadingWheel(loading)
        if (error) triggerError(error);
    
    }, [loading, error]);


    const handleBarFilters = useCallback((data) => { setBarFilters(data || {}); }, []);
    const handleReset = useCallback((data) => {  }, []);

    const handleViewType = (value) => {
        setViewType(value)
    }

    useEffect(() => {


        setParams(prev => ({
            ...barFilters
        }));

    }, [barFilters]);


    return (
        <div className="container">
            <h2>Polymorphisms</h2>
            <p>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} analyses sequences for these individual or combined amino acid substitutions and deletions.</p>

            <div>
            <DRFilter onApplyFilter={handleBarFilters} onClickReset={handleReset}/>
            <hr></hr>
            
            </div>

            {polymorphisms && 
                <div>
                    <p className='selected-feature-label size-12-font'>
                        <em>view: &nbsp;</em>
                        <Button size='sm' className={`btn-table-sequence size-12-font`} onClick={()=>handleViewType('sequence')}>Visual</Button>
                        <Button size='sm' className={`btn-table-sequence size-12-font`} onClick={()=>handleViewType('list')}>Tabular</Button> 
                        
                    </p>
                    {viewType == 'visual' ? 

                        <div style={{marginTop:'50px'}}> 
                            <PolymorphismsVisual data={polymorphisms}/>
                        </div> : 
                        <div className='padding-table'>
                            <div><PagingButtons data={polymorphisms} onPageChange={handlePageChange}> </PagingButtons></div>
                            <a>Polymorphisms {startRecord} to {endRecord} of {polymorphisms.length}</a>

                            <PolymorphismsTable data={currentItems}/>

                        </div>
                    }

                </div>
                    
            }

        </div>
    );
};
 
export default Polymorphisms;



