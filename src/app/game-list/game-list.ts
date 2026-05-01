import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'app-game-list',
  imports: [GameCard],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList implements OnInit {
  gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getGames();
  }
}
