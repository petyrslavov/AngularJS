import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { IGame } from 'src/app/models/game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: IGame;
  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.gameService.gameDetails(id).subscribe((data) => {
        this.game = data;
      })
    })
  }

  favouriteGame(){
    this.gameService.createFavGame(this.game).subscribe((data) => {
      this.router.navigate(['/game/user']);
    })
  }

}
