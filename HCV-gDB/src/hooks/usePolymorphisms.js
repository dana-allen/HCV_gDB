import useFetch from "./useFetch";

function usePolymorphisms() {
    

    const url = `/api/polymorphisms/`;

    const { data, ...rest } = useFetch(url);
    console.log("polymorphisms", data)

    const polymorphisms = data
    console.log("polys", polymorphisms)

    return { polymorphisms, ...rest };

};

export default usePolymorphisms;