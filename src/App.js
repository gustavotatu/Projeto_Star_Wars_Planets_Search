import React from 'react';
import PlanetsContext from './context/PlanetsContext';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <PlanetsContext.Provider>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
