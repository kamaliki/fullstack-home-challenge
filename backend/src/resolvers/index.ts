import { booksData } from '../data/books';


export const resolvers = {
  Query: {
    books: () => booksData,
    booksByTitle: (_: any, { title }: { title?: string }) => {
      console.log('title', title); // logs the title correctly
      return booksData.filter((book) => book.title.includes(title ?? ''));
    }
  },
};
