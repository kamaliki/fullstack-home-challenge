// import DeleteIcon from '@mui/icons-material/Delete';
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

// interface ReadingListProps {
//   books: Book[];
//   onRemoveFromReadingList: (book: Book) => void;
// }

// const ReadingList = ({ books, onRemoveFromReadingList }: ReadingListProps) => {
//   return (
//     <div>
//       <Typography variant="h4">Reading List</Typography>
//       <List>
//         {books.map((book, index) => (
//           <ListItem key={index} sx={{ position: 'relative' }}>
//             <Box sx={{ marginRight: 2 }}>
//                 <img src={book.coverPhotoURL} alt={book.title} style={{ width: 100, height: 100 }} />
//             </Box>
//             <ListItemText
//               primary={book.title}
//               secondary={`Author: ${book.author} - Reading Level: ${book.readingLevel}`}
//             />
//             <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
//               <IconButton edge="end" onClick={() => onRemoveFromReadingList(book)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default ReadingList;
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BookCard from './BookCard';

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface ReadingListProps {
  readingList: Book[];
  removeFromReadingList: (book: Book) => void;
}

const ReadingList = ({ readingList, removeFromReadingList }: ReadingListProps) => {
  return (
    <Container>
      <h2>Reading List</h2>
      <Grid container spacing={2}>
        {readingList.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BookCard book={book} onAddToReadingList={removeFromReadingList} isInReadingList />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReadingList;
