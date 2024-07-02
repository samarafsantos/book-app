import { NextApiRequest, NextApiResponse } from "next";
import connection from "./client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response =
      await connection.query(`SELECT g.Genero,(SELECT COUNT(DISTINCT e.fk_Autor_Id)
    FROM Escreve e
    WHERE e.fk_Livro_ISBN_13 IN 
    (SELECT t.fk_Livro_ISBN_13
    FROM Tem t
    WHERE t.fk_Genero_Id = g.Id)) AS Quantidade_Escritores
    FROM Genero g
    `);
    let data: { genre: string; writersQty: string }[] = [];
    (response[0] as Array<any>).forEach((book) => {
      const b = {
        genre: book.Genero,
        writersQty: book.Quantidade_Escritores,
      };
      data.push(b);
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}
