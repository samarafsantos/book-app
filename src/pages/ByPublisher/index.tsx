import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  margin-top: 48px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 80%;
  padding: 24px;
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
    border: 2px solid #6a5245c4;
    width: 100%;
  }

  th {
    border-bottom: 1px solid #6a5245c4;
  }

  td {
    text-align: center;
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
  background-color: #6a5245c4;
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
  font-size: 24px;
  color: #333;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
`;

export default function ByPublisher() {
  const [publisher, setPublisher] = useState("Penguin");
  const [title, setTitle] = useState("Penguin");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchPublisher();
  }, []);

  const fetchPublisher = () => {
    fetch("/api/publisher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publisher),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(publisher);
        setBooks(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
      });
  };

  return (
    books.length > 0 && (
      <div id="publisher" style={{ paddingBottom: "48px" }}>
        <Header>
          <Text>Busque por editora:</Text>
          <InputContainer>
            <Input
              type="text"
              placeholder="Search"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
            <IoIosSearch
              className="search-bar"
              size={32}
              onClick={fetchPublisher}
            />
          </InputContainer>
        </Header>
        <Container>
          <ListContainer id="list-container">
            <table>
              <tr>
                <th>Editora: {title}</th>
              </tr>
              {books.map((book: { title: string }, i: number) => (
                <tr key={i}>
                  <td>{book.title}</td>
                </tr>
              ))}
            </table>
          </ListContainer>
        </Container>
      </div>
    )
  );
}
