import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IGame } from '../../shared/models/game';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  public safeURL: SafeResourceUrl;
  game: IGame;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
  }
  
  ngOnInit() {
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.gameService.gameDetails(id).subscribe((data) => {
        this.game = data;
        this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.trailer);
      })
    })
  }

  favouriteGame() {
    this.gameService.createFavGame(this.game).subscribe((data) => {
      this.router.navigate(['/game/user']);
    })
  }

}
