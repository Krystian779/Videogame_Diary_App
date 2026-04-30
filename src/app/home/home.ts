import { Component } from '@angular/core';
import { GameList } from '../game-list/game-list';

@Component({
  selector: 'app-home',
  imports: [GameList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
