import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Table from './Table';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('Table', () => {
  it('renders correctly', () => {
    const mockData = [
      {
        id: 4,
        country_name: 'Country 1',
        performance_oriented: 2.5,
        autocratic: 1.8,
        decisive: 7,
      },
      {
        id: 2,
        country_name: 'Country 2',
        performance_oriented: 98,
        autocratic: 5.4,
        decisive: 2,
      },
    ];

    // Mock the useContext hook
    // @ts-ignore
    React.useContext.mockImplementation(() => ({ selected: mockData }));

    render(<Table />);

    // Check if the country names are rendered
    expect(screen.getByText('Country 1')).toBeTruthy();
    expect(screen.getByText('Country 2')).toBeTruthy();

    // Check if the performance data is rendered
    expect(screen.getByText('2.5')).toBeTruthy();
    expect(screen.getByText('98')).toBeTruthy();

    // Check if the autocratic data is rendered
    expect(screen.getByText('1.8')).toBeTruthy();
    expect(screen.getByText('5.4')).toBeTruthy();

    // Check if the decisive data is rendered
    expect(screen.getByText('7')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });
});