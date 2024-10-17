export interface Book {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks: {
    thumbnail: string;
  };
  isbn: string;
}

export interface ScanResult {
  codeResult: {
    code: string;
  };
}