import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import Lightbox from "../components/lightbox";
import { getPhoto, getPhotos } from "../services/photos";
import superjson from "superjson";

export const getStaticPaths = async () => {
  const data = await getPhotos();
  const pages = data.data.map(({ id }) => ({
    params: {
      photoId: id,
    },
  }));

  return {
    paths: pages,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  const { params } = context;
  const { photoId } = params || {};

  const id = typeof photoId === "string" ? photoId : undefined;

  if (!id) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery(["photos", id], () => getPhoto(id));

  return {
    props: {
      dehydratedState: superjson.serialize(dehydrate(queryClient)),
    },
  };
};
const PhotoPage: NextPage = () => {
  const router = useRouter();
  const photoId = router.query.photoId as string;
  const { fetchNextPage, data } = useInfiniteQuery(
    "photos",
    ({ pageParam: page = 1 }) => getPhotos(page, 10),
    {
      getNextPageParam: ({ nextPage }) =>
        nextPage === -1 ? undefined : nextPage ?? undefined,
    }
  );

  const handleNext = (currentIndex: number) => {
    if (currentIndex === photos.length - 3) {
      console.log(currentIndex);
      fetchNextPage();
    }
  };

  const photos = data?.pages.map(({ data }) => data).flat(1) || [];
  if (!photos?.length) return <h1>No data</h1>;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Lightbox
        setIsOpen={() => router.push("/")}
        isOpen={true}
        photos={photos}
        onClickNext={handleNext}
      />
    </>
  );
};

export default PhotoPage;
