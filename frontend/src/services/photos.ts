import axios from "axios";
import type { PhotoType } from "../@types/photos";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type PhotosType = {
  data: PhotoType[];
  nextPage: number;
  limit: number;
};

export const getPhotos = async (page = 1, limit = 10): Promise<PhotosType> => {
  const { data } = await axios.get(
    `${SERVER_URL}/photos?page=${page}&limit=${limit}`
  );
  return data;
};

export const getPhoto = async (photoId: string): Promise<PhotoType> => {
  const { data } = await axios.get(`${SERVER_URL}/photos/${photoId}`);
  return data;
};
