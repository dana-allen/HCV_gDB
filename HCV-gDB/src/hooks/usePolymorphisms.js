import useFetch from "./useFetch";
import { useMemo } from 'react';

function usePolymorphisms(params) {

    const query_params = new URLSearchParams(Object.entries(params).sort()).toString();
    const url =  `/api/polymorphisms/${query_params ? `?${query_params}` : ''}`;

    const { data, ...rest } = useFetch(url);
    console.log("polymorphisms", data)

    
    
    const polymorphisms = useMemo(() => {

        if (!data) return null;

        console.log("building polymorphisms");

        return Object.values(
            data.reduce((acc, item) => {

                if (!acc[item.signature_id]) {
                    acc[item.signature_id] = {
                        signature_id: item.signature_id,
                        signature_kind: item.signature_kind,
                        protein_name: item.protein_name,
                        mutation_type: item.mutation_type,
                        aa_positions: [],
                        drugs: [],
                        genotypes: []
                    };
                }

                if (
                   item.aa_position &&
                    !acc[item.signature_id]
                        .aa_positions
                        .includes(item.aa_position)
                ) {
                    acc[item.signature_id]
                        .aa_positions
                        .push(item.aa_position);
                }

                if (
                    item.drug &&
                    !acc[item.signature_id]
                        .drugs
                        .includes(item.drug)
                ) {
                    acc[item.signature_id]
                        .drugs
                        .push(item.drug);
                } if (
                    item.alignment_name &&
                    !acc[item.signature_id]
                        .genotypes
                        .includes(item.alignment_name)
                ) {
                    acc[item.signature_id]
                        .genotypes
                        .push(item.alignment_name);
                }

                return acc;

            }, {})
        );

    }, [data]); // ← only recalculate if data changes
    // const polymorphisms = uniquePolymorphisms
    console.log("polys", polymorphisms)

    return { polymorphisms, ...rest };

};

export default usePolymorphisms;