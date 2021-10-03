import { Component } from '@angular/core';
import { Cocktail } from './cocktail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drink-it-app';
  cocktails: Cocktail[];
  favourites: Cocktail[] = [];
  panelOpenState = false;
  choice: string;

  setCocktails(value: Cocktail[]){
    this.cocktails = value;
  }

  setChoice(value: string){
    this.choice = value;
  }

  setFavourites(value: Cocktail[]){
    this.favourites = value
  }

}
