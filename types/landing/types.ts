// types/landing/types.ts

export type AnimeItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  rating: string;
  votes: string;
  episodes: string;
  studio: string | null;
  director: string | null;
  duration: string;
  image: string;
};