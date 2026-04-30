
import { ReactSVG } from 'react-svg';
import Cards from './components/Cards'

// Style Sheets 
import 'assets/styles/home.css'

const Home = () => {

    return (  
        <div>  
            <div className="banner banner-gradient-spots">
                <img 
                    className='banner-logo'
                    src="/static/imgs/icons/vgdb_logo.svg"
                    alt="Viral Genome Database logo"
                />
                <div className='banner-text-container'>
                    <h2 className='banner-title'><b>{process.env.REACT_APP_VIRUS_ABB}-gDB</b></h2>
                    <h2 className='banner-subtitle'>A {process.env.REACT_APP_VIRUS_NAME} Virus Genome Database Resource</h2>
                </div>
                <ReactSVG className="banner-svg" src="/icons/home_background.svg" />
            </div>

            <Cards></Cards>
            
            <hr></hr>

            <div className="container">
                <div className='info-container'>
                    <h4 className='primary-color'>What is Hepatitis C?</h4>
                    <p>
                        Hepatitis C virus (HCV) affects over 100 million people worldwide and can lead to liver disease and occasionally cirrhosis. 
                        While direct-acting antiviral drugs (DAAs) have improved treatment prospects for HCV significantly, drug resistance has 
                        emerged both in vitro and in clinical trials. HCV exhibits a high level of genetic variation and so there is a need for 
                        computational resources to organise and analyse existing and new HCV sequence data in research, public health and 
                        clinical contexts.
                    </p>
                </div>
                <div className='info-container'>
                    <h4 className='primary-color'>Why {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}?</h4>
                    <p>
                        {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} is a data-centric bioinformatics resource which organises {process.env.REACT_APP_VIRUS_ABB} genome sequence data along evolutionary lines. 
                        {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} aims to leverage new and existing sequences in order to improve our understanding of the epidemiology and pathology of RABV.
                    </p>
                    
                    <p>
                        The web version of {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} can be used for basic analysis. An offline version of the resource 
                        can be used for more advanced work.
                    </p>
                
                </div>
            </div>
      </div> 
    );
};
 
export default Home;