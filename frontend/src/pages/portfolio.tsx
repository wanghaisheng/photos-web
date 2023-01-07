import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { dehydrate, QueryClient } from "react-query";
import superjson from "superjson";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  //   await queryClient.prefetchInfiniteQuery(
  //     "portfolio",
  //     ({ pageParam: page = 1 }) => getPhotos(page, 10),
  //     {
  //       getNextPageParam: ({ nextPage }) => nextPage ?? undefined,
  //     }
  //   );

  return {
    props: {
      dehydratedState: superjson.serialize(dehydrate(queryClient)),
    },
  };
}

const PortfolioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      Portfolio
      <Footer />
    </>
  );
};

export default PortfolioPage;