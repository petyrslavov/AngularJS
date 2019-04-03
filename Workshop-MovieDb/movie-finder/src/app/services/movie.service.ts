import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from '../../../node_modules/rxjs';
import Movie from '../models/Movie';
import MovieDetails from '../models/Movie-Details';

const BASE_URL = 'https://api.themoviedb.org/3/';
const IN_THEATERS = 'discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-04-30';
const POPULAR = 'discover/movie?sort_by=popularity.desc';
const KIDS = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
const DRAMA = 'discover/movie?with_genres=18&primary_release_year=2019'

const API_KEY = '&api_key=06d932cc3a94e754d0c652fca03990ea';
const API_KEY_ALT = '?api_key=06d932cc3a94e754d0c652fca03990ea';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(BASE_URL + POPULAR + API_KEY);
  }

  getInTheaterMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(BASE_URL + IN_THEATERS + API_KEY);
  }

  getKidsMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(BASE_URL + KIDS + API_KEY);
  }

  getDramaMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(BASE_URL + DRAMA + API_KEY);
  }

  getMovie(id: string){
    return this.http.get<MovieDetails>(BASE_URL + `movie/${id}` + API_KEY_ALT);
  }
}
