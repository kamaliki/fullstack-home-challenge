// App.test.tsx

import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import App from '../App';
import { ALL_BOOKS_QUERY } from '../components/BookList';

const mocks: MockedResponse[] = [
  {
    request: {
      query: ALL_BOOKS_QUERY,
    },
    result: {
      data: {
        books: [
          {
            title: "Book 1",
            author: "Author 1",
            coverPhotoURL: "url1",
            readingLevel: "Level 1",
          },
        ],
      },
    },
  },
];

test('renders the App component without errors', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  // Test for elements rendered in App component
  expect(await screen.findByText('All Books')).toBeInTheDocument();
  expect(await screen.findByText('Reading List')).toBeInTheDocument();
});
