import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFetch from '../hooks/useFetch';

function Table() {
  const defaultColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const { makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [columnList, setColumnList] = useState(defaultColumns);
  const [removedColumns, setRemovedColumns] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const { contextPlanets, setContextPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    const getPlanets = async () => {
      const planetsWithResidents = await makeFetch();
      const planetsInfo = planetsWithResidents.results
        .map((obj) => {
          delete obj.residents;
          return obj;
        });
      setContextPlanets(planetsInfo);
      setPlanets(planetsInfo);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setColumn(columnList[0]);
  }, [columnList]);

  const filterByName = ({ target: { value } }) => {
    const lowerCaseValue = value.toLowerCase();
    const originalPLanets = contextPlanets;
    setPlanets(originalPLanets
      .filter(({ name }) => name.toLowerCase().includes(lowerCaseValue)));
    if (value.length === 0) {
      setPlanets(contextPlanets);
    }
  };

  const filterByNumbers = () => {
    setColumnList(columnList.filter((str) => str !== column));
    const RMColumns = removedColumns;
    RMColumns.push(column);
    setRemovedColumns(RMColumns);
    const filters = filterList;
    filters.push({
      column,
      comparison,
      numberValue,
    });
    setFilterList(filters);

    switch (comparison) {
    case 'maior que':
      return setPlanets(planets
        .filter((obj) => Number(obj[column]) > Number(numberValue)));

    case 'menor que':
      return setPlanets(planets
        .filter((obj) => Number(obj[column]) < Number(numberValue)));

    case 'igual a':
      return setPlanets(planets
        .filter((obj) => Number(obj[column]) === Number(numberValue)));

    default:
      break;
    }
  };

  const removeAllFilters = () => {
    setPlanets(contextPlanets);
    setFilterList([]);
    setColumnList(defaultColumns);
  };

  const removeFilter = ({ target: { id } }) => {
    const targetFilter = filterList[id];
    const filters = filterList.filter((obj) => obj !== targetFilter);
    setFilterList(filters);

    const currentColunms = columnList;
    currentColunms.push(targetFilter.column);
    setColumnList(currentColunms);

    const defaultPlanets = contextPlanets;
    let currentPlanets = [];

    if (filters.length === 0) {
      setPlanets(contextPlanets);
    } else {
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

  return (
    <div>
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setColumn(value) }
        >
          { columnList.map((option) => (
            <option key={ option }>{ option }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setComparison(value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        defaultValue={ 0 }
        onChange={ ({ target: { value } }) => setNumberValue(value) }
      />
      <input
        type="button"
        data-testid="button-filter"
        value="Filtrar"
        onClick={ filterByNumbers }
      />
      <label htmlFor="name-filter">
        Nome:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ filterByName }
        />
      </label>
      { filterList.length > 0
      && filterList.map((obj, i) => (
        <div key={ i } data-testid="filter">
          <p>{ `${obj.column} ${obj.comparison} ${obj.numberValue}` }</p>
          <button id={ i } onClick={ removeFilter }>Remover Filtro</button>
        </div>
      )) }
      { filterList.length > 0
      && (
        <button
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>) }
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        { planets && planets.map((obj) => (
          <tr key={ obj.name }>
            <td>{ obj.name }</td>
            <td>{ obj.rotation_period }</td>
            <td>{ obj.orbital_period }</td>
            <td>{ obj.diameter }</td>
            <td>{ obj.climate }</td>
            <td>{ obj.gravity }</td>
            <td>{ obj.terrain }</td>
            <td>{ obj.surface_water }</td>
            <td>{ obj.population }</td>
            <td>{ obj.films }</td>
            <td>{ obj.created }</td>
            <td>{ obj.edited }</td>
            <td>{ obj.url }</td>
          </tr>
        )) }
      </table>
    </div>
  );
}
export default Table;
