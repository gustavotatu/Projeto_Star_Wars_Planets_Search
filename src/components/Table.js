import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFetch from '../hooks/useFetch';

function Table() {
  const { makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
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

  const filterByName = ({ target: { value } }) => {
    const lowerCaseValue = value.toLowerCase();
    const originalPLanets = contextPlanets;
    console.log(value);
    setPlanets(originalPLanets
      .filter(({ name }) => name.toLowerCase().includes(lowerCaseValue)));
    if (value.length === 0) {
      setPlanets(contextPlanets);
    }
  };

  const filterByNumbers = () => {
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
    console.log('kkkk');
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
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
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
