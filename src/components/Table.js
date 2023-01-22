import React, { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFetch from '../hooks/useFetch';

function Table() {
  const { makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);
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

  return (
    <div>
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
