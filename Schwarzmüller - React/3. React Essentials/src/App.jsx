import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts/CoreConcepts.jsx';
import Examples from './components/Examples/Examples.jsx';

export default function App() {
  const adjs = ['Fundamental', 'Crucial', 'Core'];
  const tabs = ['Components', 'JSX', 'Props', 'State'];

  const [index, setIndex] = useState({
    adjective: 0,
    tab: null
  });

  const randomAdj = () => {
    const random = Math.floor(Math.random() * adjs.length);
    setIndex((previous) => {
      return {
        adjective: random === previous.adjective ? previous.adjective - 1 : random,
        tab: previous.tab
      };
    });
  };

  const selectContent = (index) => {
    setIndex(previous => {
      return {
        adjective: previous.adjective,
        tab: tabs[index].toLowerCase()
      };
    });
  };

  return (
    <>
      <Header adj={adjs[index.adjective]} function={randomAdj} />
      <main>
        <CoreConcepts />
        <Examples tabs={tabs} index={index} function={selectContent} />
      </main>
    </>
  );
};
