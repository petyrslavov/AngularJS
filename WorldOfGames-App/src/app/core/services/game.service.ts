import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from 'src/app/components/shared/models/game';

const createRoute = 'http://localhost:5000/game/create';
const getAllRoute = 'http://localhost:5000/game/all';
const gameDetailsRoute = 'http://localhost:5000/game/details/';
const deleteGame = 'http://localhost:5000/game/delete/';
const favGame = 'http://localhost:5000/game/mygames';
const userGamesRoute = 'http://localhost:5000/game/user';
const gameCategoryRoute = 'http://localhost:5000/game/category/';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  gameGategory(category): Observable<Array<IGame>>{
    return this.http.get<Array<IGame>>(gameCategoryRoute + category);
  }

  getUserGames(): Observable<Array<IGame>>{
    return this.http.get<Array<IGame>>(userGamesRoute);
  }

  createFavGame(data){
    return this.http.post(favGame, data);
  }

  createGame(data) {
    return this.http.post(createRoute, data);
  }

  getAllGames(): Observable<Array<IGame>>{
    return this.http.get<Array<IGame>>(getAllRoute);
  }

  gameDetails(id): Observable<IGame>{
    return this.http.get<IGame>(gameDetailsRoute + id);
  }

  deleteGame(id){
    return this.http.delete(deleteGame + id);
  }
}
