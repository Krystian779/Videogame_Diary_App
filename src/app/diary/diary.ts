import { Component, inject } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'app-diary',
  imports: [GameCard],
  templateUrl: './diary.html',
  styleUrl: './diary.css',
})
export class Diary {
  gameService = inject(GameService);
}
