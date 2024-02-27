import './App.css';
import Grid from './Components/Grid';
import JobDetails from './Components/JobDetails';
import ServiceAdd from './Components/ServiceAdd';
import Table from './Components/Table';
import Testtable from './Components/Testtable';


function App() {
  return (
    <div className="App">
      <div className='Left-content'>
        <JobDetails/>
        <Table/>
        <ServiceAdd/>
        <Testtable/>
      </div> 

      {/* we are commenting */}

      <div className='Right-content'>

        <Grid/>
      </div>
      
    </div>
  );
}

export default App;
