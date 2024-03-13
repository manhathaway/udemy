import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import TableRow from './components/TableRow';
import { calculateInvestmentResults } from './util/investment';

const App = () => {
  const [annualData, setAnnualData] = useState([]);
  const formFunction = (input) => {
    setAnnualData(() => {
      return [...calculateInvestmentResults({...input})];
    });
  };

  return (
    <>
      <Header/>
      <Form formFunction={formFunction}/>
      {annualData.length !== 0 ?
      <table id="result">
        <TableRow header/>
        {annualData.map((data, index) =>
          <TableRow key={index + 1} {...data}/>
        )}
      </table>
      :
      <p className="no-data">No data to show.</p>}
    </>
  );
}

export default App;
