import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { Observable } from 'rxjs';
import { IGame } from '../../shared/models/game';
import { AuthService } from 'src/app/core/services/auth.service';

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
