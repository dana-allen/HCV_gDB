import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Hooks and Contexts
import { usePolymorphism } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

import PolymorphismTable from './components/PolymorphismTable';

// Stylesheets
import 'assets/styles/sequences.css';

import { resistanceCategoryBlurb } from 'assets/javascript/formatHelper'
import ResistanceCategoryBlurb from './components/ResistanceCategoryBlurb';

 

const Polymorphism = () => {

  const { id } = useParams()
  const gene = id.split(':')[0]
  const combination = id.split(':')[1]
  const { polymorphism, loading, error } = usePolymorphism(id);
  console.log('poly', polymorphism)

  // Contexts
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  const { triggerError } = useErrorHandler();

  useEffect(() => {
    
        triggerLoadingWheel(loading)
        if (error) triggerError(error);
    
    }, [loading, error]);
  return (
    <div className="container">
      <h2>{gene} polymorphism {combination}</h2>

      {polymorphism && 
      <div>

            <div className='padding-table'>

                <PolymorphismTable data={polymorphism}/>

            </div>
            <ResistanceCategoryBlurb />
             
            </div>
            
        }

    </div>
  );
};
 
export default Polymorphism;



