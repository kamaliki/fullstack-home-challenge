import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';


interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Clive Devs
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);

  const handleAddToReadingList = (book: Book) => {
    setReadingList([...readingList, book]);
  };

  const handleRemoveFromReadingList = (book: Book) => {
    setReadingList(readingList.filter(b => b.title !== book.title));
  };

  
  // return (
  //   <Container maxWidth="sm">
  //     <Box sx={{ my: 4 }}>
  //       <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
  //         Book Assignment
  //       </Typography>
  //       <SearchBar setBooks={setBooks} />
  //       <Box display="flex" justifyContent="space-between">
  //         <BookList books={books} onAddToReadingList={handleAddToReadingList} />
  //         <ReadingList
  //           books={readingList}
  //           onRemoveFromReadingList={handleRemoveFromReadingList}
  //         />
  //       </Box>

  //       <Copyright />
  //     </Box>
  //   </Container>
  // );

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Book Assignment
      </Typography>
      <SearchBar setBooks={setBooks} />
      <Box display="flex" justifyContent="space-between">
        <BookList books={books} onAddToReadingList={handleAddToReadingList} />
        <ReadingList books={readingList} onRemoveFromReadingList={handleRemoveFromReadingList} />
      </Box>
    </Container>
  );

}
