import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  height: 100vh;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  overflow: scroll;
  scroll-behavior: smooth;
  align-items: flex-start;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  height: 70px;
  background-color: #f4f4f4;
  width: 100%;
`;

const Text = styled.h2`
  font-size: 18px;
  color: #333;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
`;

export const Rating = () => {
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
      <Container>
        <Header>
          <Text>Avaliações por gênero:</Text>
        </Header>
        <ListContainer id="list-container">
          {books.map((book, i) => (
            <div key={i}>
              {book.genre} - {book.rating}
            </div>
          ))}
        </ListContainer>
      </Container>
    )
  );
};
