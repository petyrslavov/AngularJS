import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAllComponent } from './game-all/game-all.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameUserComponent } from './game-user/game-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { GameCategoryComponent } from './game-category/game-category.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'create', component: GameCreateComponent, canActivate: [AdminGuard]},
      { path: 'all', component: GameAllComponent},
      { path: 'details/:id', component: GameDetailsComponent},
      { path: 'user', component: GameUserComponent, canActivate: [AuthGuard] },
      { path: 'category/:category', component: GameCategoryComponent },
    ])
  ],
  declarations: [
    GameAllComponent,
    GameCreateComponent,
    GameDetailsComponent,
    GameUserComponent,
    GameCategoryComponent,
  ],
  providers: [
    GameService
  ]
})
export class GameModule { }
