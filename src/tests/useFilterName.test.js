import { getByTestId, render, screen } from '@testing-library/react';
import App from '../App';
import useFilterName from '../hooks/useFilterName';
import userEvent from '@testing-library/user-event';

describe('Testa o hook useFilterName', () => {
  test('Testa a função nameFilter', () => {
    render(<App />)
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'hoth');
    const planetName = screen.getAllByRole('row');
    setTimeout(() => expect(planetName).toHaveLength(2), '1000');
  })
})
