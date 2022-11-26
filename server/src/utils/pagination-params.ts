import queryString from "query-string";

type PaginationParams = {
  page?: string;
  limit?: string;
};

export const paginationParams = (query: PaginationParams) => {
  const { page = 0, limit = 10 }: { limit?: number; page?: number } =
    queryString.parse(queryString.stringify(query), {
      parseNumbers: true,
    });

  return {
    page,
    limit,
    skip: page * limit,
    take: limit,
  };
};