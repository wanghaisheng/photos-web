import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { getPhotos } from "../../services/photos";
import Photo from "./photo";

const Photos = () => {
  const { data } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: getPhotos,
  });

  const half = data?.data.data.length / 2;

  return (
    <section className="container mx-auto">
      <div className="flex space-x-10">
        <div className="w-full flex flex-col space-y-10">
          {data?.data.data.slice(0, half).map(({ id, src, alt }: any) => (
            <Link href={`/photo/${id}`} key={id}>
              <Photo
                className="relative"
                src={src}
                alt={alt}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          ))}
        </div>
        <div className="w-full flex flex-col space-y-10">
          {data?.data.data
            .slice(half, data?.data.data.length)
            .map(({ id, src, alt }: any) => (
              <Link href={`/photo/${id}`} key={id}>
                <Photo
                  className="relative"
                  src={src}
                  alt={alt}
                  width={700}
                  height={475}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Photos;