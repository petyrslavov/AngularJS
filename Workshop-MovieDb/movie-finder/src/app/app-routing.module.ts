import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './details/details.component';
import { SingleMovieResolver } from './services/resolvers/single-movie.resolver';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: 'movies', component: MoviesComponent },
  {
    path: 'movies/:id', component: DetailsComponent,
    resolve: { singleMovie: SingleMovieResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
