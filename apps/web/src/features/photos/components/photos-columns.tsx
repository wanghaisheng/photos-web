import Link from "next/link";
import React from "react";
import type { Image as ImageType } from "types";
import useImagePositions from "../hooks/use-image-position";
import useScreen from "../../../hooks/use-screen";
import useLightbox from "../../../hooks/use-lightbox";
import { Photo } from "../../../components/photo";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const isMobile = useScreen("sm", true);
  const { positions, getMaxHeight, ref } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
  });
  const { getLinkProps } = useLightbox();

  return (
    <div
      className="relative w-full"
      style={{ height: getMaxHeight() }}
      ref={ref}
      {...props}
    >
      {photos.map(({ id, alt, placeholder }, index) => (
        <Link
          key={id}
          {...getLinkProps(index)}
          className="absolute"
          style={positions[index]}
        >
          <Photo
            id={id}
            alt={alt}
            fill
            sizes="(max-width: 768px) 95vw,
              40vw"
            placeholder="blur"
            blurDataURL={placeholder}
            style={{ objectFit: "cover" }}
          />
        </Link>
      ))}
    </div>
  );
};

export default PhotosColumns;
