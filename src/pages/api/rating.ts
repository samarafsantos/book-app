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
    const response =
      await connection.query(`SELECT G.Genero, ROUND(AVG(L.Rating), 1)  AS Total_Rating
      FROM Genero G
      INNER JOIN Tem T ON G.Id = T.fk_Genero_Id
      INNER JOIN Livro L ON T.fk_Livro_ISBN_13 = L.ISBN_13
      GROUP BY G.Genero;
    `);
    let data = [];
    (response[0] as Array<any>).forEach((book) => {
      const b = {
        genre: book.Genero,
        rating: book.Total_Rating,
      };
      data.push(b);
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json([]);
  }
}
