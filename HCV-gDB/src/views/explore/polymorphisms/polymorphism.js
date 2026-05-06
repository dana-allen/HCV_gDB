import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Hooks and Contexts
import { usePolymorphism } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

import PolymorphismTable from './components/PolymorphismTable';

// Stylesheets
import 'assets/styles/sequences.css';

import ResistanceCategoryBlurb from './components/ResistanceCategoryBlurb';
import SequencesTable from './components/SequencesTable';

 

const Polymorphism = () => {

  const { id } = useParams()
  const gene = id.split(':')[0]
  const combination = id.split(':')[1]
  const { polymorphism, sequences, loading, error } = usePolymorphism(id);
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
              <ResistanceCategoryBlurb />

                

            </div>
            <SequencesTable data={sequences} />
            
            

           
             
            </div>
            
        }

    </div>
  );
};
 
export default Polymorphism;



