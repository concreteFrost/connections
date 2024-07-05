import { render, screen } from '@testing-library/react';
import Test from './Test';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});