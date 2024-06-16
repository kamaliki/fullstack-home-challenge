import { render, screen, fireEvent } from '@testing-library/react';
import ReadingList from '../components/ReadingList';
import { Book } from '../types/types';

const mockBooks: Book[] = [
  {
    title: "Book 1",
    author: "Author 1",
    coverPhotoURL: "url1",
    readingLevel: "Level 1",
  },
  {
    title: "Book 2",
    author: "Author 2",
    coverPhotoURL: "url2",
    readingLevel: "Level 2",
  },
];

// Mock function for onRemoveFromReadingList
const mockRemoveFromReadingList = jest.fn();

test('renders the ReadingList component with books and performs removal', () => {
  render(
    <ReadingList books={mockBooks} onRemoveFromReadingList={mockRemoveFromReadingList} />
  );

  // Check if 'Reading List' header is present
  expect(screen.getByText('Reading List')).toBeInTheDocument();

  // Check if each book is rendered with its details and delete button
  mockBooks.forEach((book) => {
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${book.author} - Reading Level: ${book.readingLevel}`)).toBeInTheDocument();
    expect(screen.getByLabelText(`delete-icon-${book.title}`)).toBeInTheDocument(); // Assuming 'delete-icon' accessibility label
  });

  // Simulate clicking the delete button for the first book
  const deleteButton = screen.getByLabelText('delete-icon-Book 1');
  fireEvent.click(deleteButton);

  // Check if modal appears after clicking delete button
  expect(screen.getByText('Are you sure you want to remove this book from the reading list?')).toBeInTheDocument();

  // Simulate clicking 'Remove' in the modal
  const removeButton = screen.getByText('Remove');
  fireEvent.click(removeButton);

  // Check if onRemoveFromReadingList was called with the correct book
  expect(mockRemoveFromReadingList).toHaveBeenCalledWith(mockBooks[0]);
});
