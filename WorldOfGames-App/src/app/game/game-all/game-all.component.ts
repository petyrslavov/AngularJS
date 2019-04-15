import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/models/game';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit {
  game$: Observable<Array<IGame>>;

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit() {
    this.game$ = this.gameService.getAllGames();
  }

  deleteGame(id){
    this.gameService.deleteGame(id).subscribe((data) => {
      this.game$ = this.gameService.getAllGames();
    });
  }
}
