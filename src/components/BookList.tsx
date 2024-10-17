import React from 'react';
import { Book } from '../types';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded-lg shadow">
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {book.authors.join(', ')}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {book.publisher}, {book.publishedDate}
          </p>
          <p className="text-sm line-clamp-3">{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;