import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import Layout from "../../../components/layout";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPortfolio, getPortfolios } from "../../../services/portfolios";
import Photo from "../../../components/photos-grid/photo";
import { getImageUrl } from "../../../utils/misc";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getPortfolios(1, 20);
  const paths = data.map((path) => ({ params: { id: path.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const portfolioId = ctx.params?.id as string;
  await queryClient.prefetchQuery(["portfolio", portfolioId], () =>
    getPortfolio(portfolioId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const PortfolioIndexPage: NextPage = () => {
  const router = useRouter();
  const portfolioId = router.query.id as string;
  const { data, error, isLoading } = useQuery(["portfolio", portfolioId], () =>
    getPortfolio(portfolioId)
  );
  const { name, images = [] } = data || {};
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <>
          <h1>Portfolio {name}</h1>
          <span>Loading: {isLoading}</span>
          <span>Error: {JSON.stringify(error)}</span>
          <section className="flex flex-col gap-10">
            {images.map((image) => (
              <Link
                key={image.id}
                href={`/portfolio/${portfolioId}/${encodeURIComponent(
                  image.id
                )}`}
              >
                <Photo
                  alt={image.alt}
                  src={getImageUrl(image.id)}
                  height={image.height}
                  width={image.width}
                  blurDataURL={image.placeholder}
                  style={{
                    width: "100%",
                    maxHeight: "1200px",
                    objectFit: "cover",
                  }}
                />
              </Link>
            ))}
          </section>
        </>
      </Layout>
      <Footer />
    </>
  );
};

export default PortfolioIndexPage;