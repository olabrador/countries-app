import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListItem, { ListItemProps } from './ListItem';

describe('ListItem', () => {
  const handleSelection = jest.fn();

  const props: ListItemProps = {
    country: {
      id: 1,
      country_name: 'some-country',
      performance_oriented: 2.8,
      autocratic: 2.1,
      modesty: 5,
      country_cluster: 'some-country-cluster',
      charisma: 1,
      decisive: 7.8,
      date_added: '',
    },
    loading: false,
    selected: [],
    handleSelection,
  };

  it('renders the country name', () => {
    render(<ListItem {...props} />);
    expect(screen.getByText('some-country')).toBeInTheDocument();
  });

  it('calls handleSelection when clicked', () => {
    render(<ListItem {...props} />);
    fireEvent.click(screen.getByText('some-country'));
    expect(handleSelection).toHaveBeenCalledWith(props.country);
  });

  it('has the "selected" class when selected', () => {
    render(<ListItem {...props} selected={[props.country]} />);
    expect(screen.getByText('some-country')).toHaveClass('selected');
  });

  it('is disabled when loading', () => {
    render(<ListItem {...props} loading />);
    expect(screen.getByText('some-country')).toBeDisabled();
  });
});
