import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { IGame } from 'src/app/models/game';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/authentication/auth.service';

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
