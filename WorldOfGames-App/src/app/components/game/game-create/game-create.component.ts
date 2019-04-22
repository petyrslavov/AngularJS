import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../../core/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  form;
  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      genre: ['', [Validators.required, Validators.minLength(3)]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2019)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
      trailer: ['', Validators.required],
    })
  }

  createGame(){
    this.gameService.createGame(this.form.value).subscribe((data) => {
      this.router.navigate(['/game/all']);
    })
  }

  get f() { return this.form.controls };

  get invalid() { return this.form.invalid };
}
