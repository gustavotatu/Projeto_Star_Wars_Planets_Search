import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterName() {
  const { contextPlanets } = useContext(PlanetsContext);

  const nameFilter = (value, setPlanets) => {
    const lowerCaseValue = value.toLowerCase();
    const originalPLanets = contextPlanets;
    setPlanets(originalPLanets
      .filter(({ name }) => name.toLowerCase().includes(lowerCaseValue)));
    if (value.length === 0) setPlanets(contextPlanets);
  };

  return {
    nameFilter,
  };
}
