import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'assets/styles/pagingButtons.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

const PagingButtonsSlim = ({ data, onPageChange}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [startRecord, setStartRecord] = useState(0);

    useEffect(() => {
        // Calculate the current items based on pagination state
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        // const startRecord = indexOfFirstItem + 1;
        const endRecord = Math.min(indexOfLastItem, data.length);
        setStartRecord(indexOfFirstItem + 1)
        

        // Pass the current items back to the parent component
        onPageChange([currentItems, startRecord, endRecord]);
    }, [currentPage, itemsPerPage, startRecord, data]);

    const handlePageIncrease = () => {setCurrentPage(prev => prev + 1);};
    const handlePageDecrease = () => {setCurrentPage(prev => prev - 1);};


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <div>
        <div>
        
            <div className="btn-group">                
                <Button size="sm" className="paging-buttons" disabled={currentPage === 1 | pageNumbers.length === 0} onClick={handlePageDecrease}> <FontAwesomeIcon icon={faArrowLeft}/> </Button> {''}
                <Button size="sm" className="paging-buttons" disabled={currentPage === pageNumbers.length | pageNumbers.length === 0} onClick={handlePageIncrease}> <FontAwesomeIcon icon={faArrowRight}/> </Button> {''}
            </div> {''}
            
        </div>
    </div>
  );
};

export default PagingButtonsSlim;
