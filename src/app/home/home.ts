import { Component } from '@angular/core';
import { GameList } from '../game-list/game-list';
import { Search } from '../search/search';

@Component({
  selector: 'app-home',
  imports: [GameList, Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
