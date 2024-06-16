import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BookCard from './BookCard';
import { Book } from '../types/types';

/**
 * GraphQL query to fetch all books.
 * @returns {QueryResult} The result of the query.
 */
export const ALL_BOOKS_QUERY = gql`
  query AllBooksQuery {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;


interface BookListProps {
  setBooks: (books: Book[]) => void;
  onAddToReadingList: (book: Book) => void;
  readingList: Book[];
}

/**
 * Component that displays a list of books.
 * @param {Book[]} setBooks - Function to set the list of books.
 * @param {Function} onAddToReadingList - Function to add a book to the reading list.
 * @param {Book[]} readingList - List of books in the reading list.
 * @returns {JSX.Element} The BookList component.
 */
const BookList = ({ setBooks, onAddToReadingList, readingList }: BookListProps) => {
  const [books, setBooksState] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [booksPerPage] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useQuery(ALL_BOOKS_QUERY);

  useEffect(() => {
    if (data && data.books) {
      setBooksState(data.books);
      setDisplayedBooks(data.books.slice(0, booksPerPage));
      setBooks(data.books);
    }
  }, [data, booksPerPage, setBooks]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const newBooks = books.slice(0, booksPerPage * nextPage);
    setDisplayedBooks(newBooks);
    setCurrentPage(nextPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books: {error.message}</p>;

  return (
    <Container>
      <h2>All Books</h2>
      <Grid container spacing={2}>
        {displayedBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <BookCard
              book={book}
              onAddToReadingList={onAddToReadingList}
              isInReadingList={readingList.some((b) => b.title === book.title)}
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {displayedBooks.length < books.length && (
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 2, padding: 2, borderRadius: 8}}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    </Container>
  );
};

export default BookList;

