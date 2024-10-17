import localforage from 'localforage';
import { Book } from '../types';

export const saveBook = async (book: Book): Promise<void> => {
  try {
    await localforage.setItem(book.isbn, JSON.stringify(book));
  } catch (error) {
    console.error('Error saving book:', error);
  }
};

export const getBooks = async (): Promise<Book[]> => {
  const books: Book[] = [];
  try {
    await localforage.iterate((value, key) => {
      if (key.startsWith('978')) {
        books.push(JSON.parse(value));
      }
    });
  } catch (error) {
    console.error('Error retrieving books:', error);
  }
  return books.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
};