import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Library from "./library.jpg";
import Image from "next/image";
import { BookCard } from "@/components/BookCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContainerGeneral = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 64px;
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
  display: flex;
  gap: 24px;
  overflow: scroll;
  scroll-behavior: smooth;
  z-index: 2;
  left: 0;
  padding-left: 24px;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftButtonContainer = styled.div`
  background-color: #b78e2e;
  color: #f9f0e7;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  &:hover {
    transition: 0.8s;
    cursor: pointer;
    background-color: #a26733;
    color: #f9f0e7;
  }
`;

const RightButtonContainer = styled.div`
  background-color: #b78e2e;
  color: #f9f0e7;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  &:hover {
    background-color: #a26733;
    color: #f9f0e7;
    transition: 0.8s;
    cursor: pointer;
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
  z-index: 4;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const Main = () => {
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

  const moveFoward = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const container = document.getElementById("book-container");
    if (container) {
      container.scrollLeft += 230 * 3;
    }
  };

  const moveBackard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const container = document.getElementById("book-container");
    if (container) {
      container.scrollLeft -= 230 * 3;
    }
  };

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
        <Container>
          <LeftButtonContainer onClick={moveBackard}>
            <MdKeyboardArrowLeft style={{ display: "block" }} size={32} />
          </LeftButtonContainer>
          <CardContainer id="book-container">
            {books.map((book, i) => (
              <BookCard key={i} book={book} />
            ))}
          </CardContainer>
          <RightButtonContainer onClick={moveFoward}>
            <MdKeyboardArrowRight style={{ display: "block" }} size={32} />
          </RightButtonContainer>
        </Container>
      </ContainerGeneral>
    )
  );
};
