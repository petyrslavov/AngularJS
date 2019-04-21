import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from 'src/app/models/game';
import { GameService } from '../game.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css']
})
export class GameUserComponent implements OnInit {
  game$: Observable<Array<IGame>>;

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.game$ = this.gameService.getUserGames();
  }
}
