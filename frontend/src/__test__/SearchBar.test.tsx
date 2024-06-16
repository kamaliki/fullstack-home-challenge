import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SearchBar, { BOOKS_BY_TITLE_QUERY } from '../components/SearchBar';
import { Book } from '../types/types';

const mockBooks: Book[] = [
  {
    title: "Book 1",
    author: "Author 1",
    coverPhotoURL: "url1",
    readingLevel: "Level 1",
  },
  {
    title: "Book 2",
    author: "Author 2",
    coverPhotoURL: "url2",
    readingLevel: "Level 2",
  },
];

const mocks = [
  {
    request: {
      query: BOOKS_BY_TITLE_QUERY,
      variables: { title: 'Book' },
    },
    result: {
      data: {
        booksByTitle: mockBooks,
      },
    },
  },
];

// Mock function for setBooks
const mockSetBooks = jest.fn();

test('renders the SearchBar component and performs search', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchBar setBooks={mockSetBooks} />
    </MockedProvider>
  );

  // Check if search input and button are present
  const searchInput = screen.getByPlaceholderText('Search books by title');
  expect(searchInput).toBeInTheDocument();

  // Type 'Book' into the search input and press Enter
  fireEvent.change(searchInput, { target: { value: 'Book' } });
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

  // Expect loading indicator to be present
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Wait for the query to complete and results to render
  await waitFor(() => {
    expect(mockSetBooks).toHaveBeenCalledWith(mockBooks);
  });
});
