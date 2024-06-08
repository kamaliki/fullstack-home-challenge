import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface BookCardProps {
  book: Book;
  onAddToReadingList: (book: Book) => void;
  isInReadingList: boolean;
}

const BookCard = ({
  book,
  onAddToReadingList,
  isInReadingList,
}: BookCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToReadingList = () => {
    if (!isInReadingList) {
      onAddToReadingList(book);
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="100"
        image={book.coverPhotoURL}
        alt={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
      </CardContent>
      <Modal open={modalOpen} onClose={closeModal}>
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
          <Typography variant="h6" component="h2">
            This book is already in your reading list!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={closeModal}
            sx={{ mt: 2 }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default BookCard;
