import { Component, inject } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-list',
  imports: [],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList {
  private gameService = inject(GameService);

  games = this.gameService.games;
}
