import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "app-books",
  password: "123456",
  database: "Books",
  port: 3306,
});

export default async function handler(req, res) {
  try {
    const response = await connection.query("SELECT * FROM livro limit 15");
    let data = [];
    (response[0] as Array<any>).forEach((book) => {
      const b = {
        title: book.Titulo,
        rating: book.Rating,
        language: book.Idioma,
        isbn: book.ISBN_13,
        year: book.Ano,
        pages: book.Paginas,
        publishedDate: book.Data_de_lancamento,
      };
      data.push(b);
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json([]);
  }
}