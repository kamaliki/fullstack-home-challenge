import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Image } from '@mui/icons-material';


interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface BookListProps {
  books: Book[];
  onAddToReadingList: (book: Book) => void;
}

const BookList = ({ books, onAddToReadingList }: BookListProps) => {
  return (
    <div>
      <Typography variant="h4">Search Results</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index} sx={{ position: 'relative' }}>
            <Box sx={{ marginRight: 2 }}>
              <img src={book.coverPhotoURL} alt={book.title} style={{ width: 100, height: 100 }} />
            </Box>
            <ListItemText
              primary={book.title}
              secondary={`Author: ${book.author} - Reading Level: ${book.readingLevel}`}
            />
            <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              <IconButton edge="end" onClick={() => onAddToReadingList(book)}>
                <AddIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookList;
