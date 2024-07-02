import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineStar } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 230px;
  width: 230px;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 16px 12px;
  gap: 8px;
  .book-cover {
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover {
      opacity: 0.5;
      transition: 0.8s;
      cursor: pointer;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
`;
const Subtitle = styled.p`
  font-size: 12px;
  text-align: center;
  color: #7a7a7a;
`;

const bookInfo = {
  title: "Harry Potter and the Order of the Phoenix",
  author: "J.K. Rowling",
  rating: "4.50",
  language: "English",
  isbn: "9780439358071",
  genres: [
    "Fantasy",
    "Young Adult",
    "Fiction",
    "Magic",
    "Childrens",
    "Adventure",
    "Audiobook",
    "Middle Grade",
    "Classics",
    "Science Fiction Fantasy",
  ],
  pages: "870",
  publisher: "Scholastic Inc.",
  edition: "US Edition",
};

interface Book {
  author: string;
  title: string;
  rating: string;
  language: string;
  isbn: string;
  year: string;
  pages: string;
  publishedDate: string;
}

export const BookCard = (props: { book: Book }) => {
  const [imgUrl, setImgUrl] = useState("");
  const book = props.book;
  let Star = [];
  for (var i = 0; i < Math.ceil(parseInt(book.rating)); i++) {
    Star.push(<MdOutlineStar key={i} size={24} color="orange" />);
  }

  const formatTitle = (title: String) => {
    return title.slice(0, 25);
  };

  const titleFormatted = book.title && formatTitle(book.title);

  useEffect(() => {
    fetch(`https://bookcover.longitood.com/bookcover/${book.isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setImgUrl(data.url);
      })
      .catch((error) => {
        console.error("[BookCard] Erro ao buscar imagem", error);
      });
  }, [book]);

  return (
    imgUrl && (
      <Container>
        <a data-tooltip-id={book.isbn}>
          <Tooltip id={book.isbn}>
            <span>Gêneros: {bookInfo.genres.join(", ")}</span>
          </Tooltip>
          <Image
            className="book-cover"
            src={imgUrl}
            alt="book-cover"
            width={180}
            height={275}
            priority
          />
        </a>

        <Title>
          {titleFormatted} {book.title.length > 15 ? "[...]" : ""}
        </Title>
        <Subtitle>Autor(a): {book.author}</Subtitle>
        <Flex>
          {Star.map((star) => star)}
          <Subtitle>({book.rating})</Subtitle>
        </Flex>
        <Subtitle>Páginas: {book.pages}</Subtitle>
        <Subtitle>Editora: {bookInfo.publisher}</Subtitle>
      </Container>
    )
  );
};
