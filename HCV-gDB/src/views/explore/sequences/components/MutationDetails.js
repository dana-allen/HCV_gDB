// Stylesheets
import 'assets/styles/tables.css'

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import PagingButtonsSlim from 'components/buttons/PagingButtonsSlim';
// Stylesheets
import 'assets/styles/tables.css'

import { Button } from 'react-bootstrap';
const MutationDetails = ({ mutations }) => {

    const [search, setSearch] = useState('');
    const [startRecord, setStartRecord] = useState('');
    const [endRecord, setEndRecord] = useState('');
    const [currentItems, setCurrentItems] = useState([]);

    // 🔍 Filter data based on search
    const filteredData = useMemo(() => {
        if (!Array.isArray(mutations)) return [];
        return mutations.filter(seq =>
            seq.signature_id
                ?.toLowerCase()
                .includes(search.toLowerCase().trim())
        );
    }, [mutations, search]);

    const handlePageChange = (items) => {
        setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2]);
    };


    useEffect(() => {
        if (filteredData.length > 0) {
            handlePageChange([filteredData.slice(0, 10), 1, Math.min(10, filteredData.length)]);
        } else {
            setCurrentItems([]);
            setStartRecord(0);
            setEndRecord(0);
        }
    }, [search, filteredData]);

    
    return (
        <div >
            <div >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                        }}
                    >
                <h4 className='title-sub'>Anti-Viral Mutations</h4>
                <div style={{ whiteSpace: "nowrap", marginLeft: "auto" }}>
                    <FontAwesomeIcon icon={faDownload}/>
                </div>
                
                </div>
                
                </div>
            </div>
            <table className="table table-striped table-bordered table-font-12">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                             <div>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                Polymorphisms {startRecord} to {endRecord} of {filteredData.length}
                                </span>
                            </div>
                            {/* Top row: search + paging */}
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                                {/* Search input */}
                                <div style={{ position: "relative", flex: 1 }}>
                                <i
                                    className="fa fa-search"
                                    style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "8px",
                                    transform: "translateY(-50%)",
                                    color: "#888"
                                    }}
                                ></i>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search polymorphism..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                    paddingLeft: "28px",
                                    fontSize: "12px",
                                    height: "30px"
                                    }}
                                />
                                </div>

                                {/* Paging buttons */}
                                <div style={{ whiteSpace: "nowrap" }}>
                                <PagingButtonsSlim
                                    data={filteredData}
                                    onPageChange={handlePageChange}
                                />
                                </div>
                            </div>
                            </div>
                        </th>
                        </tr>
                        <tr>
                            <th>Gene</th>
                            <th>Polymorphism</th>
                            <th>Type</th>
                        </tr>
                </thead>

                <tbody>
                    {currentItems.map((mutation, i) => (
                        <tr key={i}>
                            <td>{mutation.signature_id.split(':')[0]}</td>
                            <td>
                                <Link
                                    className='gdb-link'
                                    to={`/polymorphism/${mutation.signature_id}`}
                                >
                                    {mutation.signature_id.split(':')[1]}
                                </Link>
                            </td>
                            <td >{mutation.signature_kind}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default MutationDetails;