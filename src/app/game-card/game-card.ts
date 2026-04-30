import { Component, input } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  game = input.required<Game>();
}
