import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';
import BookCard from './components/BookCard';
import { Book } from './types/types';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [readingList, setReadingList] = useState<Book[]>([]);

  const handleSearch = (searchedBooks: Book[]) => {
    setFilteredBooks(searchedBooks);
    setIsSearching(searchedBooks.length > 0);
  };

  const addToReadingList = (book: Book) => {
    if (!readingList.some(b => b.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };

  const removeFromReadingList = (book: Book) => {
    setReadingList(readingList.filter(b => b.title !== book.title));
  };

  return (
    <Container>
      <SearchBar setBooks={handleSearch} />
      <ReadingList books={readingList} onRemoveFromReadingList={removeFromReadingList} />
      {isSearching ? (
        <Grid container spacing={2}>
          {filteredBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BookCard book={book} onAddToReadingList={addToReadingList} isInReadingList={readingList.some(b => b.title === book.title)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <BookList setBooks={setBooks} onAddToReadingList={addToReadingList} readingList={readingList} />
      )}
    </Container>
  );
};

export default App;
