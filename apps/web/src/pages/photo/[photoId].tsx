import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { Lightbox } from "../../components/lightbox";
import { getPhoto, getPhotos } from "../../services/photos";

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
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
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
      getNextPageParam: ({ nextPage }) => nextPage ?? undefined,
    }
  );

  const handleNext = (currentIndex: number) => {
    if (currentIndex === photos.length - 3) {
      fetchNextPage();
    }
  };

  const photos = data?.pages.flatMap(({ data }) => data) || [];
  const initialIndex = photos.findIndex(({ id }) => id === photoId);

  if (!photos?.length) return <h1>No data</h1>;
  return (
    <>
      <NextSeo title="Photo" />
      <Lightbox
        setIsOpen={() => router.back()}
        initialIndex={initialIndex === -1 ? 0 : initialIndex}
        isOpen={true}
        photos={photos}
        onClickNext={handleNext}
      />
    </>
  );
};

export default PhotoPage;
