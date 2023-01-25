import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterRemove() {
  const { contextPlanets } = useContext(PlanetsContext);

  const removeFilterHook = ([
    id,
    filterList,
    setFilterList,
    columnList,
    setColumnList,
    setPlanets,
  ]) => {
    const targetFilter = filterList[id];
    const filters = filterList.filter((obj) => obj !== targetFilter);
    setFilterList(filters);
    const currentColunms = columnList;
    currentColunms.push(targetFilter.column);
    setColumnList(currentColunms);
    const defaultPlanets = contextPlanets;
    let currentPlanets = [];
    if (filters.length === 0) setPlanets(contextPlanets);
    if (filters.length !== 0) {
      for (let i = 0; i < filters.length; i += 1) {
        switch (filters[i].comparison) {
        case 'maior que':
          currentPlanets = defaultPlanets
            .filter((obj) => (
              Number(obj[filters[i].column]) > Number(filters[i].numberValue)));
          break;
        case 'menor que':
          currentPlanets = defaultPlanets
            .filter((obj) => (
              Number(obj[filters[i].column]) < Number(filters[i].numberValue)));
          break;
        case 'igual a':
          currentPlanets = defaultPlanets
            .filter((obj) => (
              Number(obj[filters[i].column]) === Number(filters[i].numberValue)));
          break;
        default:
          break;
        }
      }
      setPlanets(currentPlanets);
    }
  };

  return {
    removeFilterHook,
  };
}
