import { Component, inject } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  gameService = inject(GameService);
}
