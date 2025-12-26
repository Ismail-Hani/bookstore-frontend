import { useState } from "react";

export default function CreateBook({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    author: "",
    description: "",
    price: 0,
    currency: "EUR",
    stock: 0,
    publishedAt: "",
    languageCode: "en",
    publisher: "",
    pageCount: "",
    format: "PAPERBACK",
    coverImageUrl: "",
    isbn13: "",
    isbn10: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Nettoyage : enlever les champs vides optionnels
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      pageCount: form.pageCount ? Number(form.pageCount) : null,
      publishedAt: form.publishedAt || null,
    };

    try {
      const res = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Invalid book data or insufficient permissions");
      }

      setForm({
        title: "",
        subtitle: "",
        author: "",
        description: "",
        price: 0,
        currency: "EUR",
        stock: 0,
        publishedAt: "",
        languageCode: "en",
        publisher: "",
        pageCount: "",
        format: "PAPERBACK",
        coverImageUrl: "",
        isbn13: "",
        isbn10: "",
      });

      setSuccess(true);
      onCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>Add a new book</h3>

      <input name="title" placeholder="Title *" value={form.title} onChange={handleChange} required />
      <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} />
      <input name="author" placeholder="Author *" value={form.author} onChange={handleChange} required />

      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

      <input type="number" name="price" placeholder="Price (€) *" value={form.price} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock *" value={form.stock} onChange={handleChange} required />

      <input type="date" name="publishedAt" value={form.publishedAt} onChange={handleChange} />
      <input name="publisher" placeholder="Publisher" value={form.publisher} onChange={handleChange} />
      <input type="number" name="pageCount" placeholder="Page count" value={form.pageCount} onChange={handleChange} />

      <input name="isbn13" placeholder="ISBN-13" value={form.isbn13} onChange={handleChange} />
      <input name="isbn10" placeholder="ISBN-10" value={form.isbn10} onChange={handleChange} />

      <button type="submit">Create book</button>

      {success && <p className="success">Book created successfully ✅</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
