import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useLazyQuery, gql } from "@apollo/client";
import LinearProgress from '@mui/material/LinearProgress';
import { Book } from "../types/types"

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


interface SearchBarProps {
  setBooks: (books: Book[]) => void;
}

const SearchBar = ({ setBooks }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const [searchBooks, { data, loading, error }] = useLazyQuery(
    BOOKS_BY_TITLE_QUERY,
    {
      variables: { title: query },
      onCompleted: (data) => {
        if (data && data.booksByTitle) {
          setBooks(data.booksByTitle);
        }
      },
    }
  );

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchBooks();
    }
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      display="flex"
      justifyContent="center"
    >
      <TextField
        variant="outlined"
        label="Search by Title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        
      />
      {loading && <LinearProgress color="secondary" />}
      {error && <p>Error fetching books: {error.message}</p>}
    </Box>
  );
};

export default SearchBar;
