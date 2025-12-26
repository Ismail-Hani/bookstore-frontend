import { useEffect, useState } from "react";
import CreateBook from "./CreateBook";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/books");

      if (!res.ok) {
        throw new Error("Failed to load books");
      }

      const data = await res.json();

      // 🔐 Sécurité : s’assurer que c’est bien un tableau
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="card">
      {/* Titre principal */}
      <h1 className="page-title">📚 Library</h1>

      {/* Création de livre (admin seulement) */}
      <CreateBook onCreated={loadBooks} />

      {/* Erreur */}
      {error && <div className="error">{error}</div>}

      {/* Chargement */}
      {loading && <p className="muted center">Loading books…</p>}

      {/* Liste vide */}
      {!loading && books.length === 0 && (
        <p className="muted center">No books available.</p>
      )}

      {/* ✅ LISTE DES LIVRES — rendu SEULEMENT quand prêt */}
      {!loading && books.length > 0 && (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <h3 className="book-title">{book.title}</h3>
                <span className="book-author">{book.author}</span>
              </div>

              {book.description && (
                <p className="book-description">{book.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
