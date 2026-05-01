export interface RawgResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
}
