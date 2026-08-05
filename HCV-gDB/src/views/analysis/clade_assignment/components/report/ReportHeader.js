import React from 'react';
import 'assets/styles/report.css'

const ReportHeader = ( { sequenceId } ) => {
    

    const reportDate = new Date().toLocaleDateString("en-GB");
    return (
        <div id="block1">
            <div id="titleAndOverview">
                <h2>Hepatitis C virus sequence report</h2>
            
                <table id="overview">
                
                    <colgroup>
                        <col class="tableHeader"/>
                        <col/>
                    </colgroup>

                    <tr>
                        <td><b>Sequence ID</b></td>
                        <td>{sequenceId}</td>
                    </tr>
                    <tr>
                        <td><b>Report generation date</b></td>
                        <td>{reportDate}</td>
                    </tr>
                </table>
            </div>
            <div id="logos">
                <img className="pheLogo" alt="PHE" src="/static/imgs/footer/PHE.png"></img>
                <img className="cvrLogo" alt="CVR" src="/static/imgs/footer/cvrBioinformatics.png"/>
            </div>
        </div>

    );
};

export default ReportHeader;
