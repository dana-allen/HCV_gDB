import React, { useEffect, useState } from "react";
import { groupPathsByTags } from 'utils/apiHelper';

const APITable = () => {


    const [api, setApi] = useState({paths:{}})
    const [groupedPaths, setGroupedPaths] = useState({});

    const fetchJSONDataFrom = (path) => {
        fetch(path)
        .then((response) => {return response.json()})
        .then((jsonData) => {

            setApi(jsonData); 
            setGroupedPaths(groupPathsByTags(jsonData.paths));
        });
      }


    useEffect(() => {
        fetchJSONDataFrom(`${process.env.PUBLIC_URL}/json/openapi_new.json`);
    }, []);

    return (
        <div></div>
        
    )
};

export default APITable;