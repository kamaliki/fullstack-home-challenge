import { useState } from "react";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import { useLazyQuery, gql } from "@apollo/client";
import LinearProgress from '@mui/material/LinearProgress';
import { Book } from "../types/types";

export const BOOKS_BY_TITLE_QUERY = gql`
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

  const [searchBooks, { loading, error }] = useLazyQuery(
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
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        backgroundColor: "#ffffff", // Background color of the search bar
        padding: "5px",
        border: "2px solid #28B8B8", // Border color
        "&:focus-within": {
          borderColor: "primary", // Border color on focus
        },
        justifyContent: "center",
        m:4,
      }}
    >
      <SearchIcon />
      <InputBase
        placeholder="Search books by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        sx={{ ml: 1 }}
      />
      {loading && <LinearProgress color="secondary" />}
      {error && <p>Error fetching books: {error.message}</p>}
    </Box>
  );
};

export default SearchBar;
