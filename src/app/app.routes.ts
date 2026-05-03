import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { GameDetails } from './game-details/game-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'game/:id', component: GameDetails },
];
