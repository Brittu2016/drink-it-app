import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from '../cocktail';
import { RemoteServiceService } from '../remote-service.service';
import { SearchChoice } from '../search-choice';

@Component({
  selector: 'app-drink-search',
  templateUrl: './drink-search.component.html',
  styleUrls: ['./drink-search.component.css'],
})
export class DrinkSearchComponent implements OnInit {
  searchParam: string;
  @Output() choiceEmitter = new EventEmitter<string>();
  choice: string;
  canSearch = false;
  searchLabel = 'Vuoi cercare per nome o per ingrediente?';
  @Output() cocktailsResponse = new EventEmitter<Cocktail[]>();

  constructor(private remoteService: RemoteServiceService) {}

  getInput(inputValue: string) {
    this.searchParam = inputValue;
  }

  updateSearchChoice(selection: string) {
    this.choice = selection;
    this.canSearch = true;
    this.searchLabel = 'Cerca per ' + selection;
    this.choiceEmitter.emit(this.choice);
  }

  searchAction() {
    switch (this.choice) {
      case SearchChoice.byName:
        this.remoteService
          .getDrinkByName(this.searchParam)
          .subscribe((cocktailsResponse) => {
            this.cocktailsResponse.emit(cocktailsResponse);});
        break;
      case SearchChoice.byIngredient:
        this.remoteService
          .getDrinkByIngredient(this.searchParam)
          .subscribe((cocktailsResponse) => {
            this.cocktailsResponse.emit(cocktailsResponse || []);});
        break;
    }
  }

  ngOnInit(): void {}
}
