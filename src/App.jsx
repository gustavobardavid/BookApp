import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('john green');

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items);
      })
      .catch((error) => {
        console.error('Erro ao buscar livros:', error);
      });
  }, [query]);

  return (
    <div className="App">
      <h1>Busca de Livros</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite um termo de pesquisa"
        />
      </div>
      <div className="book-list">
      {books.map((book) => (
  <div key={book.id} className="book">
    <img
      src={book.volumeInfo.imageLinks?.thumbnail}
      alt={book.volumeInfo.title}
    />
    <h2>{book.volumeInfo.title}</h2>
    <p>{book.volumeInfo.authors?.join(', ')}</p>
    
    {book.volumeInfo.description && <p>{book.volumeInfo.description}</p>}
    
    {book.saleInfo.listPrice && (
      <p>Preço: {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
    )}

    {book.saleInfo.buyLink && (
      <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">
        Comprar
      </a>
    )}
  </div>
))}

      </div>
    </div>
  );
}

export default App;
