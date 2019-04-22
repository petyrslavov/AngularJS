import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Observable } from 'rxjs';
import { IGame } from '../../shared/models/game';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-game-category',
  templateUrl: './game-category.component.html',
  styleUrls: ['./game-category.component.css']
})
export class GameCategoryComponent implements OnInit {
  category;
  game$: Observable<Array<IGame>>;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get("category")
      this.game$ = this.gameService.gameGategory(this.category);
    })
  }

}
