import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, RawgResponse } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);

  private apiURL = 'https://api.rawg.io/api/games';
  private apiKey = '5a6d05f7bbc444b7b287a0b4551a6594';

  games = signal<Game[]>([]);
  currentPage = signal(1);
  searchTerm = signal('');

  getGames(page: number = 1): void {
    this.currentPage.set(page);

    this.http
      .get<RawgResponse>(`${this.apiURL}?key=${this.apiKey}&page=${page}`)
      .subscribe((data) => {
        this.games.set(data.results);
      });
  }

  searchGames(search: string, page: number = 1): void {
    this.searchTerm.set(search);
    this.currentPage.set(page);

    this.http
      .get<RawgResponse>(`${this.apiURL}?key=${this.apiKey}&search=${search}&page=${page}`)
      .subscribe((data) => {
        this.games.set(data.results);
      });
  }

  nextPage(): void {
    if (this.searchTerm()) {
      this.searchGames(this.searchTerm(), this.currentPage() + 1);
    } else {
      this.getGames(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      if (this.searchTerm()) {
        this.searchGames(this.searchTerm(), this.currentPage() - 1);
      } else {
        this.getGames(this.currentPage() - 1);
      }
    }
  }
}
