import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useLazyQuery, gql } from '@apollo/client';

const BOOKS_BY_TITLE_QUERY = gql`
  query BooksByTitleQuery($title: String!) {
    booksByTitle(title: $title) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface SearchBarProps {
  setBooks: (books: Book[]) => void;
}

const SearchBar = ({ setBooks }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const [searchBooks, { data, loading, error }] = useLazyQuery(BOOKS_BY_TITLE_QUERY, {
    variables: { title: query },
    onCompleted: (data) => {
      if (data && data.booksByTitle) {
        setBooks(data.booksByTitle);
      }
    },
  });

  const handleSearch = () => {
    if (query.trim() !== '') {
      searchBooks();
    }
  };

  return (
    <Box mb={2} display="flex" justifyContent="center">
      <TextField
        label="Search for books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        sx={{
          borderRadius: '20px', // Curve the edges
          mb: 2, // Add margin bottom
        }}
      />
      {loading && <p>Loading...</p>}
      {error && (
        <p>Error fetching books: {error.message}</p>
      )}
    </Box>
  );
};

export default SearchBar;
