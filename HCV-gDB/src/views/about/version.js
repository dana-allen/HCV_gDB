
import { useApiEndpoint } from "hooks";
import 'assets/styles/tables.css'
const packageJson = require('../../../package.json'); 

const Version = () => {
    
    const url = `api/version`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    return (
        <table className="table table-striped table-bordered table-font-12 table-width-50">
            <tbody>
                { endpointData.map((version, i) => (
                    <tr key={i}>
                        <td><b>{version.Software}</b></td>
                        <td>{version.Version}</td>
                    </tr>
                ))}
                <tr>
                    <td><b>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} version</b></td>
                    <td>{packageJson.version}</td>
                </tr>
            </tbody>
        </table>
    );
};
 
export default Version;
