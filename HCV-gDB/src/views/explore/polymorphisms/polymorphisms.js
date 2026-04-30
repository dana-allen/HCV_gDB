import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Hooks and Contexts
import { usePolymorphisms } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

import PolymorphismsTable from './components/PolymorphismsTable';
import PagingButtons from 'components/buttons/PagingButtons';

// Stylesheets
import 'assets/styles/sequences.css';



const Polymorphisms = () => {

    const { polymorphisms, loading, error } = usePolymorphisms();
    console.log('poly', polymorphisms)

    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')
    const [currentItems, setCurrentItems] = useState([])


    const handlePageChange = (items) => {
        console.log(items)
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
    return (
        <div className="container">
        <h2>Polymorphisms</h2>
        <p>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} analyses sequences for these individual or combined amino acid substitutions and deletions.</p>

        {polymorphisms && 

                <div className='padding-table'>
                    <div><PagingButtons data={polymorphisms} onPageChange={handlePageChange}> </PagingButtons></div>
                    <a>Polymorphisms {startRecord} to {endRecord} of {polymorphisms.length}</a>

                    <PolymorphismsTable data={currentItems}/>

                </div>
            }

        </div>
    );
};
 
export default Polymorphisms;



