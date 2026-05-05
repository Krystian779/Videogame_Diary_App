import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'app-diary',
  imports: [GameCard],
  templateUrl: './diary.html',
  styleUrl: './diary.css',
})
export class Diary implements OnInit {
  gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getDiaryGames();
  }
}
