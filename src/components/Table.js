import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { makeFetch } = useFetch();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const planetsWithResidents = await makeFetch();
      const planetsInfo = planetsWithResidents.results
        .map((obj) => {
          delete obj.residents;
          return obj;
        });
      setPlanets(planetsInfo);
    };

    getPlanets();
  }, []);

  return (
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
  );
}

export default Table;
