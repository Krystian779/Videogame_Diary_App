import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private gameService = inject(GameService);

  searchTerm = signal(''); // storing user input for search term

  // Search method which calls the searchTerm method from GameService
  search(): void {
    const term = this.searchTerm().trim();

    if (term.length > 0) {
      this.gameService.searchGames(term);
    }
  }
}
