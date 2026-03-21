export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  coverUrl: string;
  gameUrl: string;
}

export type Category = 'All' | 'Action' | 'Sports' | 'Puzzle' | 'Strategy' | 'Adventure' | 'Driving' | 'Classic';
