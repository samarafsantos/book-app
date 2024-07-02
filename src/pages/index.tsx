import Head from "next/head";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Main } from "./Main";
import { ByPublisher } from "./ByPublisher";
import { ByGenre } from "./ByGenre";
import { ByAuthor } from "./ByAuthor";
import { GenreBook } from "./GenreBook";
import { Rating } from "./Rating";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Biblioteca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Header />
        <Main />
        <ByPublisher />
        <ByGenre />
        <ByAuthor />
        <GenreBook />
        <Rating />
      </main>
    </>
  );
}
