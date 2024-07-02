import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 48px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-width: 80%;
  overflow: scroll;
  max-height: 100vh;
  scroll-behavior: smooth;
  align-items: flex-start;
  background-color: #f4f4f4;
  color: #333;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  &::-webkit-scrollbar {
    display: none;
  }

  table {
    border: 2px solid #cf8869b0;
    width: 100%;
  }

  th {
    border-bottom: 1px solid #a46a51af;
  }

  td {
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  height: 70px;
  background-color: #cf8869b0;
  width: 100%;
`;

const Text = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
`;

export default function Rating() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`/api/rating`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
      });
  }, []);

  return (
    books && (
      <div id="rating-genre" style={{ paddingBottom: "48px" }}>
        <Header>
          <Text>Avaliações por gênero:</Text>
        </Header>
        <Container>
          <ListContainer id="list-container">
            <table>
              <tr>
                <th>Gênero</th>
                <th>Avaliação média</th>
              </tr>

              {(books as { genre: string; rating: number }[]).map((book, i) => (
                <tr key={i}>
                  <td> {book.genre}</td>
                  <td>{book.rating}</td>
                </tr>
              ))}
            </table>
          </ListContainer>
        </Container>
      </div>
    )
  );
}
