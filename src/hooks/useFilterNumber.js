export default function FilterNumber() {
  const numberFilter = ([
    setColumnList,
    columnList,
    column,
    filterList,
    comparison,
    numberValue,
    setFilterList,
    setPlanets,
    planets,
  ]) => {
    setColumnList(columnList.filter((str) => str !== column));
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

  return {
    numberFilter,
  };
}
