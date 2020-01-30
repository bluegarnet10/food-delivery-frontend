import React, { createContext, useState } from 'react';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
	const [books, setBooks] = useState([
		{
			id: 1,
			title: 'Goodnight Moon',
			author: 'Margaret Brown',
		},
		{
			id: 2,
			title: 'The Very Hungry Caterpillar',
			author: 'Eric Carle',
		},
	]);

	const addBook = book => {
		setBooks([...books, { ...book, id: books.length === 0 ? 1 : books[books.length - 1].id + 1 }]);
	};

	const deleteBook = id => {
		setBooks(books.filter(book => book.id !== id));
	};

	return <BookContext.Provider value={{ books, addBook, deleteBook }}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
