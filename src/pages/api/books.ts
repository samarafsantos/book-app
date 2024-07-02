import connection from "./client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await connection.query(`SELECT 
    l.Titulo AS title,
    GROUP_CONCAT(DISTINCT a.Nome ORDER BY a.Nome SEPARATOR ', ') AS author,
    l.Rating AS rating,
    l.Idioma AS language,
    l.ISBN_13 AS isbn,
    l.Paginas AS pages,
    e.Nome AS publisher,
    p.Versao AS edition,
    GROUP_CONCAT(DISTINCT g.Genero ORDER BY g.Genero SEPARATOR ', ') AS genres
    FROM 
        Livro l
    JOIN 
        Escreve es ON l.ISBN_13 = es.fk_Livro_ISBN_13
    JOIN 
        Autor a ON es.fk_Autor_Id = a.Id
    JOIN 
        Publica p ON l.ISBN_13 = p.fk_Livro_ISBN_13
    JOIN 
        Editora e ON p.fk_Editora_Id = e.Id
    JOIN 
        Tem t ON l.ISBN_13 = t.fk_Livro_ISBN_13
    JOIN 
        Genero g ON t.fk_Genero_Id = g.Id
    GROUP BY 
        l.ISBN_13, l.Titulo, l.Rating, l.Idioma, l.Paginas, e.Nome, p.Versao;
    `);
    return res.status(200).json(response[0]);
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}
