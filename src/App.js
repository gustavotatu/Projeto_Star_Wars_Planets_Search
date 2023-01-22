import React, { useState } from 'react';
import PlanetsContext from './context/PlanetsContext';
import './App.css';
import Table from './components/Table';

function App() {
  const [contextPlanets, setContextPlanets] = useState([]);

  return (
    <PlanetsContext.Provider value={ { contextPlanets, setContextPlanets } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
