import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Book } from "../types/types";

interface ReadingListProps {
  books: Book[];
  onRemoveFromReadingList: (book: Book) => void;
}

/*
  It renders a list of books with their cover photo, title, author, and reading level.
  Each book item also has a delete button to remove it from the reading list.
*/
const ReadingList = ({ books, onRemoveFromReadingList }: ReadingListProps) => {
  return (
    <div>
      <Typography variant="h4">Reading List</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index} sx={{ position: "relative" }}>
            <Box sx={{ marginRight: 2, borderRadius: 8 }}>
              <img
                src={book.coverPhotoURL}
                alt={book.title}
                style={{ width: 100, height: 100 }}
              />
            </Box>
            <ListItemText
              primary={book.title}
              secondary={`Author: ${book.author} - Reading Level: ${book.readingLevel}`}
            />
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <IconButton
                edge="end"
                onClick={() => onRemoveFromReadingList(book)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReadingList;
