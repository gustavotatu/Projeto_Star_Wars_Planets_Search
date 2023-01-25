import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFetch from '../hooks/useFetch';
import useFilterName from '../hooks/useFilterName';
import useFilterNumber from '../hooks/useFilterNumber';
import useFilterRemove from '../hooks/useFilterRemove';

function Table() {
  const defaultColumns = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water',
  ];
  const { makeFetch } = useFetch();
  const { nameFilter } = useFilterName();
  const { numberFilter } = useFilterNumber();
  const { removeFilterHook } = useFilterRemove();
  const [planets, setPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [columnList, setColumnList] = useState(defaultColumns);
  const [filterList, setFilterList] = useState([]);
  const [columnOrder, setColumnOrder] = useState('population');
  const [chosenOrder, setChosenOrder] = useState();
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
    nameFilter(value, setPlanets);
  };
  const filterByNumbers = () => {
    numberFilter([
      setColumnList,
      columnList,
      column,
      filterList,
      comparison,
      numberValue,
      setFilterList,
      setPlanets,
      planets,
    ]);
  };
  const removeAllFilters = () => {
    setPlanets(contextPlanets);
    setFilterList([]);
    setColumnList(defaultColumns);
  };
  const removeFilter = ({ target: { id } }) => {
    removeFilterHook([
      id,
      filterList,
      setFilterList,
      columnList,
      setColumnList,
      setPlanets,
    ]);
  };
  const orderPlanets = () => {
    const unknowns = planets.filter((obj) => obj.population === 'unknown');
    let sortedPlanets = [];
    if (chosenOrder === 'asc') {
      sortedPlanets = [...planets
        .sort((a, b) => {
          if (a === 'unknown') {
            return false;
          }
          return Number(a[columnOrder]) - Number(b[columnOrder]);
        })];
    } else {
      sortedPlanets = [...planets
        .sort((a, b) => {
          if (a === 'unknown') {
            return false;
          }
          return Number(b[columnOrder]) - Number(a[columnOrder]);
        })];
    }
    if (columnOrder === 'population') {
      const removedUnknowns = sortedPlanets.filter((obj) => obj.population !== 'unknown');
      removedUnknowns.push(unknowns[0]);
      removedUnknowns.push(unknowns[1]);
      return setPlanets(removedUnknowns);
    }
    return setPlanets(sortedPlanets);
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
      <div>
        <select
          data-testid="column-sort"
          onChange={ ({ target: { value } }) => setColumnOrder(value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <label htmlFor="asc-button">
          <input
            id="asc-button"
            type="radio"
            name="order-button"
            data-testid="column-sort-input-asc"
            onClick={ () => setChosenOrder('asc') }
          />
          Ascendente
        </label>
        <label htmlFor="desc-button">
          <input
            id="desc-button"
            type="radio"
            name="order-button"
            data-testid="column-sort-input-desc"
            onClick={ () => setChosenOrder('desc') }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ orderPlanets }
        >
          Ordenar
        </button>
      </div>
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
            <td data-testid="planet-name">{ obj.name }</td>
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
