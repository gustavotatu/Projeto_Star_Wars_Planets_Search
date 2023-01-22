export default function FetchApi() {
  const makeFetch = async () => {
    const fetchApi = await fetch('https://swapi.dev/api/planets');
    const json = await fetchApi.json();
    return json;
  };

  return {
    makeFetch,
  };
}
