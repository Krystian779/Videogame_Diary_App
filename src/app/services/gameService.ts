import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _games = signal<Game[]>([
    {
      id: 1,
      name: 'Red Dead Redemption 2',
      genre: 'Action Adventure',
      platform: 'PC',
      releaseYear: 2018,
      rating: 5,
      coverImageUrl: 'images/rdr2.jpg',
      description: 'A cinematic open-world western focused on story, exploration and character.',
    },

    {
      id: 2,
      name: 'Subnautica',
      genre: 'Survival',
      platform: 'PC',
      releaseYear: 2018,
      rating: 4.5,
      coverImageUrl: 'images/subnautica.jpg',
      description: 'An underwater survival game focused on exploration and discovery.',
    },
  ]);

  games = this._games.asReadonly(); // Expose games as a readonly signal

  // Method to get a game by its ID
  getGameById(id: number): Game | undefined {
    return this._games().find((game) => game.id === id);
  }
}
