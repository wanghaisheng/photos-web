import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";
import Photos from "../components/photos";
import { Footer } from "../components/footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Photos />
      <Footer />
    </>
  );
};

export default Home;
