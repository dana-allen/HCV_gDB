const MetaDataDownload = ({filters}) => {

    const download = async (params) => {
        try {
            // setLoading(true);

            const query_params = new URLSearchParams(params).toString();

            const url = `/api/sequences/download_sequences_meta_data/${
                query_params ? `?${query_params}` : ""
            }`;
            console.log(url)

            const res = await fetch(url);

            const blob = await res.blob();

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "meta_data.csv";
            link.click();

        } catch (err) {
            // setError(err);
        } finally {
            // setLoading(false);
        }
    };


    const handleOnClick = () => {
        download({...filters});
    };


    return (
        <div>
            <a onClick={handleOnClick}>Download Meta-data</a>
        </div>

    );
};

export default MetaDataDownload;