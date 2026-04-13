
import React, { memo } from "react";
import TreeView from './TreeView';

import { useLineage } from 'hooks'

const CladeTree = ({ onCladeSelect }) => {

    // const [features, setFeatures] = useState([]);
    const { lineageTree, loading, error } = useLineage();

    const handleItemClick = (id) => {

        var params = {};

        if (id[1] === null) {
            params["EPA_major_clade"] = id[0]
            params["EPA_minor_clade"] = null
        } else {
            params["EPA_minor_clade"] = id[0]
            params["EPA_major_clade"] = id[1]
            
        }

        onCladeSelect(params)
    }

    return (
        <div>
            {lineageTree && 
                <div>
                    <TreeView data={lineageTree}
                            enableLinks={true}
                            expanded={false}
                            onClick={handleItemClick}
                            style={{
                                paddingLeft:0,
                                height: 240,
                                maxWidth: 400,
                                flexGrow: 1,
                            }} 
                    />
                    <br></br>
                </div>
            }
        </div>
    );
};

export default memo(CladeTree);