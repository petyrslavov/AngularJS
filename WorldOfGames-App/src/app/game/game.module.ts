import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAllComponent } from './game-all/game-all.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameUserComponent } from './game-user/game-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { AdminGuard } from '../authentication/guards/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'create', component: GameCreateComponent, canActivate: [AdminGuard]},
      { path: 'all', component: GameAllComponent, canActivate: [AuthGuard]},
      { path: 'details/:id', component: GameDetailsComponent, canActivate: [AuthGuard] },
      { path: 'user', component: GameUserComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    GameAllComponent,
    GameCreateComponent,
    GameDetailsComponent,
    GameUserComponent,
  ],
  providers: [
    GameService
  ]
})
export class GameModule { }
