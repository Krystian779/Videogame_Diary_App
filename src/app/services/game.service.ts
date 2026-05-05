import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, RawgResponse } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Variables and signals to manage game data, pagination, search term, and selected game details

  private http = inject(HttpClient);

  private backendURL = 'http://localhost:5050/diary';

  private apiURL = 'https://api.rawg.io/api/games';

  private apiKey = '5a6d05f7bbc444b7b287a0b4551a6594';

  diaryGames = signal<Game[]>([]);

  games = signal<Game[]>([]); // Signal to store the list of games

  currentPage = signal(1); // Signal storing the current page

  searchTerm = signal(''); // Signal storing the current search term

  selectedGame = signal<any | null>(null); // Signal to store the selected game for details view

  // Methods

  // Fetch games from the API based on the current page and search term
  getGames(page: number = 1): void {
    this.currentPage.set(page);

    //
    this.http
      .get<RawgResponse>(`${this.apiURL}?key=${this.apiKey}&page=${page}`)
      // Subscribe(Initialize 'data' variable) and set games to the results of the API call
      .subscribe((data) => {
        this.games.set(data.results);
      });
  }

  // Search for games based on a search term
  searchGames(search: string, page: number = 1): void {
    this.searchTerm.set(search);
    this.currentPage.set(page);

    const encodedSearch = encodeURIComponent(search); // encoding search text so that spaces don't cause errors to the url

    this.http
      .get<RawgResponse>(`${this.apiURL}?key=${this.apiKey}&search=${encodedSearch}&page=${page}`)
      .subscribe((data) => {
        this.games.set(data.results);
      });
  }

  // Methods to navigate between pages
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

  // Method to set the selected game for details view
  getGameById(id: number): void {
    // get game object from API based on id and assign it to game variable
    this.http.get<Game>(`${this.apiURL}/${id}?key=${this.apiKey}`).subscribe((game) => {
      this.selectedGame.set(game); // set the selected game to the retrieved game object
    });
  }

  // Save game to MongoDB
  addToDiary(game: Game): void {
    const diaryGame = {
      rawgId: game.id,
      name: game.name,
      rating: game.rating,
      released: game.released,
      background_image: game.background_image,
    };

    this.http.post<Game>(this.backendURL, diaryGame).subscribe((savedGame) => {
      this.diaryGames.update((currentGames) => [...currentGames, savedGame]);
    });
  }

  // Remove game from MongoDB
  removeFromDiary(id: string): void {
    this.http.delete(`${this.backendURL}/${id}`).subscribe(() => {
      this.diaryGames.update((currentGames) => currentGames.filter((game: any) => game._id !== id));
    });
  }

  // Check if RAWG game is already saved
  isInDiary(rawgId: number): boolean {
    return this.diaryGames().some((game: any) => game.rawgId === rawgId);
  }

  // Load saved diary games from MongoDB
  getDiaryGames(): void {
    this.http.get<Game[]>(this.backendURL).subscribe((games) => {
      this.diaryGames.set(games);
    });
  }
}
