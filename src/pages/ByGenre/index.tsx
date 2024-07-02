import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

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

const Input = styled.input`
  height: 32px;
  min-width: 200px;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 0 8px;
  margin: 0 auto;
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    color: #333;
  }
  svg {
    position: absolute;
    right: 8px;
  }
  .search-bar {
    color: #333;
    &:hover {
      color: #b78e2e;
      border-radius: 8px;
      transition: 0.8s;
      cursor: pointer;
    }
  }
`;

const Text = styled.h2`
  font-size: 18px;
  color: #333;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
`;

export const ByGenre = () => {
  const [genre, setGenre] = useState("fantasy");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = () => {
    fetch("/api/genre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genre),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
      });
  };

  return (
    books && (
      <Container>
        <Header>
          <Text>Busque por gênero:</Text>
          <InputContainer>
            <Input
              type="text"
              placeholder="Search"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <IoIosSearch
              className="search-bar"
              size={32}
              onClick={fetchGenre}
            />
          </InputContainer>
        </Header>

        <ListContainer id="list-container">
          {books.map((book, i) => (
            <div key={i}>{book.title}</div>
          ))}
        </ListContainer>
      </Container>
    )
  );
};
