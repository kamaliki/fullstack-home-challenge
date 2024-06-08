import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useLazyQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
  query BooksQuery {
  books {
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

  const [searchBooks, { data, loading, error }] = useLazyQuery(BOOKS_QUERY, {
    variables: { title: query },
    onCompleted: (data) => {
      if (data && data.books) {
        setBooks(data.books);
      }
    },
  });

  const handleSearch = () => {
    if (query.trim() !== '') {
      searchBooks();
    }
  };

  return (
    <Box mb={2}>
      <TextField
        label="Search for books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
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
