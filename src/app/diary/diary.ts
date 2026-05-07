import { Component, inject, OnInit, computed } from '@angular/core';
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

  // Computed recalculates the list of games in the diary based on the current state of the diaryGames signal
  playedGames = computed(() =>
    this.gameService.diaryGames().filter((game) => game.status === 'played'),
  );

  playingGames = computed(() =>
    this.gameService.diaryGames().filter((game) => game.status === 'playing'),
  );

  wishlistGames = computed(() =>
    this.gameService.diaryGames().filter((game) => game.status === 'want to play'),
  );

  ngOnInit(): void {
    this.gameService.getDiaryGames();
  }
}
