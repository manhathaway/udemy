import { useState } from 'react';
import { CONCEPTS, EXAMPLES } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import Tab from './components/Tab.jsx';
import TabContent from './components/TabContent.jsx';

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
    <div>
      <Header adj={adjs[index.adjective]} function={randomAdj}/>
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
          {CONCEPTS.map((concept, index) => <CoreConcept key={index} {...concept}/>)}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {tabs.map((tab, index) => <Tab key={index} onClick={() => selectContent(index)}>{tab}</Tab>)}
          </menu>
          {index.tab ? <TabContent {...EXAMPLES[index.tab]}/> : <div id="tab-content"><h3>No tab selected.</h3></div>}
        </section>
      </main>
    </div>
  );
};
