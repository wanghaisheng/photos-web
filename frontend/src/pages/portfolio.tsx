import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import superjson from "superjson";
import { getPortfolios } from "../services/portfolios";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    "portfolio",
    ({ pageParam: page = 1 }) => getPortfolios(page, 10),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );

  return {
    props: {
      dehydratedState: superjson.serialize(dehydrate(queryClient)),
    },
  };
}

const PortfolioPage: NextPage = () => {
  const { fetchNextPage, data } = useInfiniteQuery(
    "portfolio",
    ({ pageParam: page = 1 }) => getPortfolios(page, 10),
    {
      getNextPageParam: ({ nextPage }) => nextPage,
    }
  );
  const portfolios = data?.pages.flatMap(({ data }) => data) || [];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      Portfolio
      {JSON.stringify(portfolios)}
      <button onClick={() => fetchNextPage()}>More...</button>
      <Footer />
    </>
  );
};

export default PortfolioPage;
