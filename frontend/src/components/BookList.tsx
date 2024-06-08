// import AddIcon from '@mui/icons-material/Add';

import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BookCard from './BookCard';
import Skeleton from '@mui/material/Skeleton';

const ALL_BOOKS_QUERY = gql`
  query AllBooksQuery {
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

interface BookListProps {
  setBooks: (books: Book[]) => void;
  onAddToReadingList: (book: Book) => void;
  readingList: Book[];
}

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
            sx={{ margin: 2, padding: 2 }}
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


// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';


// interface Book {
//   title: string;
//   author: string;
//   coverPhotoURL: string;
//   readingLevel: string;
// }

// interface BookListProps {
//   books: Book[];
//   onAddToReadingList: (book: Book) => void;
// }

// const BookList = ({ books, onAddToReadingList }: BookListProps) => {
//   return (
//     <div>
//       <Typography variant="h4">Search Results</Typography>
//       {books.length > 0 ? (
//         <List>
//           {books.map((book, index) => (
//             <ListItem key={index} sx={{ position: 'relative' }}>
//               <Box sx={{ marginRight: 2 }}>
//                 <img src={book.coverPhotoURL} alt={book.title} style={{ width: 100, height: 100 }} />
//               </Box>
//               <ListItemText
//                 primary={book.title}
//                 secondary={`Author: ${book.author} - Reading Level: ${book.readingLevel}`}
//               />
//               <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
//                 <IconButton edge="end" onClick={() => onAddToReadingList(book)}>
//                   <AddIcon />
//                 </IconButton>
//               </Box>
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <Typography variant="body1">No books found. Please try searching for something else.</Typography>
//       )}
//     </div>
//   );
// };

// export default BookList;
