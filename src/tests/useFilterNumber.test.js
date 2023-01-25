import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa o hook useFilterNumber', () => {
  test('Testa o filtro maior que', () => {
    render(<App />)

    const inputNumber = screen.getByTestId('value-filter');
    userEvent.type(inputNumber, '1000000');

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    const getPlanets = screen.getAllByRole('row');

    setTimeout(() => expect(getPlanets).toHaveLength(7), '1');
  })

  test('Testa o filtro menor que', () => {
    render(<App />)

    const inputNumber = screen.getByTestId('value-filter');
    userEvent.type(inputNumber, '1000000');

    const select = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(select, 'menor que')

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    const getPlanets = screen.getAllByRole('row');

    setTimeout(() => expect(getPlanets).toHaveLength(3), '1');
  })
})
