import axios from 'axios';
import { Book } from '../types';

// Replace this with your actual Google Books API key
const GOOGLE_BOOKS_API_KEY = 'YOUR_GOOGLE_BOOKS_API_KEY';

export const fetchBookInfo = async (isbn: string): Promise<Book | null> => {
  try {
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.searchParams.append('q', `isbn:${isbn}`);
    url.searchParams.append('key', GOOGLE_BOOKS_API_KEY);

    const response = await axios.get(url.toString());

    if (response.data.items && response.data.items.length > 0) {
      const bookInfo = response.data.items[0].volumeInfo;
      return {
        id: response.data.items[0].id,
        title: bookInfo.title,
        authors: bookInfo.authors || [],
        publisher: bookInfo.publisher || '',
        publishedDate: bookInfo.publishedDate || '',
        description: bookInfo.description || '',
        imageLinks: bookInfo.imageLinks || { thumbnail: '' },
        isbn: isbn,
      };
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching book info:', error.message, error.response?.data);
    } else {
      console.error('Error fetching book info:', error instanceof Error ? error.message : String(error));
    }
    return null;
  }
};