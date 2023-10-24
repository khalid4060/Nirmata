import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AboutCricketer from '../Components/AboutCricketer';

// Mock the useParams hook from react-router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '_1', // Provide the ID of a mock cricketer
  }),
}));

const players = [
  {
    id: '_1',
    name: 'Virat Kohli',
    description: 'Mock Description',
    type: 'batsman',
    points: 100,
    rank: 1,
    dob: 1000000000000, // A sample date of birth
  },
  // Add more mock players here if needed
];

describe('AboutCricketer Component', () => {
  it('renders cricketer details', () => {
    render(
      <MemoryRouter initialEntries={['/cricketer-details/_1']}>
      <Routes>
      <Route path="/cricketer-details/:id">
          <AboutCricketer />
        </Route>
      </Routes>
       
          
       
      </MemoryRouter>
    );

    // Check if the cricketer's name is displayed
    expect(screen.getByText('About Virat Kohli')).toBeInTheDocument();

    // Check if other details are displayed
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
    expect(screen.getByText('Type: batsman')).toBeInTheDocument();
    expect(screen.getByText('Points: 100')).toBeInTheDocument();
    expect(screen.getByText('Rank: 1')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth: 9/9/2001')).toBeInTheDocument();
    expect(screen.getByText('Age: 21')).toBeInTheDocument();
  });

  // You can add more test cases as needed, e.g., for similar players
});
