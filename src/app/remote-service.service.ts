import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cocktail } from './cocktail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteServiceService {
  byNameUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
  byIngredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  byIdUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

  constructor(private http: HttpClient) {}

  getDrinkByName(searchParam: string): Observable<Cocktail[]> {
    let params = new HttpParams().set('s', searchParam);
    return this.http.get<Cocktail[]>(this.byNameUrl, { params });
  }

  getDrinkByIngredient(searchParam: string): Observable<Cocktail[]> {
    let params = new HttpParams().set('i', searchParam);
    return this.http.get<Cocktail[]>(this.byIngredientUrl, { params });
  }

  getDrinkById(searchParam: string): Observable<any> {
    let params = new HttpParams().set('i', searchParam);
    return this.http.get<any>(this.byIdUrl, { params });
  }
}
