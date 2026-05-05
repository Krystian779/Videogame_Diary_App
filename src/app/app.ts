import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Navbar } from './navbar/navbar';
import { Feedback } from './feedback/feedback';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Feedback],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('VideogameDiary');
}
