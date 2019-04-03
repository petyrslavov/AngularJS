import { Component, OnInit } from '@angular/core';
import MovieDetails from '../models/Movie-Details';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movie: MovieDetails;
  movieGenres: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.movie = this.route.snapshot.data['singleMovie'];
    this.movieGenres = this.movie.genres
    .map(el => el['name'])
    .join(' ');
  }

}
