import { NextApiRequest, NextApiResponse } from "next";
import connection from "./client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genre = req.body;
  try {
    const response = await connection.query(`SELECT L.Titulo
      FROM Livro L
      INNER JOIN Tem T ON L.ISBN_13 = T.fk_Livro_ISBN_13
      INNER JOIN Genero G ON T.fk_Genero_Id = G.Id
      WHERE G.Genero like '%${genre}%' order by L.Rating;
    `);
    let data: {
      title: string;
      rating: string;
      language: string;
      isbn: string;
      year: string;
      pages: string;
      publishedDate: string;
    }[] = [];
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
    throw error;
  }
}
