import { Movie } from "./movie";

export interface MetaData {
  metaData: {
    pagination: {
      currentPage: number,
      totalPages: number
    }
  },
  movies: Movie[]
}