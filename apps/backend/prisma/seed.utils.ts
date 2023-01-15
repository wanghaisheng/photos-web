import { faker } from "@faker-js/faker";
import { type Image, type Portfolios } from "@prisma/client";
import slugify from "slugify";

import { getBufferFromUrl } from "../src/utils/misc";

export const createPhoto = (): Pick<Image, "alt"> => {
  return {
    alt: faker.lorem.words(2),
  };
};

export const createPortfolio = (
  uniqueName: string
): Omit<Portfolios, "id" | "createdAt" | "updatedAt"> => {
  return {
    name: uniqueName,
    slug: slugify(uniqueName, { lower: true }),
  };
};

const randomArrayItem = <T>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomPortfolioPhotos = (
  photos: Image[]
): Record<"id", string>[] => {
  const itemsInPortfolio = randomBetween(5, 30);
  const randomPhotos = Array.from({ length: itemsInPortfolio }, () =>
    randomArrayItem(photos)
  );
  return randomPhotos.map((photo) => ({ id: photo.id }));
};

export async function getRandomPhoto() {
  const buffer = await getBufferFromUrl(
    faker.image.nature(1280, randomBetween(1280, 2560))
  );
  return buffer;
}

export async function getRandomPeoplePhoto() {
  const buffer = await getBufferFromUrl(faker.image.people(640, 1280));
  return buffer;
}