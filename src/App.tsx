import React, { useState, useEffect } from 'react';
import BarcodeScanner from './components/BarcodeScanner';
import BookList from './components/BookList';
import { fetchBookInfo } from './utils/api';
import { saveBook, getBooks } from './utils/storage';
import { Book } from './types';
import { BookOpen, AlertCircle } from 'lucide-react';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const loadedBooks = await getBooks();
      setBooks(loadedBooks);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error loading books:', err instanceof Error ? err.message : String(err));
    }
  };

  const handleBarcodeScan = async (isbn: string) => {
    setError(null);
    if (books.some(book => book.isbn === isbn)) {
      setError('This book has already been scanned.');
      return;
    }

    if (!isbn.startsWith('978')) {
      setError('Invalid ISBN. Please scan a book with an ISBN-13 barcode.');
      return;
    }

    try {
      const bookInfo = await fetchBookInfo(isbn);
      if (bookInfo) {
        await saveBook(bookInfo);
        setBooks(prevBooks => [bookInfo, ...prevBooks]);
      } else {
        setError('Book information not found. Please check your API key and try scanning again.');
      }
    } catch (err) {
      setError('Failed to fetch book information. Please check your API key and try again.');
      console.error('Error fetching book info:', err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          <BookOpen className="mr-2" />
          Book Barcode Scanner
        </h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setScanning(!scanning)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {scanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </div>
        {scanning && <BarcodeScanner onDetected={handleBarcodeScan} />}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-center">
            <AlertCircle className="mr-2" />
            <p>{error}</p>
          </div>
        )}
        <BookList books={books} />
      </main>
    </div>
  );
}

export default App;