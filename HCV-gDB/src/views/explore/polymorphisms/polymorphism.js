import { useState,  useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Hooks and Contexts
import { usePolymorphism } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

import PolymorphismTable from './components/PolymorphismTable';
import PolymorphismChart from './components/PolymorphismChart';
import CladeFrequencyChart from './components/CladeFrequencyChart';


// Stylesheets
import 'assets/styles/sequences.css';

import ResistanceCategoryBlurb from './components/ResistanceCategoryBlurb';
import SequencesTable from './components/SequencesTable';

 

const Polymorphism = () => {

  const { id } = useParams()

  const [gene, mutationString] = id.split(":");

  const polymorphisms = mutationString.split("+");

  const split_polymorphisms = mutationString
    .split("+")
    .filter(Boolean)
    .map(mutation => {
      const match = mutation.match(/^(\d+)([A-Z])$/);

      if (!match) return null;

      const [, pos, aa] = match;

      return {
        position: Number(pos),
        aa,
      };
    })
  .filter(Boolean);

  const aaPositions = split_polymorphisms.map(p => p.position);

  // const combination = id.split(':')[1]
  // const aminoAcidIndex = combination.slice(0, -1)

  const { polymorphism, sequences, chart_data, loading, error } = usePolymorphism(id);


  // Contexts
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  const { triggerError } = useErrorHandler();

  useEffect(() => {
    
    triggerLoadingWheel(loading)
    if (error) triggerError(error);
    
  }, [loading, error]);
  return (
    <div className="container">
      <h2>{id}</h2>

      {polymorphism && 
        <div>
          <div className='padding-table'>
            <PolymorphismTable data={polymorphism}/>
            <ResistanceCategoryBlurb />
          </div>

          <div className="row">
            
            <div className="col-md-6">
              <SequencesTable data={sequences} clades={chart_data && chart_data["meta_data"]}/>
            </div>
            <div className="col-md-6">
              <CladeFrequencyChart data={chart_data} />
            </div>

          </div>
          
          <PolymorphismChart data={chart_data} aminoAcidIndex={aaPositions}/>
          
        </div>
            
      }

    </div>
  );
};
 
export default Polymorphism;



