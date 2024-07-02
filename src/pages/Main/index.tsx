import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Library from "./library.jpg";
import Image from "next/image";
import { BookCard } from "@/components/BookCard";

const ContainerGeneral = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 48px;
  height: calc(100vh - 70px);
  .library-image {
    object-fit: cover;
    height: calc(100vh - 70px);
    opacity: 0.7;
    position: absolute;
    z-index: 1;
  }
`;

const CardContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 24px;
  justify-content: center;
  overflow: scroll;
  scroll-behavior: smooth;
  z-index: 2;
  min-width: 80%;
  left: 0;
  padding-left: 24px;
  align-items: center;
  margin-bottom: 32px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.h2`
  font-size: 32px;
  background-color: #f4f4f4b5;
  padding: 0 32px;
  border-radius: 8px;
  color: #000;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
  margin-top: 28px;
  z-index: 4;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export default function Main() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`/api/books`)
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
      <ContainerGeneral>
        <Image
          className="library-image"
          src={Library}
          alt="Library"
          placeholder="blur"
          priority
        />
        <>
          <Text>Conheça alguns de nossos livros:</Text>
        </>
        <CardContainer id="book-container">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </CardContainer>
      </ContainerGeneral>
    )
  );
}
