import { useState, Suspense } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add'
import { Book } from "../types/types";

interface BookCardProps {
  book: Book;
  onAddToReadingList: (book: Book) => void;
  isInReadingList: boolean;
}

const BookCard = ({ book, onAddToReadingList, isInReadingList }: BookCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleAddToReadingList = () => {
    onAddToReadingList(book);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, height: 220, margin: 1, overflow: "hidden" }} onClick={handleOpenModal}>
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
      </Card>
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
            border: '2px solid #fff',
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={book.coverPhotoURL}
            alt={book.title}
          />
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
            {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Reading Level: {book.readingLevel}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToReadingList}
            sx={{ m: 2 }}
            disabled={isInReadingList}
          >
            {isInReadingList ? "Already in Reading List" : <AddIcon/>}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={closeModal}
            sx={{ m: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const BookCardWithSuspense = ({ book, onAddToReadingList, isInReadingList }: BookCardProps) => {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" height={220} />}>
      <BookCard
        book={book}
        onAddToReadingList={onAddToReadingList}
        isInReadingList={isInReadingList}
      />
    </Suspense>
  );
};

export default BookCardWithSuspense;
