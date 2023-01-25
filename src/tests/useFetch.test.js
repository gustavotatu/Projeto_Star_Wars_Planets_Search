import useFetch from '../hooks/useFetch';
import json from '../mocks/mockApiReturn';

describe('Testa o hook useFetch', () => {
  test('Testa se o retorno da função makeFetch é o esperado', async () => {
    const { makeFetch } = useFetch();
    const response = await makeFetch();

    expect(response).toEqual(json);
  });
});
