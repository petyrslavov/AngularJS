import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { GameAllComponent } from './game/game-all/game-all.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'game/create', component: GameCreateComponent },
  { path: 'game/all', component: GameAllComponent },
  { path: 'game/details/:id', component: GameDetailsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }