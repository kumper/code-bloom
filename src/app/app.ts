import {Component} from '@angular/core';
import {WelcomeComponent} from './components/welcome/welcome';

@Component({
  selector: 'app-root',
  imports: [WelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
