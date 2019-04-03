import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import Movie from '../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularMovies: Array<Movie>;
  inTheaterMovies: Array<Movie>;
  kidsMovies: Array<Movie>;
  dramaMovies: Array<Movie>;

  constructor(private moviesService: MovieService) { }

  ngOnInit() {
    this.moviesService.getPopularMovies().subscribe(data => {
      this.popularMovies = data['results'].slice(0, 6);
    });

    this.moviesService.getInTheaterMovies().subscribe(data => {
      this.inTheaterMovies = data['results'].slice(0, 6);
    });

    this.moviesService.getKidsMovies().subscribe(data => {
      this.kidsMovies = data['results'].slice(0, 6);
    });

    this.moviesService.getDramaMovies().subscribe(data => {
      this.dramaMovies = data['results'].slice(0, 6);
    });
  }

}
