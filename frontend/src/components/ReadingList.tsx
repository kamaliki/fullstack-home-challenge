import React, { useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Book } from "../types/types";
import { Container, Modal, Button } from "@mui/material";

interface ReadingListProps {
  books: Book[];
  onRemoveFromReadingList: (book: Book) => void;
}

/*
  It renders a list of books with their cover photo, title, author, and reading level.
  Each book item also has a delete button to remove it from the reading list.
*/
const ReadingList = ({ books, onRemoveFromReadingList }: ReadingListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToRemove, setBookToRemove] = useState<Book | null>(null);

  const handleRemoveBook = () => {
    if (bookToRemove) {
      onRemoveFromReadingList(bookToRemove);
      setModalOpen(false);
      setBookToRemove(null);
    }
  };

  const handleOpenModal = (book: Book) => {
    setBookToRemove(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setBookToRemove(null);
  };

  return (
    <Container>
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
                onClick={() => handleOpenModal(book)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Are you sure you want to remove this book from the reading list?
          </Typography>
          <Button onClick={handleCloseModal} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleRemoveBook} color="error">
            Remove
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ReadingList;
