import { NextApiRequest, NextApiResponse } from "next";
import connection from "./client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const author = req.body;
  try {
    const response = await connection.query(`
    SELECT L.Titulo
    FROM Livro  L
    LEFT JOIN Escreve E ON L.ISBN_13 = E.fk_Livro_ISBN_13
    WHERE E.fk_Autor_Id IN (
        SELECT Id
        FROM Autor
        WHERE Nome like '%${author}%'
    );
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
